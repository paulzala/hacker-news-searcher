# Hacker News Searcher
A NextJS-hosted site using AWS services that allows a visitor to search HackerNews articles with semantic search using human language.

## Technology used
* Database: Postgres, for storing article embeddings
* Web Application framework: NextJS
* Hosting services: AWS (Cloudfront, Lambda, etc)
* ORM library: Prisma
* Local containerisation: Docker

## Local development
Fire up the local database in docker:
```bash
docker-compose up
# docker-compose down -v
```


Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Project plan
1. Initisalise Code repos
* [x] Create nextJs App
* [x] Environment Files
* [x] Define Data Models

2. Provision Infrastructure (AWS IaC)
* [ ] Provision the Amazon RDS PostgreSQL instance with the pgvector extension enabled
* [ ] Get Secrets
* [ ] Deploy IaC Code

3. Build the Data Pipeline (Batch Job)
* [ ] Install Dependencies
* [ ] Data ingestion

4. Implement Application Logic (Next.js)
* [ ] Database Connection
* [ ] Semantic Search API
* [ ] Frontend UI

