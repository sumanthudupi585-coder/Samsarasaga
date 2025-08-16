import { Ai } from '@cloudflare/ai';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname !== '/api/chat') {
      return new Response('Not Found', { status: 404 });
    }

    if (request.method !== 'POST') {
      return new Response('Expected POST', { status: 405 });
    }

    const { question, playerName } = await request.json();

    if (!question || !playerName) {
      return new Response('Missing question or playerName', { status: 400 });
    }

    const ai = new Ai(env.AI);

    const { response } = await ai.run(
      '@cf/meta/llama-3-8b-instruct',
      {
        prompt: `You are a wise Rishi in the world of Samsara. ${playerName} approaches you and asks: "${question}". Your answer should be profound and mysterious.`,
      }
    );

    return new Response(JSON.stringify({ response }), {
      headers: { 'Content-Type': 'application/json' },
    });
  },
};