# TripPlanner AI — Frontend

A React + TypeScript + Vite frontend for the TripPlanner AI project.

## Requirements
- Node.js 18 or newer
- npm
- Backend API running at `http://127.0.0.1:8000` (optional for the sample destination fallback)

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:5173

## Environment

Copy `.env.example` to `.env` if your backend uses a different address:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

Restart Vite after changing `.env`.

## Pages
- `/` Home
- `/explore` Explore destinations (loads `/api/destinations/`, falls back to sample data)
- `/planner` Trip preference form (AI generation endpoint is not connected yet)
- `/my-trips` Saved trips placeholder
- `/chat` Assistant UI preview (AI response service is not connected yet)

## Important
The current frontend is a working UI foundation. Trip generation, saved trips and chat responses require corresponding backend endpoints. The planner and chat currently show preview messages rather than claiming to generate real AI results.
