# SØPHIA

First working prototype of the SØPHIA personal AI companion.

## Run locally

1. Install Node.js 20+.
2. Run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Put your OpenAI API key in `.env.local`.
5. Run `npm run dev`.

## Important

Never commit `.env.local` or your API key to GitHub.

The first prototype stores conversation history in the browser's localStorage. A later version can replace this with persistent server-side memory.
