import { ArrowRight, Map, Sparkles, ShieldCheck, Mountain, Waves, Landmark } from "lucide-react";
import { Link } from "react-router-dom";
import DestinationCard from "../components/DestinationCard";
import { sampleDestinations } from "../data/destinations";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-bg" />
        <div className="container hero-content">
          <span className="eyebrow light"><Sparkles size={15} /> YOUR PERSONAL AI TRAVEL COMPANION</span>
          <h1>Discover the world.<br /><em>We’ll plan the journey.</em></h1>
          <p>Tell us what you love. TripPlanner AI helps turn your travel ideas into a thoughtful, personalised itinerary.</p>
          <div className="hero-actions"><Link className="button button-primary" to="/planner">Plan my trip <ArrowRight size={18} /></Link><Link className="button button-glass" to="/explore">Explore destinations</Link></div>
          <div className="hero-note"><span className="note-dot" /> Start with beautiful places across Sri Lanka</div>
        </div>
        <div className="hero-stats container"><div><b>01</b><span>Share your travel style</span></div><div><b>02</b><span>Get a smart itinerary</span></div><div><b>03</b><span>Make the journey yours</span></div></div>
      </section>

      <section className="section container">
        <div className="section-heading"><div><span className="eyebrow">FIND YOUR NEXT ESCAPE</span><h2>Places worth <em>discovering.</em></h2><p>From misty hills to sunny coastlines, find a place that feels right.</p></div><Link className="text-link" to="/explore">Explore all places <ArrowRight size={17} /></Link></div>
        <div className="destination-grid">{sampleDestinations.slice(0, 3).map(d => <DestinationCard key={d.id} destination={d} />)}</div>
      </section>

      <section className="feature-section"><div className="container feature-layout"><div><span className="eyebrow">A BETTER WAY TO TRAVEL</span><h2>Your trip, shaped around <em>you.</em></h2><p className="feature-intro">No more jumping between dozens of tabs. Start with your interests, dates and budget. Build a journey that matches your pace.</p><Link to="/planner" className="button button-dark">Try the AI planner <ArrowRight size={17} /></Link></div><div className="feature-list"><div><span className="feature-icon"><Sparkles /></span><div><h3>Personalised planning</h3><p>Plan around your interests, travel dates and budget.</p></div></div><div><span className="feature-icon"><Map /></span><div><h3>Destination discovery</h3><p>Explore nature, culture, beaches and adventure.</p></div></div><div><span className="feature-icon"><ShieldCheck /></span><div><h3>Helpful travel assistant</h3><p>Ask questions and organise your travel ideas in one place.</p></div></div></div></div></section>

      <section className="section container"><div className="section-heading"><div><span className="eyebrow">CHOOSE YOUR EXPERIENCE</span><h2>Travel in your <em>own way.</em></h2></div></div><div className="experience-grid"><div><Mountain /><h3>Nature escapes</h3><p>Find calm in green hills and scenic trails.</p></div><div><Waves /><h3>Beach days</h3><p>Slow down beside the ocean and sunshine.</p></div><div><Landmark /><h3>Culture & heritage</h3><p>Discover local stories, food and history.</p></div></div></section>
    </>
  );
}