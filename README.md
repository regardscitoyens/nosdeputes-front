
# Documentation

## Run the project locally

### Get the code

To get the full project locally, you need to clone the following repository:

- This repository: The frontend
- [tricoteuses-assemblee](https://git.en-root.org/tricoteuses/tricoteuses-assemblee): Fetch the open data, transform them and provide helpers to navigate the data.
- [tricoteuses-api-parlement](https://git.en-root.org/tricoteuses/tricoteuses-api-parlement): Takes data from `tricoteuses-assemblee` and store them in a PostgreSQL database.

### Get the data

1. Follow [tricoteuses-assemblee](https://git.en-root.org/tricoteuses/tricoteuses-assemblee) instructions. At the end, you should have a folder `assemblee-data/` full of data files. Take care of filtering to get only one legislature (preferably the last one) to reduce download time.

2. Follow [tricoteuses-api-parlement](https://git.en-root.org/tricoteuses/tricoteuses-api-parlement) instructions to move those data into a DB.

If like me you're not that good with DB management, you can install docker, and run the following command:

```
docker run -d \
 --name assemblee_postgres \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_USER=postgres \
 -e POSTGRES_DB=assemblee \
 -v pg_data:/var/lib/postgresql/data \
 -p 5431:5432 \
 ankane/pgvector:latest
```

It create a DB that you will be able to start with `docker start assemblee_postgres` command. The DB will be accessible at `postgres://postgres:postgres@localhost:5431/assemblee?schema=public`.

### Run the website

## Install

Run the following command to install the project.

```bash
npm run install
```

## Update the Prisma model

The project uses Prisma to type DB interaction.
It provides an ORM to fetch data from the DB, and types.

In the `.env` file, add two variables:

- `TRICOTEUSES_ASSEMBLEE_API_DB_URL`: The address of the DB. For example `"postgres://postgres:postgres@localhost:5431/assemblee?schema=public"` with the docker proposed.
- `TRICOTEUSES_ASSEMBLEE_API_REPO`: The relative path to the cloned [tricoteuses-api-parlement](https://git.en-root.org/tricoteuses/tricoteuses-api-parlement) repo.

Then you should be able to run `npm run import-prisma` to copy the prisma config files from the cloned [tricoteuses-api-parlement](https://git.en-root.org/tricoteuses/tricoteuses-api-parlement) to the front one.

From that you can run `npx prisma generate` to update the Prisma TypeScript.

## Start dev server

Run the folowing command to start the dev server.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
