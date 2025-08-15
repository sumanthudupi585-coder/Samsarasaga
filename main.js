document.addEventListener('DOMContentLoaded', () => {
    const chatLog = document.getElementById('chat-log');
    const chatForm = document.getElementById('chat-form');
    const playerInput = document.getElementById('player-input');
    const sendButton = document.getElementById('send-button');

    const gameState = {
        playerName: 'Seeker',
        isAwaitingResponse: false,
    };

    /**
     * Calls our secure RAG worker to get a context-aware response from the AI.
     * @param {string} question - The player's message.
     * @returns {Promise<string>} The AI's response text.
     */
    async function getAiResponse(question) {
        const workerUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
            ? 'http://localhost:8787'
            // !!! PASTE YOUR PRODUCTION RAG WORKER URL HERE !!!
            : 'https://samsarasaga.your-account.workers.dev';

        try {
            const response = await fetch(workerUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    question: question,
                    playerName: gameState.playerName
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(`Worker error: ${response.statusText} - ${errorData.error || 'Unknown error'}`);
            }

            const data = await response.json();
            // Use trim() to remove any leading/trailing whitespace from the AI response.
            return (data.response || "").trim() || "The Rishi remains silent, lost in deep contemplation.";
        } catch (error) {
            console.error("Failed to get RAG response:", error);
            return "A gust of wind rustles the leaves, and the moment of clarity passes.";
        }
    }

    /**
     * Appends a message to the chat log.
     * @param {string} text The message text.
     * @param {string} sender 'seeker' or 'rishi'.
     * @returns {HTMLElement} The created message element.
     */
    function appendMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', `${sender}-message`);
        messageElement.textContent = text;
        chatLog.appendChild(messageElement);
        chatLog.scrollTop = chatLog.scrollHeight; // Auto-scroll to the bottom
        return messageElement;
    }

    /**
     * Handles the submission of the player's question.
     * @param {Event} event The form submission event.
     */
    async function handleFormSubmit(event) {
        event.preventDefault();
        if (gameState.isAwaitingResponse) return;

        const question = playerInput.value.trim();
        if (!question) return;

        appendMessage(question, 'seeker');
        playerInput.value = '';

        gameState.isAwaitingResponse = true;
        sendButton.disabled = true;

        const thinkingMessage = appendMessage("The Rishi closes their eyes, contemplating...", 'rishi');
        thinkingMessage.classList.add('thinking');

        const responseText = await getAiResponse(question);
        thinkingMessage.textContent = responseText;
        thinkingMessage.classList.remove('thinking');

        gameState.isAwaitingResponse = false;
        sendButton.disabled = false;
        playerInput.focus();
    }

    chatForm.addEventListener('submit', handleFormSubmit);
    appendMessage("You approach the ancient Rishi, who sits in deep meditation. What wisdom do you seek?", 'rishi');
});