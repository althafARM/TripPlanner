import { Link } from "react-router-dom";
import { Compass, Plus } from "lucide-react";

export default function MyTrips() {
  return <div className="page-shell simple-page"><div className="container"><span className="eyebrow">YOUR TRAVEL SPACE</span><h1>My <em>trips.</em></h1><p className="page-lead">Your saved journeys will appear here.</p><div className="empty-state trips-empty"><span className="empty-icon"><Compass size={30} /></span><h2>Your next adventure is waiting.</h2><p>You have not created a trip yet. Start planning and your journeys can live here.</p><Link to="/planner" className="button button-primary"><Plus size={17} /> Plan your first trip</Link></div></div></div>;
}