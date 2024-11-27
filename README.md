
# Documentation

## Database

The project uses a postGreSQL database, the env variables need to be set in .env.local to connect to the database. See env.example for an example.

To create a locale version of the DB you can clone the [tricoteuses-api-assemblee-orm](https://git.en-root.org/tricoteuses/tricoteuses-api-assemblee-orm) project.

On linux, you can run the following command to enter your postgres DB

```bash
sudo -u postgres psql
```

The in postgres, you can setup the DB for a given `<username>` with

```bash
REVOKE CONNECT ON DATABASE assemblee FROM public;

SELECT pg_terminate_backend(pg_stat_activity.pid)
FROM pg_stat_activity
WHERE pg_stat_activity.datname = 'assemblee';

DROP DATABASE IF EXISTS assemblee;

CREATE DATABASE assemblee
    WITH
    OWNER = <username>
    ENCODING = 'UTF8'
    LC_COLLATE = 'fr_FR.UTF-8'
    LC_CTYPE = 'fr_FR.UTF-8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

GRANT TEMPORARY, CONNECT ON DATABASE assemblee TO PUBLIC;

GRANT ALL ON DATABASE assemblee TO <username>;

ALTER USER <username> CREATEDB;
```

Now you can run scripts from [tricoteuses-api-assemblee-orm](https://git.en-root.org/tricoteuses/tricoteuses-api-assemblee-orm) repro.

# Setup the project

## Install

Run the following command to install the project.

```bash
npm run install
```

## Update the Prisma model

The project uses Prisma to type DB interaction.

In the `.env` file, add a variable `TRICOTEUSES_ASSEMBLEE_API_REPO` that is the relative path to the cloned [tricoteuses-api-assemblee-orm](https://git.en-root.org/tricoteuses/tricoteuses-api-assemblee-orm) repro.
Then you should be able to run `npm run import-prisma` to copy prisma config files from the DB repo to the front one.
And run `npx prisma generate` to update the Prisma TypeScript.

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

# Dedicated database

The project expect a postGreSQL database.

It can be found on Scaleway:

```bash
psql -h 51.159.207.103 --port 1695 -d rdb -U default_user
```
