// A placeholder for the game state, assuming it exists elsewhere
const gameState = {
    playerName: 'Seeker'
};

/**
 * Calls our secure RAG worker to get a context-aware response from the AI.
 * @param {string} npcId - The unique ID of the NPC. This is currently unused but could be sent to the worker.
 * @param {string} playerInput - The player's message.
 * @returns {Promise<string>} The AI's response text.
 */
async function getAiResponse(npcId, playerInput) {
  // !!! PASTE YOUR NEW RAG WORKER URL HERE !!!
  const ragWorkerUrl = 'https://samsara-rag-npc.your-account.workers.dev';
  
  try {
    const response = await fetch(ragWorkerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: playerInput,
        playerName: gameState.playerName
      }),
    });

    if (!response.ok) {
      throw new Error(`AI RAG worker error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response || "The Rishi remains silent, lost in deep contemplation.";
  } catch (error) {
    console.error("Failed to get RAG response:", error);
    return "A gust of wind rustles the leaves, and the moment of clarity passes.";
  }
}