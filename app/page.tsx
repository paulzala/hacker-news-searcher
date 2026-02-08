import Image from "next/image";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
      <div className="max-h-screen bg-zinc-50 dark:bg-black">
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Hacker News <span className="text-orange-500">Searcher</span>
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zine-400 text-lg">
            A semantic search engine for the orange site.
          </p>

        </header>

        <section className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border
        border-zinc-200 dark:border-zinc-800">
          <SearchBar />
        </section>

        <footer className="mt-12 text-center text-zinc-500 5ext-sm">
          Build with Next.js 16, TypeScript, and pgvector.
        </footer>
      </div>
    </main>
  );
}
