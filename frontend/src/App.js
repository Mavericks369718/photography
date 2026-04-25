import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Confirmation from "./pages/Confirmation";
import CategoryPhotographers from "./pages/CategoryPhotographers";
import PhotographerProfile from "./pages/PhotographerProfile";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import { Toaster } from "sonner";

function RequireAuth({ children }) {
  const phone = typeof window !== "undefined" ? localStorage.getItem("cm_phone") : null;
  const name = typeof window !== "undefined" ? localStorage.getItem("cm_name") : null;
  if (!phone) return <Navigate to="/login" replace />;
  if (!name) return <Navigate to="/onboarding" replace />;
  return children;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/category/:categoryId" element={<RequireAuth><CategoryPhotographers /></RequireAuth>} />
          <Route path="/photographer/:photographerId" element={<RequireAuth><PhotographerProfile /></RequireAuth>} />
          <Route path="/search" element={<RequireAuth><Search /></RequireAuth>} />
          <Route path="/bookings" element={<RequireAuth><MyBookings /></RequireAuth>} />
          <Route path="/account" element={<RequireAuth><Profile /></RequireAuth>} />
          <Route path="/booking" element={<RequireAuth><Booking /></RequireAuth>} />
          <Route path="/payment" element={<RequireAuth><Payment /></RequireAuth>} />
          <Route path="/confirmation" element={<RequireAuth><Confirmation /></RequireAuth>} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors offset={16} />
    </div>
  );
}

export default App;
