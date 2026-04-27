import React, { useEffect } from "react";
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
import InstantBook from "./pages/InstantBook";
import Matching from "./pages/Matching";
import { photographers } from "./mock";
import { Toaster } from "sonner";

function RequireAuth({ children }) {
  const phone = typeof window !== "undefined" ? localStorage.getItem("cm_phone") : null;
  const name = typeof window !== "undefined" ? localStorage.getItem("cm_name") : null;
  if (!phone) return <Navigate to="/login" replace />;
  if (!name) return <Navigate to="/onboarding" replace />;
  return children;
}

// Global background worker: scans cm_bookings_history every 2s and assigns
// a photographer to any pending booking whose payment is older than ~8s.
// This survives navigation between pages.
function AssignmentWorker() {
  useEffect(() => {
    const tick = () => {
      try {
        const hist = JSON.parse(localStorage.getItem("cm_bookings_history") || "[]");
        let changed = false;
        const updated = hist.map((b) => {
          if (!b.assignmentPending || b.assignedPhotographer) return b;
          const paidAt = b.paidAt ? new Date(b.paidAt).getTime() : 0;
          if (Date.now() - paidAt < 8000) return b; // wait at least 8s after payment
          const pool = photographers.filter((p) => p.verified && (!b.categoryId || p.categories.includes(b.categoryId)));
          const picked = pool.length ? pool[Math.floor(Math.random() * pool.length)] : photographers[0];
          changed = true;
          return {
            ...b,
            package: { ...b.package, photographer: picked.name },
            assignmentPending: false,
            assignedPhotographer: { id: picked.id, name: picked.name, avatar: picked.avatar, city: picked.city, rating: picked.rating, reviews: picked.reviews }
          };
        });
        if (changed) {
          localStorage.setItem("cm_bookings_history", JSON.stringify(updated));
          // also keep the most recent cm_last_booking in sync if it matches
          const last = JSON.parse(localStorage.getItem("cm_last_booking") || "null");
          if (last) {
            const match = updated.find((b) => b.ref === last.ref);
            if (match) localStorage.setItem("cm_last_booking", JSON.stringify(match));
          }
          // notify listeners (Confirmation, MyBookings re-read on event)
          window.dispatchEvent(new Event("cm-bookings-updated"));
        }
      } catch { /* ignore */ }
    };
    const id = setInterval(tick, 2000);
    tick();
    return () => clearInterval(id);
  }, []);
  return null;
}

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AssignmentWorker />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/" element={<RequireAuth><Home /></RequireAuth>} />
          <Route path="/book/:categoryId" element={<RequireAuth><InstantBook /></RequireAuth>} />
          <Route path="/matching" element={<RequireAuth><Matching /></RequireAuth>} />
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
