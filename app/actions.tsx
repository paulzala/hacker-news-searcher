"use server";

import { db } from "@/db";
import { stories } from "@/db/schema";
import { cosineDistance, desc, gt, sql } from "drizzle-orm";
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function searchStories(prevState: any, formData: FormData) {
    const query = formData.get("query") as string;

    if (!query) return [];

    console.log("Semantic search for: " + query);

    try {
        const response = await openai.embeddings.create({
            model: "text-embedding-3-small",
            input: query,
        });
        const queryEmbedding = response.data[0].embedding;

        // We find the cosine distance between the story embedding and the query embedding.
        // We order by distance (closest first).
        const similarity = sql<number>`1 - (${cosineDistance((stories.embedding), queryEmbedding)})`;

        const results = await db.select({
            id: stories.id,
            title: stories.title,
            url: stories.url,
            similarity,
        })
            .from(stories)
            .where(gt(similarity, 0.25))
            .orderBy((t) => desc(t.similarity))
            .limit(10);

        return results;
    } catch (error) {
        console.error("Search failed:", error);
        return [];
    }
}