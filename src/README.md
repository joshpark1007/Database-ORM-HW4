# TypeORM Homework4 | Joshua (Chang Hyeon) Park
This project implements full-load and incremental ETL operations using TypeORM,
syncing data from Sakila MySQL database into a lightweight SQLite analytics DB.

# Installation
npm install

# scripts from package.json
"init-db": "ts-node src/cli.ts init",
"sanity-check": "ts-node src/sanity-check.ts",
"runIncremental": "ts-node src/incremental/runIncremental.ts",
"full-load": "ts-node src/commands/fullLoad.ts"

# Commands
Initialization: npm run init-db
Optional Sanity Check: npm run sanity-check
Full Load: npm run full-load
Incremental Load: npm run runIncremental

# Project Structure
src/
  analytics/
    entities/               # Dim tables + SyncState
    data-source.ts          # temporary snapshot of analytics data-source
    SyncStateHelper.ts      # SyncState helper
  sakila/
    entities/               # ORM models for MySQL Sakila
    data-source.ts          # temporary snapshot of sakila data-source
  commands/
    init.ts                 # init-db command
    fullLoad.ts             # full-load command
  incremental/
    incremental-Dim*.ts
    runIncremental.ts       # incremental sync command
  data-sources.ts
  sanity-check.ts
