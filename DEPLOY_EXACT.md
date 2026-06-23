# Exact Vercel + Render Deployment Steps for UniStudy

## 1. Push repository to GitHub

```bash
cd C:\Users\Hp\Git\UniStudy
git init
git add .
git commit -m "Initial UniStudy project"
git remote add origin https://github.com/YOUR_USERNAME/UniStudy.git
git branch -M main
git push -u origin main
```

## 2. Option A — Vercel monorepo deployment

1. Go to https://vercel.com
2. Click `Continue with GitHub`
3. Select the `UniStudy` repo
4. Use the repository root so Vercel reads `vercel.json`
5. Add this environment variable:

- `VITE_API_URL` = `/_/backend`

6. Deploy

The frontend service will use `/_/backend` for API calls, and the backend service will be available at the Vercel route prefix.

## 3. Option B — Vercel frontend + Render backend

### Deploy backend to Render

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

### Deploy frontend to Vercel

1. Go to https://vercel.com
2. Click `Continue with GitHub`
3. Select the `UniStudy` repo
4. Set Root Directory to `frontend`
5. Set Framework Preset to `Vite`
6. Add this environment variable:

- `VITE_API_URL` = `https://<your-backend>.onrender.com`

7. Deploy

## 4. Frontend API configuration

Your current frontend already uses:

```js
const apiUrl = import.meta.env.VITE_API_URL || ''
```

No frontend code changes are needed for deployment.

## 5. GitHub deploy workflow

This repo already contains `.github/workflows/deploy-vercel-render.yml`.

If you want CI-triggered deploys, set these GitHub repository secrets:

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `RENDER_API_KEY`
- `RENDER_SERVICE_ID`

## 6. Verify deployment

- Open the Vercel frontend URL
- Confirm the login page loads
- Confirm the frontend can call the backend
- If using Render, verify the backend service is live

## 7. Troubleshooting

- If frontend can’t reach the backend, verify `VITE_API_URL` in Vercel
- If using Option A, `VITE_API_URL` must be `/_/backend`
- If using Option B, `VITE_API_URL` must be your Render backend URL
- CORS is already enabled in the backend
