import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const twitterClient = client.readWrite;

export async function GET(req: Request) {
  try {
    const tweetUrl = req.url?.split("?tweetUrl=")[1];
    if (!tweetUrl) {
      return new NextResponse("Tweet URL is required", { status: 400 });
    }

    const decodedUrl = decodeURIComponent(tweetUrl);
    const url = new URL(decodedUrl);
    const tweetId = url.pathname.split("/").pop(); // Extract tweet ID from URL

    // Fetch tweet details
    const tweet = await twitterClient.v2.singleTweet(tweetId as string);

    if (!tweet.data) {
      return new NextResponse("Failed to fetch tweet details", { status: 500 });
    }

    console.log("tweet.data: ", tweet.data);

    return NextResponse.json({
      tweet: tweet.data,
    });
  } catch (error) {
    console.log("[TWEET_AUTHOR_INFO_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
