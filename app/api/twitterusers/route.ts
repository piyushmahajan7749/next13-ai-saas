import { NextResponse } from "next/server";
import fetch from "node-fetch";

export async function GET(req: Request) {
  try {
    const ids = req.url?.split("?ids=")[1];
    if (!ids) {
      return new NextResponse("ids is required", { status: 400 });
    }

    // Fetch people who liked the tweet
    const usersUrl = `https://api.twitter.com/2/users?ids=${ids.toString()}&user.fields=created_at,description,entities,id,location,name,pinned_tweet_id,profile_image_url,protected,url,username,verified`;
    console.log("likedUsersUrl: ", usersUrl);
    const likesResponse = await fetch(usersUrl, {
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
