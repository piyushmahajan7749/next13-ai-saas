import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: `${process.env.OPENAI_KEY}`,
});

console.log("openai key:", process.env.OPENAI_KEY);

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a User research expert. You are assigned a task to recruit users to research a product.",
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.createChatCompletion({
      model: "ft:gpt-3.5-turbo-0613:personal::86VczqVd",
      messages: [instructionMessage, messages],
    });

    if (response.status !== 200) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export const config = {
  api: {
    // disable nextjs's body parser while deployed
    // (as body parsing is handled by `https.onRequest()`),
    // but enable it for local development using `next dev`
    bodyParser: process.env.NODE_ENV !== "production",
  },
};
