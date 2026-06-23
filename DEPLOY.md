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

Which provider should I configure automatic deploys for (Render, Vercel, Fly, Heroku, or something else)?

Vercel + Render setup
---------------------

To enable the automatic deploy workflow (`.github/workflows/deploy-vercel-render.yml`) set the following GitHub repository secrets:

- `VERCEL_TOKEN` - your Vercel personal token (Team or Personal Account)
- `VERCEL_ORG_ID` - the Vercel organization id for the project
- `VERCEL_PROJECT_ID` - the Vercel project id to deploy
- `RENDER_API_KEY` - your Render API key
- `RENDER_SERVICE_ID` - the Render service id for your backend

How to get them:

- Vercel: visit your project settings → General → Git Integration / Tokens to create a token and find the org/project IDs in the project settings.
- Render: in your Render dashboard, create a service for the backend (or connect the repo) and copy the `Service ID` from the service settings; create an API key in Account → API Keys.

Once secrets are configured, pushing to `main` will build the frontend, deploy it to Vercel, and trigger a backend deploy on Render.

Note: Do not hard-code `localhost` or any backend URL in frontend source files. The frontend already reads the backend address from `VITE_API_URL`, which should be set in the Vercel project environment variables.
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
