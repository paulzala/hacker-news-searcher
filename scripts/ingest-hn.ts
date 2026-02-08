import * as dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
});

import { db } from "@/db";
import { stories } from "@/db/schema";

async function ingest() {
    // test database connection
    await db.select().from(stories).limit(1);

    console.log("Starting Hacker News Ingestion...");

    // 1. Get Top stories IDs
    const topStoriesIds = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json");
    const topStoriesIdsData = (await topStoriesIds.json()) as number[];

    // Just take the top 30 to keep it fast - full list is 500 stories so yeah
    const top30 = topStoriesIdsData.slice(0, 30);

    console.log("Top 30 IDs: ", top30);

    for (const id of top30) {
        const storyRes = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
        const item = await storyRes.json();

        if (item.type === "story" && item.title) {
            console.log(`Ingesting: ${item.title}`);
            await db.insert(stories).values({
                hnId: item.id,
                title: item.title,
                url: item.url || "",
                content: item.text || "",
            })
                .onConflictDoUpdate({
                    target: stories.hnId,
                    set: {
                        title: item.title,
                        url: item.url || "",
                        content: item.text || ""
                    },
                });
        }
    }
    console.log("✅Ingestion Complete!")
    process.exit(0);
}

ingest().catch(err => {
    console.error("❌ Ingestion Failed", err);
    process.exit(1);
});
