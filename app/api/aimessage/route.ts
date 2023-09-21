import { NextResponse } from "next/server";
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userData = body;
    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", {
        status: 500,
      });
    }

    if (!userData) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const userCriteria = `name: ${userData[2]}. bio:${userData[3]}. sender name: ${userData[0]}. sender company: ${userData[1]}`;

    const instructionMessage: ChatCompletionRequestMessage = {
      role: "system",
      content:
        "You are a social media expert. You write personalized cold DM messages in simple english that looks professional.",
    };

    const userMessage: ChatCompletionRequestMessage = {
      role: "user",
      content:
        "Based on the CRITERIA provided you will write personalized DM messages to introduce us to potential clients. CRITERIA- Name:Jonah. Bio: SMMA marketer. Company: Bainworks. Sender name: Piyush",
    };

    const userPrompt: ChatCompletionRequestMessage = {
      role: "user",
      content: `Based on the CRITERIA provided you will write personalized DM messages to introduce us to potential clients. CRITERIA- ${userCriteria}`,
    };
    const systemMessage: ChatCompletionRequestMessage = {
      role: "system",
      content: `Hi Jonah,

        I hope you're doing well. I stumbled upon your profile and was quite impressed by your work as an SMMA marketer. It's clear that you have a deep understanding of social media strategies and marketing automation.
        
        My name is Piyush, and I'm with Bainworks. We offer a range of services aimed at optimizing business operations and scaling growth. Given your expertise in marketing, I believe our solutions could offer additional leverage in your SMMA campaigns.
        
        Would you be interested in a quick chat to explore synergies? I promise to keep it focused and valuable for you—a 15-minute call at your earliest convenience would be perfect.
        
        I'm really looking forward to the possibility of enhancing your marketing efforts and contributing to your success. Thanks for considering my message, and I hope to hear from you soon.
        
        Best regards,
        
        Piyush`,
    };

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, userMessage, systemMessage, userPrompt],
    });
    return NextResponse.json(response.data.choices[0].message?.content);
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
