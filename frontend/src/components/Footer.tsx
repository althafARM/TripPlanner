import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div><Link to="/" className="brand footer-brand"><span className="brand-icon"><Compass size={20} /></span><span>TripPlanner <b>AI</b></span></Link><p>Thoughtful journeys, made simple.</p></div>
        <div className="footer-links"><Link to="/explore">Explore</Link><Link to="/planner">AI Planner</Link><Link to="/chat">AI Assistant</Link></div>
        <small>© {new Date().getFullYear()} TripPlanner AI. Travel smarter.</small>
      </div>
    </footer>
  );
}