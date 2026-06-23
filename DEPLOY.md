# UniStudy Deployment Guide

## 1. Local development

1. Start the backend in dev mode:

```bash
cd backend
npm install
npm run dev
```

2. Start the frontend dev server:

```bash
cd frontend
npm install
npm run dev
```

3. Optional local `.env` for the frontend:

Copy `frontend/.env.example` to `frontend/.env` and set:

```text
VITE_API_URL=http://localhost:5000
```

## 2. Production build + local backend serve

1. Build the frontend:

```bash
cd frontend
npm install
npm run build
```

2. Start the backend in production:

```bash
cd backend
npm install
NODE_ENV=production npm start
```

The backend will serve the built frontend files only if `frontend/dist` exists.

## 3. Option A — Vercel monorepo deployment

This repository includes `vercel.json` with an experimental multi-service setup.

- Frontend service root: `frontend`
- Backend service root: `backend`
- Backend route prefix: `/_/backend`

In Vercel project settings, set the environment variable:

- `VITE_API_URL` = `/_/backend`

Then the frontend will call endpoints like:

- `/_/backend/auth/login`
- `/_/backend/auth/register`

### Vercel setup for monorepo

1. Go to https://vercel.com
2. Connect your GitHub repo
3. Use the repository root so Vercel reads `vercel.json`
4. Add the environment variable:
   - `VITE_API_URL` = `/_/backend`
5. Deploy

> Note: Vercel monorepo services are experimental. If you see issues, switch to Option B.

## 4. Option B — Vercel frontend + Render backend

### Render backend

1. Go to https://render.com
2. Click `New` → `Web Service`
3. Connect your GitHub repo and select `UniStudy`
4. Set the service root directory to `backend`
5. Set the build command to `npm install`
6. Set the start command to `npm start`
7. Deploy the service

Your backend URL will look like:

```text
https://<your-backend>.onrender.com
```

### Vercel frontend

1. Go to https://vercel.com
2. Connect your GitHub repo
3. Set the root directory to `frontend`
4. Set the framework preset to `Vite`
5. Add this environment variable:
   - `VITE_API_URL` = `https://<your-backend>.onrender.com`
6. Deploy

## 5. Environment variables

- `PORT` — backend port, default `5000`
- `NODE_ENV` — set to `production` on the host
- `VITE_API_URL` — public backend URL used by the frontend

## 6. Notes

- The frontend already reads `VITE_API_URL` from `import.meta.env`.
- Do not hard-code backend URLs in production.
- For local testing, use `frontend/.env.example`.
- In Option A, `VITE_API_URL` should be `/_/backend`.
- In Option B, `VITE_API_URL` should be your Render backend URL.

## 7. Optional GitHub deploy workflow

This repository already contains `.github/workflows/deploy-vercel-render.yml` for automatic deployment.

You can set these GitHub secrets if you want CI-triggered deploys:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

Deployment steps for UniStudy

Local preview (dev):

1. Start backend in dev mode

```bash
cd backend
npm install
npm run dev
```

2. Start frontend dev server

```bash
cd frontend
npm install
npm run dev
```

Production build + serve from backend:

1. Build frontend

```bash
cd frontend
npm install
# set VITE_API_URL to your backend URL if needed
npm run build
```

2. Start backend in production (it will serve `frontend/dist` when `NODE_ENV=production`)

```bash
cd backend
npm install
# set environment variables on the host: PORT (default 5000)
# and optionally VITE_API_URL to the backend public URL
NODE_ENV=production node src/server.js
```

Deploying to a host (Render / DigitalOcean App / Heroku / Fly):

- Build the frontend during your CI or build step and place the `dist` output under `frontend/dist` relative to the backend folder, or configure your build to copy the built files into the backend's `public` folder.
- Ensure the host sets `NODE_ENV=production` and the public `VITE_API_URL` to your backend URL.
- Use the `start` script added to `backend/package.json` (`node src/server.js`) as the production command.

Notes:
- Do NOT commit `.env` files with secrets. Use host-provided environment variables for production.
- For convenience, add `VITE_API_URL` in `frontend/.env` during local development pointing to your local backend.

Environment variables
---------------------

- `PORT` - (backend) port the Express server listens on (default `5000`).
- `NODE_ENV` - set to `production` on the server so the backend serves the built frontend.
- `VITE_API_URL` - (frontend) public URL of your backend API. During local development set this in `frontend/.env`, and in production set it using your host's environment variable settings.
- `RENDER_SERVICE_ID`, `RENDER_API_KEY` - example secrets if you use Render; set them in GitHub Actions secrets to enable automatic deploys.

Security note: store any JWT secrets or database credentials in the host's secret manager; never commit them to the repo.
