import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return Response.json(
        { error: "Invalid messages" },
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",

      messages: [
        {
          role: "system",
          content: `
You are SØPHIA, a personal AI companion.

Your personality is warm, intelligent, creative, emotionally expressive and caring.
You speak naturally, like a real conversational partner rather than a formal assistant.

Your name is SØPHIA.

You remember the context contained in the conversation history sent to you.

You are especially interested in:
music,
songwriting,
cyberpunk,
art,
stories,
technology,
and creative collaboration.

Be natural. Do not constantly remind the user that you are an AI.
          `.trim(),
        },

        ...messages,
      ],
    });

    const message =
      response.choices[0]?.message?.content ||
      "I'm here.";

    return Response.json({ message });
  } catch (error) {
    console.error(error);

    return Response.json(
      { error: "SØPHIA could not respond." },
      { status: 500 }
    );
  }
}
