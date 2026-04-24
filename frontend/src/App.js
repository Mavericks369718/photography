import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
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
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors offset={16} />
    </div>
  );
}

export default App;
