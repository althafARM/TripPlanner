import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./components/AdminProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import TripPlanner from "./pages/TripPlanner";
import MyTrips from "./pages/MyTrips";
import ChatAssistant from "./pages/ChatAssistant";
import MonitoringDashboard from "./components/MonitoringDashboard";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/explore" element={<Explore />} />

          <Route path="/planner" element={<TripPlanner />} />

          <Route path="/my-trips" element={<MyTrips />} />

          <Route path="/chat" element={<ChatAssistant />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* System Monitoring Dashboard */}
          <Route element={<AdminProtectedRoute />}>
            <Route path="/monitoring" element={<MonitoringDashboard />} />
          </Route>

          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}