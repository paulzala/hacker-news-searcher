import { db } from "@/db";

async function main() {
    const result = await db.execute('select 1');
    console.log("Successful", result);
}

main().catch(console.error);