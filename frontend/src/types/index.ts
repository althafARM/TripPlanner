export interface Destination {
  id: number;
  name: string;
  location: string;
  category: string;
  description: string;
  budget: string;
  image: string;
}

export interface TripRequest {
  destination: string;
  start_location: string;
  days: number;
  budget: string;
  travel_style: string;
  travellers: number;
}

export interface TripResponse {
  success: boolean;
  destination: string;
  itinerary: string;
}