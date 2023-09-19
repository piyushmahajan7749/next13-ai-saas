import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: Request) {
  try {
    const tweetUrl = req.url?.split("?tweetUrl=")[1];
    if (!tweetUrl) {
      return new NextResponse("Tweet URL is required", { status: 400 });
    }

    const decodedUrl = decodeURIComponent(tweetUrl);
    const url = new URL(decodedUrl);
    const tweetId = url.pathname.split("/").pop(); // Extract tweet ID from URL

    // Fetch people who liked the tweet
    const likedUsersUrl = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;
    const likesResponse = await fetch(likedUsersUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAEqxeQAAAAAAt0S2ju%2B3KqZ5GYC%2F7eBxiqEC%2BgM%3DYz24kdYaVnQnzppKfKO14882y1uIqO4hi19D4j32EJsP1ytAL7`,
      },
    });

    if (!likesResponse.ok) {
      return new NextResponse("Failed to fetch likes", {
        status: likesResponse.status,
      });
    }

    const likesData = await likesResponse.json();

    return NextResponse.json({
      likes: likesData,
    });
  } catch (error) {
    console.log("[FETCH_TWEET_AND_likes_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
