import { pgTable, serial, text, integer, vector } from "drizzle-orm/pg-core";

export const stories = pgTable('stories', {
    id: serial('id').primaryKey(),
    hnId: integer('hn_id').unique().notNull(),
    title: text('title').notNull(),
    url: text('url'),
    content: text('content'),
    embedding: vector('embedding', { dimensions: 1536 }), // 1536 is the size for OpenAI embeddings
});
