import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
    headers: {
        "Content-Type": "application/json",
    },
});

export interface Destination {
    id: number;
    name: string;
    location: string;
    category: string;
    description: string;
    budget: string;
    image: string;
}

export const getDestinations = async (): Promise<Destination[]> => {
    const response = await API.get("/api/destinations/");

    return response.data.destinations;
};

export default API;