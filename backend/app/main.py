from app.api.destinations import router as destinations_router
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
title="TripPlanner AI API",
description="AI-powered personalised travel planning platform",
version="1.0.0"
)

# Allow frontend communication

app.add_middleware(
CORSMiddleware,
allow_origins=[
"http://localhost:5173",
"http://127.0.0.1:5173"
],
allow_credentials=True,
allow_methods=["*"],
allow_headers=["*"],
)

app.include_router(destinations_router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to TripPlanner AI",
        "status": "Running",
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health():
    return {
        "status": "healthy",
        "application": "TripPlanner AI"
    }

@app.get("/api/info")
async def application_info():
    return {
        "name": "TripPlanner AI",
        "description": "Your Journey, Intelligently Planned",
        "features": [
        "AI Travel Planning",
        "Destination Discovery",
        "Smart Budget Planning",
        "Personalised Itineraries",
        "RAG Travel Assistant",
        "Real-time Travel Information"
        ]
    }
