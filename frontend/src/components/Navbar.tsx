import { Link, NavLink } from "react-router-dom";
import { Compass, Menu, UserRound } from "lucide-react";

export default function Navbar() {
return ( <nav className="navbar"> <Link to="/" className="brand"> <div className="brand-icon"> <Compass size={25} /> </div> <span>TripPlanner<span className="brand-highlight"> AI</span></span> </Link>

  <div className="nav-links">
    <NavLink to="/" end>Home</NavLink>
    <NavLink to="/explore">Explore</NavLink>
    <NavLink to="/planner">AI Planner</NavLink>
    <NavLink to="/my-trips">My Trips</NavLink>
  </div>

  <div className="nav-actions">
    <Link to="/chat" className="chat-link">AI Assistant</Link>
    <button className="profile-button">
      <UserRound size={19} />
      Sign In
    </button>
  </div>

  <button className="mobile-menu" aria-label="Open menu">
    <Menu size={25} />
  </button>
</nav>

);
}
