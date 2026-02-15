# Findly - Feature Request System

Feature requests app with voting.

Started with the backend to establish the data model and API, then built the client to consume real endpoints. Bonus tasks focused on Docker and deployment.

## Stack
- Frontend: React + Vite + TypeScript, TailwindCSS, TanStack Query
- Backend: NestJS + TypeScript
- DB: PostgreSQL + Prisma
- Infra: Docker

## Run with Docker (recommended)
```bash
docker compose up -d db
cd backend
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/findl_db" npx prisma migrate dev --name init --schema ./prisma/schema.prisma
cd ..
docker compose up --build
```

- App: http://localhost:8080
- API: http://localhost:3000

Stop:
```bash
docker compose down
```

## Run locally (without Docker)
```bash
cd backend
npm install
DATABASE_URL="postgresql://user:password@localhost:5432/findl_db" npx prisma migrate dev --name init --schema ./prisma/schema.prisma
npm run dev
```

```bash
cd client
npm install
npm run dev
```

## API (short)
- `GET /user` – list users
- `GET /features` – list feature requests
- `POST /features` – create feature request
- `POST /votes` – vote on a feature

## Deploy
- Backend URL: https://findl-feature-assignment.onrender.com
- Frontend URL: https://findlyproject.netlify.app
