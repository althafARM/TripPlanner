import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import TripPlanner from "./pages/TripPlanner";
import MyTrips from "./pages/MyTrips";
import ChatAssistant from "./pages/ChatAssistant";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/planner" element={<TripPlanner />} />
        <Route path="/my-trips" element={<MyTrips />} />
        <Route path="/chat" element={<ChatAssistant />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;