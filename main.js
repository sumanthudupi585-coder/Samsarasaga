// in /workspaces/Samsarasaga/public/js/main.js

const workerUrl = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:8787'
    // !!! PASTE YOUR PRODUCTION RAG WORKER URL HERE !!!
    : 'https://samsara-rag-npc.your-username.workers.dev'; // <-- EDIT THIS LINE

