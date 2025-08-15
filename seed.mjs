import { readdir, readFile, stat } from 'node:fs/promises';
import { Miniflare } from 'miniflare';

const SCRIPT_CONFIG = {
  knowledgePath: './knowledge_base',
  vectorizeIndexName: 'samsara-rag',
  embeddingModel: '@cf/baai/bge-base-en-v1.5',
  // Batch sizes to avoid hitting API limits
  embeddingBatchSize: 128,
  vectorInsertBatchSize: 500,
};


/**
 * Splits a text into smaller chunks based on paragraphs.
 * This is a simple strategy. More advanced strategies could use tokenizers
 * or sentence splitters for more precise chunking.
 * @param {string} text The text to chunk.
 * @returns {string[]} An array of text chunks.
 */
function chunkText(text) {
  // Split by double newlines, which often separate paragraphs or sections.
  // Filter out any empty strings that might result from multiple newlines.
  return text.split(/\n\s*\n/).filter(chunk => chunk.trim() !== '');
}

async function seed() {
  let mf; // Declare here to be accessible in the finally block
  try {
    console.log('--- Starting RAG Seeding Process ---');

    // Check if knowledge_base directory exists
    try {
      await stat(SCRIPT_CONFIG.knowledgePath);
    } catch (e) {
      if (e.code === 'ENOENT') {
        console.error(`Error: Knowledge base directory not found at '${knowledgePath}'.`);
        console.error('Please create the directory and add your text files.');
        process.exit(1);
      }
      throw e; // Re-throw other errors
    }

    // The `wrangler/api` entrypoint has been removed in Wrangler v3.
    // We now use Miniflare directly to set up a local environment.
    // By using wrangler.toml as the source of truth for bindings,
    // this script stays in sync with the deployed worker.
    mf = new Miniflare({
      wranglerConfigPath: true,
      // By setting `modules: true`, we tell Miniflare to use the ES Modules
      // format and automatically load the `main` entrypoint from wrangler.toml.
      modules: true,
      persist: '.wrangler/state', // Persist data to the .wrangler directory
    });
    // Get bindings and rename them for convenience in this script
    const { AI: ai, RAG_INDEX: vectorizeIndex } = await mf.getBindings();

    // Filter for .txt files to avoid processing other files in the directory
    const files = (await readdir(SCRIPT_CONFIG.knowledgePath)).filter(file => file.endsWith('.txt'));
    if (files.length === 0) {
      console.log(`No files found in '${SCRIPT_CONFIG.knowledgePath}'. Seeding process aborted.`);
      return;
    }

    const allChunks = [];
    const allChunkMetadatas = [];

    for (const file of files) {
      console.log(`Processing file: ${file}`);
      const text = await readFile(`${SCRIPT_CONFIG.knowledgePath}/${file}`, 'utf-8');
      const chunks = chunkText(text);
      console.log(`- Split into ${chunks.length} chunks.`);
      allChunks.push(...chunks);
      chunks.forEach((chunk, i) => {
        allChunkMetadatas.push({
          file: file,
          chunk: i,
          text: chunk
        });
      });
    }

    console.log(`Found ${files.length} knowledge file(s), split into ${allChunks.length} total chunks. Generating embeddings...`);

    // The AI model has a batch size limit. We need to process chunks in batches.
    // For @cf/baai/bge-base-en-v1.5, the limit is 128.
    let allEmbeddingsData = [];

    for (let i = 0; i < allChunks.length; i += SCRIPT_CONFIG.embeddingBatchSize) {
      const batch = allChunks.slice(i, i + SCRIPT_CONFIG.embeddingBatchSize);
      console.log(`- Processing embedding batch ${Math.floor(i / SCRIPT_CONFIG.embeddingBatchSize) + 1} of ${Math.ceil(allChunks.length / SCRIPT_CONFIG.embeddingBatchSize)}...`);
      const embeddings = await ai.run(SCRIPT_CONFIG.embeddingModel, { text: batch });
      allEmbeddingsData.push(...embeddings.data);
    }

    const vectors = allEmbeddingsData.map((embedding, i) => ({
      id: `${allChunkMetadatas[i].file}-${allChunkMetadatas[i].chunk}`, // Use filename-chunk as ID
      values: embedding,
      metadata: { text: allChunkMetadatas[i].text }
    }));

    console.log(`Inserting ${vectors.length} vectors into index '${SCRIPT_CONFIG.vectorizeIndexName}'...`);
    // Vectorize has a limit of 1,000 vectors per insert. Batch inserts as well.
    let totalInserted = 0;
    for (let i = 0; i < vectors.length; i += SCRIPT_CONFIG.vectorInsertBatchSize) {
      const batch = vectors.slice(i, i + SCRIPT_CONFIG.vectorInsertBatchSize);
      // The old `getWranglerDb` returned a custom object. With Miniflare, we get the index binding directly.
      const { count } = await vectorizeIndex.insert(batch);
      totalInserted += count;
    }
    console.log(`--- Seeding Complete: Inserted ${totalInserted} vectors successfully. ---`);
  } catch (error) {
    console.error('An unexpected error occurred during the seeding process:');
    console.error(error);
    process.exit(1);
  } finally {
    if (mf) {
      // Clean up the Miniflare instance
      await mf.dispose();
    }
  }
}

seed();