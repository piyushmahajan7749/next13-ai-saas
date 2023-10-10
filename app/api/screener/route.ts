import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});

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

    // const freeTrial = await checkApiLimit();
    // const isPro = await checkSubscription();

    // if (!freeTrial && !isPro) {
    //   return new NextResponse(
    //     "Free trial has expired. Please upgrade to pro.",
    //     { status: 403 }
    //   );
    // }

    const response = await openai.createChatCompletion({
      model: "ft:gpt-3.5-turbo-0613:personal::86VczqVd",
      messages: [instructionMessage, messages],
    });

    // if (!isPro) {
    //   await incrementApiLimit();
    // }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    console.log("[CODE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
