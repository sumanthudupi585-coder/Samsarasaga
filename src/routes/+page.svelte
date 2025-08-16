<script>
  import { onMount } from 'svelte';

  let messages = [];
  let playerInput = '';
  let isAwaitingResponse = false;
  let chatLog;

  const gameState = {
    playerName: 'Seeker',
  };

  async function getAiResponse(question) {
    try {
      const response = await fetch('/api/chat', { // Relative path to the worker
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
      return (data.response || "").trim() || "The Rishi remains silent, lost in deep contemplation.";
    } catch (error) {
      console.error("Failed to get AI response:", error);
      return "A gust of wind rustles the leaves, and the moment of clarity passes.";
    }
  }

  function appendMessage(text, sender) {
    messages = [...messages, { text, sender }];
  }

  async function handleFormSubmit() {
    if (isAwaitingResponse) return;

    const question = playerInput.trim();
    if (!question) return;

    appendMessage(question, 'seeker');
    playerInput = '';

    isAwaitingResponse = true;

    appendMessage("The Rishi closes their eyes, contemplating...", 'rishi');
    
    const responseText = await getAiResponse(question);

    messages = messages.slice(0, -1); // Remove the "thinking" message
    appendMessage(responseText, 'rishi');

    isAwaitingResponse = false;
  }

  onMount(() => {
    appendMessage("You approach the ancient Rishi, who sits in deep meditation. What wisdom do you seek?", 'rishi');
  });

  // Reactive statement to scroll down when messages change
  $: if (chatLog) {
    chatLog.scrollTop = chatLog.scrollHeight;
  }
</script>

<main class="container mx-auto p-4 h-screen flex flex-col">
  <div id="chat-log" bind:this={chatLog} class="flex-grow overflow-y-auto bg-base-200 p-4 rounded-lg">
    {#each messages as message}
      <div class="chat-message {message.sender}-message mb-2">
        <span class="font-bold">{message.sender === 'seeker' ? 'You' : 'Rishi'}:</span>
        <p class="whitespace-pre-wrap">{message.text}</p>
      </div>
    {/each}
  </div>

  <form id="chat-form" on:submit|preventDefault={handleFormSubmit} class="mt-4 flex">
    <input 
      id="player-input" 
      bind:value={playerInput} 
      type="text" 
      placeholder="Speak your mind..." 
      class="input input-bordered w-full" 
      disabled={isAwaitingResponse}
    />
    <button id="send-button" type="submit" class="btn btn-primary ml-2" disabled={isAwaitingResponse}>
      Send
    </button>
  </form>
</main>
