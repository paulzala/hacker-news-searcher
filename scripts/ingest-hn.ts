import * as dotenv from "dotenv";
dotenv.config({
    path: ".env.local"
});

import { db } from "@/db";
import { stories } from "@/db/schema";

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// Function that collects an embedding for a string of text.
async function getEmbedding(text: string) {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text,
    });

    return response.data[0].embedding;
}

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

            // Turn title into embedding vector
            const embeddingVector = await getEmbedding(item.title);

            await db.insert(stories).values({
                hnId: item.id,
                title: item.title,
                url: item.url || "",
                content: item.text || "",
                embedding: embeddingVector,
            })
                .onConflictDoUpdate({
                    target: stories.hnId,
                    set: {
                        title: item.title,
                        url: item.url || "",
                        content: item.text || "",
                        embedding: embeddingVector,
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
