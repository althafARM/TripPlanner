import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Compass, Menu, X } from "lucide-react";

const links = [
  { to: "/", label: "Home" },
  { to: "/explore", label: "Explore" },
  { to: "/planner", label: "AI Planner" },
  { to: "/my-trips", label: "My Trips" },
  { to: "/chat", label: "AI Assistant" },
  { to: "/monitoring", label: "Monitoring" }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="nav-inner container">

        <Link to="/" className="brand" onClick={() => setOpen(false)}>
          <span className="brand-icon">
            <Compass size={22} />
          </span>
          <span>TripPlanner <b>AI</b></span>
        </Link>

        <button
          className="mobile-menu"
          aria-label="Toggle navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <nav className={open ? "nav-links open" : "nav-links"}>

          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/planner"
            className="nav-cta"
            onClick={() => setOpen(false)}
          >
            Plan a trip <span>↗</span>
          </Link>

        </nav>
      </div>
    </header>
  );
}