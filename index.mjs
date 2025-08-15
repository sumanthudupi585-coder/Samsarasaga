export default {
  async fetch(request, env) {
    // We expect a POST request with a JSON body
    if (request.method !== 'POST') {
      return new Response('Expected POST', { status: 405 });
    }

    const { question, playerName } = await request.json();

    // 1. RETRIEVAL: Find relevant knowledge
    // Convert the user's question into a vector embedding
    const embeddings = await env.AI.run('@cf/baai/bge-base-en-v1.5', { text: [question] });
    const queryVector = embeddings.data[0];

    // Query the Vectorize index to find the most similar texts
    const searchResults = await env.RAG_INDEX.query(queryVector, { topK: 2 });

    // Filter matches and format them as context
    const contextPieces = searchResults.matches
      .filter(match => match.score > 0.7)
      .map(match => match.metadata.text);
    const context = contextPieces.join('\n\n---\n\n');

    // 2. AUGMENTED GENERATION: Build the prompt for the LLM
    const systemPrompt = `You are a wise and ancient Rishi meditating under a Banyan tree. You are speaking to a seeker named ${playerName}. Use the provided "Philosophical Context" to answer their question accurately. Your tone should be calm, profound, and mysterious. If the context does not contain the answer, say "The answer to that is not found in the texts I have contemplated."`;

    const finalPrompt = `System Instructions:
    ${systemPrompt}

    Philosophical Context:
    ${context}

    Question from ${playerName}:
    ${question}`;

    // 3. Call the LLM with the augmented prompt
    const { response: aiResponse } = await env.AI.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        prompt: finalPrompt,
        max_tokens: 250,
      }
    );

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};