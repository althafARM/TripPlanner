import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import DestinationCard from "../components/DestinationCard";
import { getDestinations } from "../services/api";
import { sampleDestinations } from "../data/destinations";
import type { Destination } from "../types";

const categories = ["All", "Nature", "Beach", "Adventure", "Culture"];

export default function Explore() {
  const [items, setItems] = useState<Destination[]>(sampleDestinations);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    getDestinations().then(data => { if (data.length) setItems(data); }).catch(() => setNotice("Showing sample destinations. Connect the backend to load its destination list."));
  }, []);

  const filtered = useMemo(() => items.filter(d =>
    (category === "All" || d.category.toLowerCase() === category.toLowerCase()) &&
    `${d.name} ${d.location} ${d.description}`.toLowerCase().includes(query.toLowerCase())
  ), [items, query, category]);

  return <div className="page-shell">
    <section className="page-hero explore-page-hero"><div className="container"><span className="eyebrow light">THE WORLD IS WAITING</span><h1>Find a place to <em>fall in love with.</em></h1><p>Explore hand-picked destinations and find the right setting for your next story.</p></div></section>
    <section className="container explore-content">
      <div className="explore-toolbar"><label className="search-box"><Search size={19} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search destinations..." /></label><div className="filter-label"><SlidersHorizontal size={17} /> Filter by</div><div className="category-filters">{categories.map(c => <button key={c} className={category === c ? "filter-chip active" : "filter-chip"} onClick={() => setCategory(c)}>{c}</button>)}</div></div>
      {notice && <p className="notice">{notice}</p>}
      <div className="results-line"><b>{filtered.length} destinations</b><span>Explore at your own pace</span></div>
      {filtered.length ? <div className="destination-grid">{filtered.map(d => <DestinationCard key={d.id} destination={d} />)}</div> : <div className="empty-state"><h3>No destinations found</h3><p>Try another search or choose a different category.</p><button className="button button-dark" onClick={() => { setQuery(""); setCategory("All"); }}>Clear filters</button></div>}
    </section>
  </div>;
}