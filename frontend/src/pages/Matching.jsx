import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Star, BadgeCheck } from "lucide-react";
import { photographers } from "../mock";

export default function Matching() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState("scanning"); // scanning · found
  const [pro, setPro] = useState(null);

  useEffect(() => {
    const last = JSON.parse(localStorage.getItem("cm_last_booking") || "null");
    if (!last) { navigate("/"); return; }

    // Pick a photographer matching category (fallback: any verified)
    const catId = last.categoryId;
    const pool = photographers.filter((p) => p.verified && (!catId || p.categories.includes(catId)));
    const picked = pool.length ? pool[Math.floor(Math.random() * pool.length)] : photographers[0];

    const t1 = setTimeout(() => {
      setPro(picked);
      setPhase("found");
      // persist assignment
      const updated = { ...last, assignedPhotographer: { id: picked.id, name: picked.name, avatar: picked.avatar, city: picked.city, rating: picked.rating, reviews: picked.reviews } };
      localStorage.setItem("cm_last_booking", JSON.stringify(updated));
      try {
        const hist = JSON.parse(localStorage.getItem("cm_bookings_history") || "[]");
        if (hist.length) { hist[hist.length-1] = updated; localStorage.setItem("cm_bookings_history", JSON.stringify(hist)); }
      } catch { /* ignore */ }
    }, 2800);

    const t2 = setTimeout(() => {
      localStorage.removeItem("cm_instant_flow");
      navigate("/confirmation");
    }, 4800);

    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#0F0A0E] flex flex-col items-center justify-center px-6 overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute -top-32 -left-32 h-[420px] w-[420px] rounded-full bg-rose-700/30 blur-3xl"/>
        <div className="absolute -bottom-32 -right-32 h-[420px] w-[420px] rounded-full bg-amber-500/20 blur-3xl"/>

        {phase === "scanning" && (
          <div className="relative z-10 flex flex-col items-center text-center" data-testid="matching-scanning">
            <div className="relative h-44 w-44">
              <span className="absolute inset-0 rounded-full bg-rose-500/20 animate-ping"/>
              <span className="absolute inset-4 rounded-full bg-rose-500/15 animate-ping" style={{animationDelay:"0.4s"}}/>
              <span className="absolute inset-8 rounded-full bg-rose-500/10 animate-ping" style={{animationDelay:"0.8s"}}/>
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="h-20 w-20 rounded-full bg-white shadow-[0_12px_30px_rgba(255,255,255,0.25)] flex items-center justify-center">
                  <MapPin className="h-10 w-10 text-rose-700" strokeWidth={2.4}/>
                </span>
              </span>
            </div>
            <span className="mt-10 text-white/70 text-[11px] font-semibold tracking-[0.32em] uppercase">Auto-matching</span>
            <h1 className="mt-3 text-white text-[34px] leading-[1.05] tracking-[-0.025em] text-center" style={{fontWeight:800}}>
              Finding the<br/>
              <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-300">perfect pro</span> near you.
            </h1>
            <p className="mt-4 text-white/60 text-[13px] max-w-[260px]">Scanning verified photographers in your area…</p>
          </div>
        )}

        {phase === "found" && pro && (
          <div className="relative z-10 flex flex-col items-center text-center" data-testid="matching-found">
            <div className="relative">
              <img src={pro.avatar} alt={pro.name} className="h-28 w-28 rounded-full object-cover ring-4 ring-white shadow-[0_12px_30px_rgba(0,0,0,0.4)]"/>
              <span className="absolute -bottom-1 -right-1 h-9 w-9 rounded-full bg-emerald-500 ring-4 ring-[#0F0A0E] flex items-center justify-center">
                <BadgeCheck className="h-5 w-5 text-white" strokeWidth={2.4}/>
              </span>
            </div>
            <span className="mt-7 text-emerald-300 text-[11px] font-bold tracking-[0.32em] uppercase">Matched</span>
            <h1 className="mt-2 text-white text-[28px] leading-[1.05] tracking-[-0.02em] text-center max-w-[300px]" style={{fontWeight:800}}>
              <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">{pro.name}</span>
            </h1>
            <p className="mt-2 text-white/70 text-[13px] inline-flex items-center gap-2">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400"/> {pro.rating} · {pro.reviews.toLocaleString()} reviews
            </p>
            <p className="mt-1 text-white/50 text-[12px] inline-flex items-center gap-1.5"><MapPin className="h-3 w-3"/>{pro.city}</p>
          </div>
        )}
      </div>
    </div>
  );
}
