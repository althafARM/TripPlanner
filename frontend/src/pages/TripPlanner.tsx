import { useState } from "react";
import type { ReactNode, FormEvent } from "react";
import ReactMarkdown from "react-markdown";
import { useSearchParams } from "react-router-dom";
import AIChat from "../components/AIChat";

import {
  CalendarDays,
  MapPin,
  Sparkles,
  Users,
  Wallet,
  Sunrise,
  Sun,
  Moon,
  Utensils,
  Car,
  Lightbulb,
  Clock,
  Plane,
  ArrowRight,
  RefreshCw,
  CheckCircle2,
} from "lucide-react";

import { generateTrip } from "../services/api";
import WeatherCard from "../components/WeatherCard";

const interestsList = [
  "Nature",
  "Beaches",
  "Food",
  "Culture",
  "Adventure",
  "Photography",
];

interface DayPlan {
  title: string;
  content: string;
}

interface ActivitySection {
  title: string;
  content: string;
  icon: ReactNode;
  className: string;
}

// Split itinerary into activity sections
const getActivitySections = (
  text: string
): ActivitySection[] => {
  const sections = [
    {
      title: "MORNING",
      icon: <Sunrise size={21} />,
      className: "morning-card",
    },
    {
      title: "AFTERNOON",
      icon: <Sun size={21} />,
      className: "afternoon-card",
    },
    {
      title: "EVENING",
      icon: <Moon size={21} />,
      className: "evening-card",
    },
    {
      title: "FOOD RECOMMENDATIONS",
      icon: <Utensils size={21} />,
      className: "food-card",
    },
    {
      title: "TRANSPORT",
      icon: <Car size={21} />,
      className: "transport-card",
    },
    {
      title: "ESTIMATED DAILY COST",
      icon: <Wallet size={21} />,
      className: "cost-card",
    },
  ];

  const headingPattern =
    /^\s*(?:#{1,6}\s*)?(?:\*\*)?(MORNING|AFTERNOON|EVENING|FOOD RECOMMENDATIONS|TRANSPORT|ESTIMATED DAILY COST)(?:\*\*)?\s*:?\s*$/gim;

  const matches = [...text.matchAll(headingPattern)];

  return sections
    .map((item) => {
      const matchIndex = matches.findIndex(
        (match) =>
          match[1].toUpperCase() === item.title
      );

      if (matchIndex === -1) {
        return { ...item, content: "" };
      }

      const currentMatch = matches[matchIndex];

      const start =
        currentMatch.index! + currentMatch[0].length;

      const nextMatch = matches[matchIndex + 1];

      const end = nextMatch
        ? nextMatch.index!
        : text.length;

      return {
        ...item,
        content: text.slice(start, end).trim(),
      };
    })
    .filter((item) => item.content.length > 0);
};

export default function TripPlanner() {
  const [searchParams] = useSearchParams();

  const [destination, setDestination] = useState(
    searchParams.get("destination") || ""
  );

  const [startLocation, setStartLocation] =
    useState("Colombo");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [travellers, setTravellers] = useState(2);
  const [budget, setBudget] = useState("50000");
  const [style, setStyle] = useState("Relaxing");

  const [interests, setInterests] = useState<string[]>([
    "Nature",
    "Food",
  ]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [itinerary, setItinerary] = useState("");

  // Calculate trip duration
  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.round(
            (new Date(`${endDate}T00:00:00`).getTime() -
              new Date(`${startDate}T00:00:00`).getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        )
      : 0;

  // Select or remove interests
  const toggleInterest = (interest: string) => {
    setInterests((previous) =>
      previous.includes(interest)
        ? previous.filter((item) => item !== interest)
        : [...previous, interest]
    );
  };

  // Generate itinerary
  const handleGenerate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setItinerary("");

    if (!destination.trim()) {
      setError("Please enter your destination.");
      return;
    }

    if (!startLocation.trim()) {
      setError("Please enter your starting location.");
      return;
    }

    if (!startDate || !endDate) {
      setError("Please select your travel dates.");
      return;
    }

    if (new Date(endDate) < new Date(startDate)) {
      setError("End date must be after the start date.");
      return;
    }

    if (interests.length === 0) {
      setError("Please select at least one travel interest.");
      return;
    }

    try {
      setLoading(true);

      const response = await generateTrip({
        destination: destination.trim(),
        start_location: startLocation.trim(),
        days,
        budget: `LKR ${budget}`,
        travel_style: `${style}. Interests: ${interests.join(", ")}.`,
        travellers,
      });

      if (!response?.itinerary) {
        throw new Error(
          "The AI did not return an itinerary."
        );
      }

      setItinerary(response.itinerary);
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to generate your trip. Please try again.";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  // Reset planner
  const resetPlanner = () => {
    setItinerary("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Split AI response into individual days
  const getDayPlans = (text: string): DayPlan[] => {
    const sections = text.split(
      /(?=^\s{0,3}(?:#{1,6}\s*)?(?:\*\*)?DAY\s*\d+\b.*$)/gim
    );

    return sections
      .map((section) => {
        const lines = section.trim().split("\n");

        const title = lines[0]
          .replace(/^#{1,6}\s*/, "")
          .replace(/\*\*/g, "")
          .trim();

        return {
          title,
          content: lines.slice(1).join("\n").trim(),
        };
      })
      .filter(
        (day) =>
          /^DAY\s*\d+/i.test(day.title) &&
          day.content.length > 0
      );
  };

  const dayPlans = itinerary
    ? getDayPlans(itinerary)
    : [];

  // Google Maps directions URL
  const googleMapsUrl = `https://www.google.com/maps/dir/${encodeURIComponent(
    startLocation.trim()
  )}/${encodeURIComponent(destination.trim())}`;

  return (
    <div className="planner-page">

      {/* PAGE HEADER */}
      <section className="planner-hero">
        <div className="planner-hero-content">
          <span className="planner-badge">
            <Sparkles size={15} />
            AI POWERED TRAVEL PLANNER
          </span>

          <h1>
            Your next adventure,
            <br />
            <span>beautifully planned.</span>
          </h1>

          <p>
            Tell us what you love. Our AI will create a
            personalised travel experience just for you.
          </p>
        </div>
      </section>

      <div className="planner-container">

        {/* TRIP FORM */}
        {!itinerary && (
          <div className="planner-layout">

            {/* LEFT FORM */}
            <div className="planner-form-card">
              <div className="planner-card-heading">
                <div>
                  <span className="planner-step">
                    STEP 01
                  </span>

                  <h2>Plan your journey</h2>

                  <p>
                    Tell us a little about your dream trip.
                  </p>
                </div>

                <div className="planner-heading-icon">
                  <Plane size={25} />
                </div>
              </div>

              <form onSubmit={handleGenerate}>

                {/* DESTINATION */}
                <div className="form-group">
                  <label>
                    <MapPin size={17} />
                    Where do you want to go?
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Ella, Sri Lanka"
                    value={destination}
                    onChange={(e) =>
                      setDestination(e.target.value)
                    }
                    required
                  />
                </div>

                {/* START LOCATION */}
                <div className="form-group">
                  <label>
                    <MapPin size={17} />
                    Starting location
                  </label>

                  <input
                    type="text"
                    placeholder="e.g. Colombo"
                    value={startLocation}
                    onChange={(e) =>
                      setStartLocation(e.target.value)
                    }
                    required
                  />
                </div>

                {/* DATES */}
                <div className="form-row">
                  <div className="form-group">
                    <label>
                      <CalendarDays size={17} />
                      Start date
                    </label>

                    <input
                      type="date"
                      value={startDate}
                      onChange={(e) =>
                        setStartDate(e.target.value)
                      }
                      min={
                        new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      <CalendarDays size={17} />
                      End date
                    </label>

                    <input
                      type="date"
                      value={endDate}
                      onChange={(e) =>
                        setEndDate(e.target.value)
                      }
                      min={
                        startDate ||
                        new Date().toISOString().split("T")[0]
                      }
                      required
                    />
                  </div>
                </div>

                {/* TRAVELLERS */}
                <div className="form-group">
                  <label>
                    <Users size={17} />
                    Number of travellers
                  </label>

                  <div className="traveller-control">
                    <button
                      type="button"
                      onClick={() =>
                        setTravellers((value) =>
                          Math.max(1, value - 1)
                        )
                      }
                    >
                      −
                    </button>

                    <span>{travellers} Travellers</span>

                    <button
                      type="button"
                      onClick={() =>
                        setTravellers((value) =>
                          Math.min(20, value + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* BUDGET */}
                <div className="form-group">
                  <label>
                    <Wallet size={17} />
                    Your total budget (LKR)
                  </label>

                  <input
                    type="number"
                    min="1000"
                    placeholder="50000"
                    value={budget}
                    onChange={(e) =>
                      setBudget(e.target.value)
                    }
                    required
                  />
                </div>

                {/* TRAVEL STYLE */}
                <div className="form-group">
                  <label>
                    <Sparkles size={17} />
                    Travel style
                  </label>

                  <div className="style-options">
                    {[
                      "Relaxing",
                      "Adventure",
                      "Luxury",
                      "Budget",
                    ].map((item) => (
                      <button
                        type="button"
                        key={item}
                        className={
                          style === item
                            ? "style-option active"
                            : "style-option"
                        }
                        onClick={() => setStyle(item)}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* INTERESTS */}
                <div className="form-group">
                  <label>
                    <Sparkles size={17} />
                    What do you love?
                  </label>

                  <div className="interest-options">
                    {interestsList.map((interest) => (
                      <button
                        type="button"
                        key={interest}
                        className={
                          interests.includes(interest)
                            ? "interest-option active"
                            : "interest-option"
                        }
                        onClick={() =>
                          toggleInterest(interest)
                        }
                      >
                        {interests.includes(interest) && (
                          <CheckCircle2 size={14} />
                        )}

                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                {/* ERROR */}
                {error && (
                  <div className="planner-error">
                    {error}
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="generate-trip-btn"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <RefreshCw
                        size={19}
                        className="spin"
                      />
                      Creating your adventure...
                    </>
                  ) : (
                    <>
                      <Sparkles size={19} />
                      Generate My Trip
                      <ArrowRight size={19} />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* RIGHT SIDEBAR */}
            <aside className="planner-sidebar">
              <div className="planner-sidebar-image">
                <div className="sidebar-image-overlay">
                  <span>YOUR NEXT ADVENTURE</span>

                  <h2>Explore more. Worry less.</h2>

                  <p>
                    Let AI help you discover amazing places
                    and experiences.
                  </p>
                </div>
              </div>

              <div className="planner-summary-card">
                <h3>Your trip summary</h3>

                <div className="summary-item">
                  <MapPin size={18} />
                  <div>
                    <span>Destination</span>
                    <strong>
                      {destination || "Not selected"}
                    </strong>
                  </div>
                </div>

                <div className="summary-item">
                  <CalendarDays size={18} />
                  <div>
                    <span>Duration</span>
                    <strong>
                      {days ? `${days} Days` : "Not selected"}
                    </strong>
                  </div>
                </div>

                <div className="summary-item">
                  <Users size={18} />
                  <div>
                    <span>Travellers</span>
                    <strong>{travellers} People</strong>
                  </div>
                </div>

                <div className="summary-item">
                  <Wallet size={18} />
                  <div>
                    <span>Budget</span>
                    <strong>
                      LKR {Number(budget || 0).toLocaleString()}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="planner-tip-card">
                <Lightbulb size={22} />

                <div>
                  <h4>Travel tip</h4>

                  <p>
                    Choose your interests carefully. Your AI
                    itinerary will be personalised around the
                    experiences you enjoy.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        )}

        {/* LOADING SCREEN */}
        {loading && (
          <div className="trip-loading">
            <div className="loading-animation">
              <Plane size={38} />
            </div>

            <h2>Creating your dream trip...</h2>

            <p>
              Our AI is preparing destinations, activities
              and travel ideas. Please wait a moment.
            </p>

            <div className="loading-progress">
              <span />
            </div>
          </div>
        )}

        {/* ITINERARY RESULT */}
        {itinerary && (
          <section className="itinerary-result">

            {/* RESULT HEADER */}
            <div className="result-header">
              <div>
                <span className="planner-badge">
                  <Sparkles size={15} />
                  YOUR PERSONAL AI ITINERARY
                </span>

                <h1>
                  Your adventure in{" "}
                  <span>{destination}</span>
                </h1>

                <p>
                  Your personalised travel plan is ready.
                  Get ready to explore!
                </p>
              </div>

              <button
                className="new-trip-btn"
                onClick={resetPlanner}
              >
                <RefreshCw size={17} />
                Create another trip
              </button>
            </div>

            {/* TRIP OVERVIEW */}
            <div className="result-overview">
              <div className="overview-item">
                <div className="overview-icon">
                  <MapPin />
                </div>

                <div>
                  <span>Destination</span>
                  <strong>{destination}</strong>
                </div>
              </div>

              <div className="overview-item">
                <div className="overview-icon">
                  <CalendarDays />
                </div>

                <div>
                  <span>Duration</span>
                  <strong>{days} Days</strong>
                </div>
              </div>

              <div className="overview-item">
                <div className="overview-icon">
                  <Users />
                </div>

                <div>
                  <span>Travellers</span>
                  <strong>{travellers} People</strong>
                </div>
              </div>

              <div className="overview-item">
                <div className="overview-icon">
                  <Wallet />
                </div>

                <div>
                  <span>Planned Budget</span>
                  <strong>
                    LKR {Number(budget).toLocaleString()}
                  </strong>
                </div>
              </div>
            </div>

            {/* WEATHER LEFT - MAP RIGHT */}
            <div className="travel-tools">

              {/* LEFT SIDE - WEATHER */}
              <div className="weather-side">
                <WeatherCard destination={destination} />
              </div>

              {/* RIGHT SIDE - GOOGLE MAPS */}
              <div className="map-route-section">
                <div>
                  <h3>Explore Your Route</h3>

                  <p>
                    View your journey from {startLocation} to{" "}
                    {destination}.
                  </p>
                </div>

                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="map-route-button"
                >
                  <MapPin size={16} />
                  View Google Maps
                </a>
              </div>
            </div>

            {/* ITINERARY HEADING */}
            <div className="itinerary-heading">
              <div>
                <span className="planner-step">
                  YOUR TRAVEL SCHEDULE
                </span>

                <h2>Explore your journey</h2>

                <p>
                  A day-by-day plan created around your
                  preferences.
                </p>
              </div>
            </div>

            {/* DAILY ITINERARY */}
            <div className="itinerary-days">
              {dayPlans.map((day, index) => (
                <article
                  className="itinerary-day-card"
                  key={index}
                >
                  <div className="day-number">
                    <span>DAY</span>
                    <strong>{index + 1}</strong>
                  </div>

                  <div className="day-content">
                    <h3>{day.title}</h3>

                    <div className="activity-grid">
                      {getActivitySections(day.content).map(
                        (activity) => (
                          <div
                            className={`activity-card ${activity.className}`}
                            key={activity.title}
                          >
                            <div className="activity-card-heading">
                              <div className="activity-card-icon">
                                {activity.icon}
                              </div>

                              <h4>{activity.title}</h4>
                            </div>

                            <div className="activity-card-content">
                              <ReactMarkdown>
                                {activity.content}
                              </ReactMarkdown>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    <div className="day-footer">
                      <span>
                        <Clock size={15} />
                        Daily travel plan
                      </span>

                      <span>
                        <CheckCircle2 size={15} />
                        AI generated
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* TRAVEL TIPS */}
            <div className="result-tips">
              <div className="tips-icon">
                <Lightbulb size={24} />
              </div>

              <div>
                <h3>Before you travel</h3>

                <p>
                  Review the suggested activities and estimated
                  costs. Confirm opening hours, transport
                  arrangements and prices with the relevant
                  providers before travelling.
                </p>
              </div>
            </div>

            {/* CREATE ANOTHER TRIP */}
            <button
              className="generate-trip-btn result-bottom-btn"
              onClick={resetPlanner}
            >
              <RefreshCw size={18} />
              Plan Another Adventure
            </button>
          </section>
        )}
      </div>
    </div>
  );
}