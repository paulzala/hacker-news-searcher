"use server";

import { db } from "@/db";
import { stories } from "@/db/schema";
import { ilike } from "drizzle-orm";

export async function searchStories(prevState: any, formData: FormData) {
    const query = formData.get("query") as string;

    if (!query) return [];

    console.log("Searching for: " + query);

    // For now, simple text search.
    // Will upgrade to semantic vector search once we have embeddings later.
    const results = await db.select().from(stories).where(ilike(stories.title, `%${query}%`)).limit(10);
    return results;
}