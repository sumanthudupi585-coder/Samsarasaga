<script>
  import { onMount, tick } from 'svelte';

  // State Management
  let messages = [];
  let playerInput = '';
  let isAwaitingResponse = false;
  let chatLog; // Used to bind to the chat log element for scrolling

  const gameState = {
    playerName: 'Seeker',
  };

  // --- Core Functions ---

  /**
   * Fetches a response from the AI backend.
   * Includes robust error handling and thematic fallback messages.
   * @param {string} question - The player's input text.
   * @returns {Promise<string>} The AI's response.
   */
  async function getAiResponse(question) {
    try {
      // In a real application, this would point to your SvelteKit endpoint
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question,
          playerName: gameState.playerName
        }),
      });

      if (!response.ok) {
        throw new Error(`Worker error: ${response.statusText}`);
      }

      const data = await response.json();
      // Return a thoughtful default if the response is empty
      return (data.response || "").trim() || "The Rishi remains silent, lost in deep contemplation.";
    } catch (error)
    {
      console.error("Failed to get AI response:", error);
      // Return a thematic error message
      return "A gust of wind rustles the leaves, and the moment of clarity passes.";
    }
  }

  /**
   * Appends a new message to the chat log.
   * @param {string} text - The content of the message.
   * @param {string} sender - 'seeker' for the player, 'rishi' for the AI.
   * @param {boolean} [isTyping=false] - Optional flag for the "thinking" message.
   */
  function appendMessage(text, sender, isTyping = false) {
    messages = [...messages, { id: Date.now(), text, sender, isTyping }];
  }

  /**
   * Handles the form submission when the player sends a message.
   */
  async function handleFormSubmit() {
    if (isAwaitingResponse || !playerInput.trim()) return;

    const question = playerInput.trim();
    appendMessage(question, 'seeker');
    playerInput = '';
    isAwaitingResponse = true;

    // Thematic "thinking" message
    appendMessage("...", 'rishi', true);

    const responseText = await getAiResponse(question);

    // Replace the "thinking" message with the actual response
    messages = messages.slice(0, -1);
    appendMessage(responseText, 'rishi');

    isAwaitingResponse = false;
  }

  // --- Lifecycle & Reactivity ---

  onMount(() => {
    // Initial message to set the scene
    appendMessage("You approach the ancient Rishi, who sits in deep meditation. What wisdom do you seek?", 'rishi');
  });

  // Reactive statement to scroll down smoothly when messages change
  $: if (chatLog) {
    // tick() waits for the DOM to update before scrolling
    tick().then(() => {
      chatLog.scrollTo({ top: chatLog.scrollHeight, behavior: 'smooth' });
    });
  }
</script>

<!-- 
  The UI is structured for thematic styling and accessibility.
  - `aria-live="polite"` ensures screen readers announce new messages.
  - Custom CSS properties from the main theme are used throughout.
-->
<main class="container">
  <div id="chat-log" bind:this={chatLog} class="chat-log" aria-live="polite">
    {#each messages as message (message.id)}
      <div class="chat-message {message.sender}-message" class:typing={message.isTyping}>
        <div class="sender-label">{message.sender === 'seeker' ? 'You' : 'Rishi'}</div>
        <div class="message-bubble">
          {#if message.isTyping}
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          {:else}
            <p class="whitespace-pre-wrap">{message.text}</p>
          {/if}
        </div>
      </div>
    {/each}
  </div>

  <form id="chat-form" on:submit|preventDefault={handleFormSubmit} class="chat-form">
    <input 
      id="player-input" 
      bind:value={playerInput} 
      type="text" 
      placeholder="Speak your mind..." 
      class="player-input" 
      disabled={isAwaitingResponse}
      aria-label="Your message to the Rishi"
    />
    <button id="send-button" type="submit" class="send-button" disabled={isAwaitingResponse} aria-label="Send message">
      <!-- Thematic Send Icon -->
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M10 14l11-11"></path>
        <path d="M21 3l-6.5 18.5L9 15l-3-2.5L21 3z"></path>
      </svg>
    </button>
  </form>
</main>

<style>
  /* Import styles from the main CSS file using custom properties */
  .container {
    background-color: var(--bg-color, #0c0a1a);
    color: var(--text-color-primary, #e0e0ff);
    font-family: 'Marcellus', serif;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    max-width: 800px;
    margin: 0 auto;
  }

  .chat-log {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
    scrollbar-width: thin;
    scrollbar-color: var(--glow-color-2, #7b68ee) transparent;
  }

  /* Webkit scrollbar styling */
  .chat-log::-webkit-scrollbar {
    width: 8px;
  }
  .chat-log::-webkit-scrollbar-track {
    background: transparent;
  }
  .chat-log::-webkit-scrollbar-thumb {
    background-color: var(--glow-color-2, #7b68ee);
    border-radius: 4px;
    border: 2px solid transparent;
  }

  .chat-message {
    display: flex;
    flex-direction: column;
    margin-bottom: 1.5rem;
    max-width: 80%;
    opacity: 0;
    animation: floatIn 0.5s forwards ease-out;
  }

  @keyframes floatIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .seeker-message {
    align-self: flex-end;
    align-items: flex-end;
  }

  .rishi-message {
    align-self: flex-start;
    align-items: flex-start;
  }

  .sender-label {
    font-family: 'Cinzel', serif;
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
    opacity: 0.7;
    padding: 0 0.5rem;
  }

  .message-bubble {
    padding: 0.75rem 1.25rem;
    border-radius: 1.25rem;
    line-height: 1.6;
    text-shadow: 0 0 3px rgba(224, 224, 255, 0.3);
  }

  .seeker-message .message-bubble {
    background: rgba(123, 104, 238, 0.2);
    border-top-right-radius: 0.25rem;
    border: 1px solid rgba(123, 104, 238, 0.4);
  }

  .rishi-message .message-bubble {
    background: rgba(224, 224, 255, 0.05);
    border-top-left-radius: 0.25rem;
    border: 1px solid rgba(224, 224, 255, 0.1);
  }

  .chat-form {
    display: flex;
    margin-top: 1rem;
    gap: 0.5rem;
  }

  .player-input {
    flex-grow: 1;
    background: rgba(0,0,0,0.2);
    border: 1px solid var(--glow-color-2, #7b68ee);
    color: var(--text-color-primary, #e0e0ff);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  .player-input:focus {
    outline: none;
    border-color: var(--glow-color-1, #a89eff);
    box-shadow: 0 0 10px var(--glow-color-1, #a89eff);
  }

  .player-input:disabled {
    opacity: 0.5;
  }

  .send-button {
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(123, 104, 238, 0.1);
    border: 1px solid var(--glow-color-2, #7b68ee);
    border-radius: 50%;
    color: var(--text-color-secondary, #c0c0ff);
    cursor: none;
    transition: all 0.3s ease;
  }

  .send-button:hover:not(:disabled) {
    color: white;
    background: rgba(123, 104, 238, 0.3);
    border-color: var(--glow-color-1, #a89eff);
    transform: scale(1.1);
  }
  
  .send-button:disabled {
    opacity: 0.5;
  }

  /* Typing indicator for the Rishi's "thinking" state */
  .typing-indicator span {
    height: 8px;
    width: 8px;
    background-color: var(--text-color-secondary);
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    animation: bounce 1.4s infinite ease-in-out both;
  }
  .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
  .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

  @keyframes bounce {
    0%, 80%, 100% { transform: scale(0); }
    40% { transform: scale(1.0); }
  }
</style>
