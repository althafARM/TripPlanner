import { Link } from "react-router-dom";
import {
ArrowRight,
MapPin,
Sparkles,
CalendarDays,
Users,
Wallet,
Mountain,
Waves,
Trees,
Plane
} from "lucide-react";

const destinations = [
{
name: "Ella",
country: "Sri Lanka",
price: "From LKR 12,000",
image: "photo-1500530855697-b586d89ba3ee",
rating: "4.9"
},
{
name: "Sigiriya",
country: "Sri Lanka",
price: "From LKR 8,000",
image: "photo-1544735716-392fe2489ffa",
rating: "4.8"
},
{
name: "Galle",
country: "Sri Lanka",
price: "From LKR 15,000",
image: "photo-1519046904884-53103b34b206",
rating: "4.9"
}
];

export default function Home() {
return ( <main> <section className="hero"> <div className="hero-overlay"></div>

    <div className="hero-content">
      <div className="hero-badge">
        <Sparkles size={16} />
        AI-POWERED TRAVEL PLANNING
      </div>

      <h1>
        Discover the World.
        <br />
        <span>We'll Plan the Journey.</span>
      </h1>

      <p>
        Your personal AI travel companion. Discover amazing destinations,
        create personalised itineraries and plan unforgettable journeys.
      </p>

      <div className="hero-buttons">
        <Link to="/planner" className="primary-button">
          Plan My Trip <ArrowRight size={18} />
        </Link>

        <Link to="/explore" className="secondary-button">
          Explore Destinations
        </Link>
      </div>

      <div className="hero-stats">
        <div>
          <strong>AI Powered</strong>
          <span>Smart Planning</span>
        </div>
        <div>
          <strong>Real-time</strong>
          <span>Travel Information</span>
        </div>
        <div>
          <strong>Personalised</strong>
          <span>Travel Experiences</span>
        </div>
      </div>
    </div>
  </section>

  <section className="planner-section">
    <div className="planner-heading">
      <div>
        <span className="section-label">YOUR NEXT ADVENTURE</span>
        <h2>Where do you want to go?</h2>
        <p>Let AI create your perfect travel experience.</p>
      </div>

      <Sparkles className="planner-sparkle" size={35} />
    </div>

    <div className="search-card">
      <div className="search-field">
        <MapPin />
        <div>
          <label>Destination</label>
          <input placeholder="Where do you want to go?" />
        </div>
      </div>

      <div className="search-field">
        <CalendarDays />
        <div>
          <label>Travel dates</label>
          <input type="date" />
        </div>
      </div>

      <div className="search-field">
        <Users />
        <div>
          <label>Travellers</label>
          <select defaultValue="2">
            <option value="1">1 Traveller</option>
            <option value="2">2 Travellers</option>
            <option value="3">3 Travellers</option>
            <option value="4">4 Travellers</option>
            <option value="5">5+ Travellers</option>
          </select>
        </div>
      </div>

      <div className="search-field">
        <Wallet />
        <div>
          <label>Budget (LKR)</label>
          <input type="number" placeholder="50000" />
        </div>
      </div>

      <Link to="/planner" className="search-button">
        <Sparkles size={18} />
        Create Trip
      </Link>
    </div>
  </section>

  <section className="destinations-section">
    <div className="section-heading">
      <div>
        <span className="section-label">EXPLORE SRI LANKA</span>
        <h2>Popular Destinations</h2>
        <p>Discover beautiful places for your next adventure.</p>
      </div>

      <Link to="/explore" className="view-all">
        View all <ArrowRight size={17} />
      </Link>
    </div>

    <div className="destination-grid">
      {destinations.map((destination) => (
        <article className="destination-card" key={destination.name}>
          <div
            className="destination-image"
            style={{
              backgroundImage: `url(https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=900&q=85)`
            }}
          >
            <span className="rating">★ {destination.rating}</span>
          </div>

          <div className="destination-info">
            <div>
              <span className="destination-country">
                {destination.country}
              </span>
              <h3>{destination.name}</h3>
            </div>

            <span className="destination-price">
              {destination.price}
            </span>
          </div>
        </article>
      ))}
    </div>
  </section>

  <section className="experience-section">
    <div className="section-heading">
      <div>
        <span className="section-label">TRAVEL YOUR WAY</span>
        <h2>Find Your Experience</h2>
        <p>What kind of adventure are you looking for?</p>
      </div>
    </div>

    <div className="experience-grid">
      <div className="experience-card">
        <Mountain />
        <h3>Adventure</h3>
        <p>Mountains, hiking and unforgettable experiences.</p>
      </div>

      <div className="experience-card">
        <Waves />
        <h3>Beach Escape</h3>
        <p>Relax on beautiful beaches and enjoy the ocean.</p>
      </div>

      <div className="experience-card">
        <Trees />
        <h3>Nature</h3>
        <p>Explore forests, waterfalls and wildlife.</p>
      </div>

      <div className="experience-card">
        <Plane />
        <h3>City Explorer</h3>
        <p>Discover culture, food and amazing cities.</p>
      </div>
    </div>
  </section>

  <section className="ai-banner">
    <div>
      <span className="section-label">YOUR PERSONAL TRAVEL ASSISTANT</span>
      <h2>Less Planning. More Exploring.</h2>
      <p>
        Let artificial intelligence handle your travel planning.
        You focus on creating unforgettable memories.
      </p>
      <Link to="/planner" className="primary-button">
        Start Planning <ArrowRight size={18} />
      </Link>
    </div>
    <Sparkles size={100} className="banner-icon" />
  </section>
</main>


);
}
