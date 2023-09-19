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

    const tweetDetailsUrl = "https://api.twitter.com/2/tweets/${tweetId}";
    const params = {
      "tweet.fields": "lang,author_id", // Edit optional query parameters here
      "user.fields": "created_at", // Edit optional query parameters here
    };
    // Fetch people who liked the tweet
    const likedUsersUrl = `https://api.twitter.com/2/tweets/${tweetId}/liking_users`;
    const followersResponse = await fetch(likedUsersUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer AAAAAAAAAAAAAAAAAAAAAEqxeQAAAAAAt0S2ju%2B3KqZ5GYC%2F7eBxiqEC%2BgM%3DYz24kdYaVnQnzppKfKO14882y1uIqO4hi19D4j32EJsP1ytAL7`,
      },
    });

    if (!followersResponse.ok) {
      return new NextResponse("Failed to fetch followers", {
        status: followersResponse.status,
      });
    }

    const followersData = await followersResponse.json();

    return NextResponse.json({
      likes: followersData,
    });
  } catch (error) {
    console.log("[FETCH_TWEET_AND_FOLLOWERS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
