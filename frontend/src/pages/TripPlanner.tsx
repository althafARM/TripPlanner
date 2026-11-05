import { useState, useEffect } from "react";
import {
MapPin,
CalendarDays,
Users,
Wallet,
Sparkles,
Mountain,
Heart,
TreePine
} from "lucide-react";
import { useSearchParams } from "react-router-dom";

export default function TripPlanner() {
const [destination, setDestination] = useState("");
const [startLocation, setStartLocation] = useState("Colombo");
const [budget, setBudget] = useState("");
const [travellers, setTravellers] = useState("2");
const [travelStyle, setTravelStyle] = useState("Adventure");
const [duration, setDuration] = useState("3");
const [loading, setLoading] = useState(false);
const [searchParams] = useSearchParams();
const destinationFromUrl = searchParams.get("destination");
useEffect(() => {
    if (destinationFromUrl) {
        setDestination(destinationFromUrl);
    }
}, [destinationFromUrl]);

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();


if (!destination || !budget) {
  alert("Please enter your destination and budget.");
  return;
}

setLoading(true);

setTimeout(() => {
  setLoading(false);
  alert("Your trip preferences are ready! AI integration is coming next.");
}, 1000);


}

return ( <main className="trip-planner-page"> <section className="trip-planner-header"> <span className="section-label">YOUR PERSONAL AI TRAVEL ASSISTANT</span> <h1>Plan Your Perfect Journey</h1> <p>
Tell us what you love. Our AI will help create your personalised
travel experience. </p> </section>


  <form className="trip-form" onSubmit={handleSubmit}>
    <div className="form-heading">
      <Sparkles size={25} />
      <div>
        <h2>Let's Plan Your Trip</h2>
        <p>Complete your travel preferences below.</p>
      </div>
    </div>

    <div className="form-grid">
      <div className="form-group">
        <label>Destination *</label>
        <div className="form-input">
          <MapPin size={19} />
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="e.g. Ella, Sri Lanka"
            required
          />
        </div>
      </div>

      <div className="form-group">
        <label>Starting Location</label>
        <div className="form-input">
          <MapPin size={19} />
          <input
            value={startLocation}
            onChange={(e) => setStartLocation(e.target.value)}
            placeholder="e.g. Colombo"
          />
        </div>
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <div className="form-input">
          <CalendarDays size={19} />
          <input type="date" />
        </div>
      </div>

      <div className="form-group">
        <label>End Date</label>
        <div className="form-input">
          <CalendarDays size={19} />
          <input type="date" />
        </div>
      </div>

      <div className="form-group">
        <label>Number of Travellers</label>
        <div className="form-input">
          <Users size={19} />
          <select
            value={travellers}
            onChange={(e) => setTravellers(e.target.value)}
          >
            <option value="1">1 Traveller</option>
            <option value="2">2 Travellers</option>
            <option value="3">3 Travellers</option>
            <option value="4">4 Travellers</option>
            <option value="5">5 Travellers</option>
            <option value="6">6+ Travellers</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Number of Days</label>
        <div className="form-input">
          <CalendarDays size={19} />
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          >
            <option value="1">1 Day</option>
            <option value="2">2 Days</option>
            <option value="3">3 Days</option>
            <option value="5">5 Days</option>
            <option value="7">7 Days</option>
            <option value="10">10 Days</option>
            <option value="14">14 Days</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Total Budget (LKR)</label>
        <div className="form-input">
          <Wallet size={19} />
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            placeholder="50000"
            min="1"
            required
          />
        </div>
      </div>
    </div>

    <div className="form-group travel-style">
      <label>Choose Your Travel Style</label>

      <div className="travel-style-grid">
        {[
          { name: "Adventure", icon: Mountain },
          { name: "Relaxation", icon: Heart },
          { name: "Nature", icon: TreePine }
        ].map((style) => {
          const Icon = style.icon;

          return (
            <button
              type="button"
              key={style.name}
              className={
                travelStyle === style.name
                  ? "style-option selected"
                  : "style-option"
              }
              onClick={() => setTravelStyle(style.name)}
            >
              <Icon size={24} />
              {style.name}
            </button>
          );
        })}
      </div>
    </div>

    <button type="submit" className="generate-trip-button" disabled={loading}>
      <Sparkles size={20} />
      {loading ? "Preparing..." : "Generate My AI Trip"}
    </button>

    <p className="form-note">
      Your personalised itinerary will be generated using AI.
    </p>
  </form>
</main>


);
}
