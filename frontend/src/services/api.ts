import axios from "axios";
import type { Destination, TripRequest } from "../types";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000",
  timeout: 60000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Get all destinations
export async function getDestinations(): Promise<Destination[]> {
  const response = await API.get("/api/destinations/");
  return response.data.destinations ?? [];
}

// Generate AI travel itinerary
export async function generateTrip(payload: TripRequest) {
  const response = await API.post("/api/trips/generate", payload);
  return response.data;
}

export default API;