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

## 2. Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Click `Continue with GitHub`
3. Select the `UniStudy` repo
4. Set these values:

- Framework Preset: `Vite`
- Root Directory: `frontend`

5. Under **Environment Variables** add:

- Name: `VITE_API_URL`
- Value: `https://<your-render-backend-url>`
- Environment: `Production`

6. Click `Deploy`

Your frontend URL will look like:

`https://unistudy.vercel.app`

## 3. Deploy Backend to Render

1. Go to https://render.com
2. Click `New` → `Web Service`
3. Connect GitHub and select `UniStudy`
4. Set these values:

- Root Directory: `backend`
- Environment: `Node`
- Build Command: `npm install`
- Start Command: `npm start`

5. Click `Create Web Service`

Your backend URL will look like:

`https://unistudy-api.onrender.com`

## 4. Set the backend URL in Vercel

In the Vercel project settings, update `VITE_API_URL` to:

`https://unistudy-api.onrender.com`

## 5. No frontend code edits required

Your current frontend already uses:

```js
const apiUrl = import.meta.env.VITE_API_URL || ''
```

So you do not need to modify `frontend/src/pages/Register.jsx`, `Login.jsx`, or `Profile.jsx`.

## 6. Push any changes

If you make changes, push them:

```bash
git add .
git commit -m "Deploy ready"
git push
```

Vercel will automatically redeploy the frontend.

## 7. Confirm deployment

Open the Vercel URL and verify that the app loads.
Make sure the backend URL is correct in `VITE_API_URL`.

## 8. If the front end can’t reach the backend

1. Confirm `VITE_API_URL` is set to your Render URL in Vercel.
2. Confirm the Render service is live.
3. Confirm CORS is allowed in the backend (`cors()` is already enabled).

---

If you want, I can also add direct `Vercel CLI` and `Render CLI` commands for advanced deploys.