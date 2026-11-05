import { MapPin, CalendarDays, Plus, Compass } from "lucide-react";
import { Link } from "react-router-dom";

export default function MyTrips() {
return ( <main className="my-trips-page"> <section className="my-trips-header"> <div> <span className="section-label">YOUR TRAVEL COLLECTION</span> <h1>My Trips</h1> <p>All your travel plans in one place.</p> </div>

    <Link to="/planner" className="primary-button">
      <Plus size={18} />
      Create New Trip
    </Link>
  </section>

  <section className="empty-trips">
    <div className="empty-trips-icon">
      <Compass size={55} />
    </div>

    <h2>No trips planned yet</h2>

    <p>
      Your next adventure is waiting! Start planning a trip
      and your saved itineraries will appear here.
    </p>

    <Link to="/planner" className="primary-button">
      Start Planning <Plus size={18} />
    </Link>
  </section>
</main>

);
}
