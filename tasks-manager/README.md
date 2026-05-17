# Tasks Manager

Full-stack task management app. Create, edit, complete, and delete tasks.

**Stack:** Express 5 + TypeScript + Prisma (MongoDB) · React 19 + Vite + Tailwind + TanStack Query

## Structure

```
tasks-manager/
├── server/   # Express API
└── ui/       # React frontend
```

## Prerequisites

- Node.js
- MongoDB connection string (Atlas or local)

## Setup

1. Copy `server/.env.example` to `server/.env` and set `DATABASE_URL`.
2. Install dependencies and generate the Prisma client:

```bash
cd server && npm install && npm run db:generate
cd ../ui && npm install
```

## Running

From `tasks-manager/`:

```bash
npm run dev   # starts both server (port 5002) and UI (Vite dev server) concurrently
```

Or run each separately:

```bash
# server
cd server && npm start

# ui
cd ui && npm run dev
```

## API

| Method | Path            | Description      |
|--------|-----------------|------------------|
| GET    | `/api/v1/tasks` | List all tasks   |
| POST   | `/api/v1/tasks` | Create a task    |
| PATCH  | `/api/v1/tasks/:id` | Update a task |
| DELETE | `/api/v1/tasks/:id` | Delete a task |

## Database

Prisma schema lives in `server/prisma/schema.prisma`. After changing the schema, run:

```bash
cd server && npm run db:push      # sync schema to MongoDB
cd server && npm run db:generate  # regenerate Prisma client
```
