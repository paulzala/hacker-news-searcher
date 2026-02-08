"use client";

import { useState, useActionState } from "react";
import { searchStories } from "@/app/actions";

export function SearchBar() {
    const [query, setQuery] = useState("");

    // hook arguments: (action, initialState)
    const [results, formAction, isPending] = useActionState(searchStories, []);

    return (
        <div className="w-full">
            <form action={formAction} className="flex gap-4">
                <input type="text"
                    name="query"
                    value={query}
                    onChange={(e => setQuery(e.target.value))}
                    placeholder="Search Hacker News..."
                    className="w-full p-4 rounded-xl border border-zinc-200 focus:outline-none
                        focus:ring-2 focus:ring-orange-500 dark:bg-zinc-900 dark:border-zinc-800 text-black dark:text-white"
                />
                <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white font-blod py-2 px-6 rounded-xl transition-color"
                    disabled={isPending}
                >
                    Search
                </button>
            </form>
            {query && <p className="mt-2 text-sm text-zinc-500">Press enter or click search to find: {query}</p>}

            {/* Basic Display of results */}
            <div className="mt-9 space-y-4">
                {results?.map((story: any) => (
                    <div key={story.id} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg">
                        <h3 className="font-bold text-zine-900 dark:text-zinc-100">{story.title}</h3>
                        {story.url && <a href={story.url} target="_blank" className="text-orange-500 text-sm hover:underline">({story.url})</a>}

                    </div>
                ))}
                {!isPending && results?.length === 0 && query && (
                    <p className="text-zinc-500 text-center py-4">No results found for "{query}"</p>
                )}
            </div>
        </div>
    );
};