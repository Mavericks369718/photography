import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Phone, ChevronRight, Heart, MapPin, Bell, ShieldCheck, HelpCircle, Settings, LogOut, Sparkles } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function Profile() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("cm_name") || "Guest");
    setPhone(localStorage.getItem("cm_phone") || "");
  }, []);

  const logout = () => {
    localStorage.removeItem("cm_phone");
    localStorage.removeItem("cm_name");
    localStorage.removeItem("cm_selected");
    localStorage.removeItem("cm_booking");
    localStorage.removeItem("cm_last_booking");
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-24">
        <div className="relative h-[34vh] min-h-[260px] w-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=1400&q=85" alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.04]"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/80"/>

          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button onClick={() => navigate("/")} data-testid="profile-back-btn" className="h-10 w-10 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
              <Sparkles className="h-3 w-3"/> Member
            </span>
          </div>

          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-9">
            <span className="inline-block text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">CorporateMoments</span>
            <h1 className="mt-2 text-white text-[34px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" style={{fontWeight:800}}>
              Hi, <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">{name}.</span>
            </h1>
            <p className="mt-2 text-white/80 text-[13px] inline-flex items-center gap-1.5"><Phone className="h-3.5 w-3.5"/>+91 {phone || "—"}</p>
          </div>
        </div>

        <div className="relative -mt-6 flex-1 bg-white rounded-t-[28px] px-5 pt-6 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          {/* Quick links */}
          <div className="grid grid-cols-3 gap-2.5">
            <Quick icon={<Heart className="h-4 w-4 text-rose-700"/>}   label="Favorites" />
            <Quick icon={<MapPin className="h-4 w-4 text-rose-700"/>}  label="Addresses" />
            <Quick icon={<Bell className="h-4 w-4 text-rose-700"/>}    label="Alerts"    />
          </div>

          {/* Account */}
          <div className="mt-6">
            <p className="text-[10.5px] uppercase tracking-[0.22em] font-bold text-neutral-500 mb-2">Account</p>
            <div className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 divide-y divide-rose-100 overflow-hidden">
              <Row icon={<ShieldCheck className="h-4 w-4 text-rose-700"/>}  label="Privacy & security" />
              <Row icon={<Settings className="h-4 w-4 text-rose-700"/>}     label="Preferences" />
              <Row icon={<HelpCircle className="h-4 w-4 text-rose-700"/>}   label="Help & support" />
            </div>
          </div>

          <button
            data-testid="logout-btn"
            onClick={logout}
            className="mt-6 w-full rounded-2xl ring-1 ring-rose-200 bg-white text-rose-700 py-3 text-[13.5px] font-bold inline-flex items-center justify-center gap-2 hover:bg-rose-50"
          >
            <LogOut className="h-4 w-4"/> Sign out
          </button>

          <p className="mt-6 text-center text-[11px] text-neutral-400">CorporateMoments · v1.0 · Crafted in India</p>
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

function Quick({ icon, label }) {
  return (
    <button className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-3 flex flex-col items-start gap-2 hover:ring-rose-200 transition">
      <span className="h-9 w-9 rounded-xl bg-white ring-1 ring-rose-100 flex items-center justify-center">{icon}</span>
      <span className="text-[12.5px] font-bold text-neutral-900">{label}</span>
    </button>
  );
}

function Row({ icon, label }) {
  return (
    <button className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-white/60">
      <span className="h-8 w-8 rounded-lg bg-white ring-1 ring-rose-100 flex items-center justify-center">{icon}</span>
      <span className="flex-1 text-left text-[13.5px] font-bold text-neutral-900">{label}</span>
      <ChevronRight className="h-4 w-4 text-neutral-400"/>
    </button>
  );
}
