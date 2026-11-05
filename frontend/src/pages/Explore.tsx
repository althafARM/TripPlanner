import { useEffect, useState } from "react";
import { MapPin, Search, Star, ArrowRight } from "lucide-react";

import {
    getDestinations,
    type Destination,
} from "../services/api";

function Explore() {
    // Store destinations received from the backend
    const [destinations, setDestinations] = useState<Destination[]>([]);

    // Search and category filters
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");

    // Loading and error states
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Available categories
    const categories = [
        "All",
        "Nature",
        "Adventure",
        "Beach",
        "Culture",
    ];

    // Fetch destinations from FastAPI
    useEffect(() => {
        const fetchDestinations = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getDestinations();

                setDestinations(data);
            } catch (err) {
                console.error("Failed to fetch destinations:", err);
                setError(
                    "Unable to load destinations. Please check your backend connection."
                );
            } finally {
                setLoading(false);
            }
        };

        fetchDestinations();
    }, []);

    // Search and category filtering
    const filteredDestinations = destinations.filter((destination) => {
        const matchesSearch =
            destination.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            destination.location
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            destination.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesCategory =
            selectedCategory === "All" ||
            destination.category.toLowerCase() ===
                selectedCategory.toLowerCase();

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="explore-page">

            {/* Explore Hero */}
            <section className="explore-hero">

                <div className="explore-hero-content">
                    <span className="hero-badge">
                        Discover Sri Lanka
                    </span>

                    <h1>
                        Explore Beautiful
                        <span> Destinations</span>
                    </h1>

                    <p>
                        Discover amazing places, explore new experiences,
                        and find your next unforgettable journey with
                        TripPlanner AI.
                    </p>
                </div>

                {/* Search Box */}
                <div className="explore-search">

                    <Search size={20} />

                    <input
                        type="text"
                        placeholder="Search destinations..."
                        value={searchTerm}
                        onChange={(event) =>
                            setSearchTerm(event.target.value)
                        }
                    />

                </div>

            </section>


            {/* Category Filters */}
            <section className="explore-content">

                <div className="category-filters">

                    {categories.map((category) => (
                        <button
                            key={category}
                            className={
                                selectedCategory === category
                                    ? "category-button active"
                                    : "category-button"
                            }
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category}
                        </button>
                    ))}

                </div>


                {/* Destination Results */}
                <div className="explore-results-header">

                    <div>
                        <h2>Popular Destinations</h2>

                        <p>
                            Find your perfect travel destination.
                        </p>
                    </div>

                    {!loading && !error && (
                        <span className="results-count">
                            {filteredDestinations.length} destinations
                        </span>
                    )}

                </div>


                {/* Loading */}
                {loading && (
                    <div className="empty-state">
                        <p>Loading amazing destinations...</p>
                    </div>
                )}


                {/* Error */}
                {!loading && error && (
                    <div className="empty-state">
                        <h3>Something went wrong</h3>

                        <p>{error}</p>

                        <button
                            className="explore-button"
                            onClick={() => window.location.reload()}
                        >
                            Try Again
                        </button>
                    </div>
                )}


                {/* Destination Cards */}
                {!loading && !error && filteredDestinations.length > 0 && (

                    <div className="explore-grid">

                        {filteredDestinations.map((destination) => (

                            <article
                                className="explore-card"
                                key={destination.id}
                            >

                                {/* Destination Image */}
                                <div className="explore-card-image">

                                    <img
                                        src={destination.image}
                                        alt={destination.name}
                                        loading="lazy"
                                    />

                                    <span className="destination-category">
                                        {destination.category}
                                    </span>

                                </div>


                                {/* Destination Information */}
                                <div className="explore-card-content">

                                    <div className="destination-location">

                                        <MapPin size={16} />

                                        <span>
                                            {destination.location}
                                        </span>

                                    </div>


                                    <h3>
                                        {destination.name}
                                    </h3>


                                    <p>
                                        {destination.description}
                                    </p>


                                    <div className="destination-details">

                                        <span className="destination-budget">
                                            Budget: {destination.budget}
                                        </span>

                                    </div>


                                    {/* Explore Button */}
                                    <button
                                        type = "button"
                                        className="explore-button"
                                        onClick={() => {
                                            window.location.href =
                                                `/planner?destination=${encodeURIComponent(destination.name)}`;
                                        }}
                                    >
                                        Plan Your Trip

                                        <ArrowRight size={17} />

                                    </button>

                                </div>

                            </article>

                        ))}

                    </div>

                )}


                {/* No Results */}
                {!loading &&
                    !error &&
                    filteredDestinations.length === 0 && (

                        <div className="empty-state">

                            <Search size={35} />

                            <h3>No destinations found</h3>

                            <p>
                                Try another search or select a different
                                category.
                            </p>

                            <button
                                className="explore-button"
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedCategory("All");
                                }}
                            >
                                Clear Filters
                            </button>

                        </div>

                    )}

            </section>

        </main>
    );
}

export default Explore;