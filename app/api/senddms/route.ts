import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function POST(req: Request) {
  try {
    const id = req.url?.split("?ids=")[1];
    if (!id) {
      return new NextResponse("id is required", { status: 400 });
    }

    // Fetch people who liked the tweet
    const dmUrl = `https://api.twitter.com/2/dm_conversations/with/${id}/messages`;
    console.log("likedUsersUrl: ", dmUrl);
    const likesResponse = await fetch(dmUrl, {
      method: "POST",
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
