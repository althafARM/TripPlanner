import { MapPin, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Destination } from "../types";

export default function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="destination-card">
      <div className="destination-image">
        <img src={destination.image} alt={destination.name} loading="lazy" onError={e => { e.currentTarget.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1000"; }} />
        <span className="category-pill">{destination.category}</span>
      </div>
      <div className="destination-content">
        <div className="destination-location"><MapPin size={14} />{destination.location}</div>
        <h3>{destination.name}</h3>
        <p>{destination.description}</p>
        <div className="destination-bottom"><span>Budget: <b>{destination.budget}</b></span><Link to={`/planner?destination=${encodeURIComponent(destination.name)}`}>Plan trip <ArrowUpRight size={16} /></Link></div>
      </div>
    </article>
  );
}