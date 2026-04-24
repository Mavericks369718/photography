import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mostBookedTabs, mostBookedServices } from "../mock";
import { Star, Clock, MapPin } from "lucide-react";

function ServiceCard({ s }) {
  const navigate = useNavigate();
  const discount = Math.round(((s.originalPrice - s.price) / s.originalPrice) * 100);
  return (
    <div className="min-w-[260px] max-w-[260px] snap-start rounded-2xl bg-white ring-1 ring-neutral-200 shadow-[0_4px_16px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all">
      <div className="relative h-36 w-full overflow-hidden bg-neutral-100">
        <img src={s.image} alt={s.title} className="h-full w-full object-cover" />
        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded-full text-[11px] font-semibold text-rose-700 ring-1 ring-rose-100">
          {discount}% OFF
        </span>
        <span className="absolute bottom-2 left-2 inline-flex items-center gap-1 bg-black/60 text-white px-2 py-0.5 rounded-full text-[11px] font-medium">
          <Clock className="h-3 w-3" /> {s.duration}
        </span>
      </div>
      <div className="p-3">
        <h3 className="text-[14px] font-semibold text-neutral-900 leading-tight line-clamp-1">
          {s.title}
        </h3>
        <p className="text-[12px] text-neutral-500 mt-0.5 line-clamp-1">{s.subtitle}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <span className="inline-flex items-center gap-0.5 bg-emerald-50 text-emerald-700 text-[11px] font-semibold px-1.5 py-0.5 rounded-md">
            <Star className="h-3 w-3 fill-emerald-600 text-emerald-600" /> {s.rating}
          </span>
          <span className="text-[11px] text-neutral-500">({s.reviews.toLocaleString()})</span>
        </div>
        <div className="flex items-end justify-between mt-2.5">
          <div>
            <span className="text-[15px] font-bold text-neutral-900">
              ₹{s.price.toLocaleString()}
            </span>
            <span className="ml-1.5 text-[12px] text-neutral-400 line-through">
              ₹{s.originalPrice.toLocaleString()}
            </span>
          </div>
          <button onClick={() => navigate("/booking")} className="text-[12px] font-semibold text-rose-700 hover:text-rose-800">
            Book →
          </button>
        </div>
      </div>
    </div>
  );
}

export default function MostBooked() {
  const navigate = useNavigate();
  const [tab, setTab] = useState(mostBookedTabs[0]);
  const list = mostBookedServices[tab] || [];

  return (
    <section className="mb-8">
      <div className="mx-5 rounded-3xl bg-[#FFF7EC] ring-1 ring-amber-100/70 p-5 pb-6 shadow-[0_6px_20px_rgba(250,190,140,0.15)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-[20px] font-bold text-neutral-900 leading-tight">
              Most Booked
            </h2>
            <div className="flex items-center gap-1 text-[12px] text-neutral-500 mt-0.5">
              <MapPin className="h-3 w-3" /> in your area
            </div>
          </div>
          <span className="h-10 w-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center shadow-md ring-2 ring-white">
            <MapPin className="h-4 w-4 text-white" />
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 -mx-1 px-1">
          {mostBookedTabs.map((t) => {
            const selected = t === tab;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-[13px] font-semibold transition-all ring-1 ${
                  selected
                    ? "bg-rose-800 text-white ring-rose-800 shadow-sm"
                    : "bg-white text-neutral-700 ring-neutral-200 hover:ring-neutral-300"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>

        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory no-scrollbar -mx-1 px-1">
          {list.map((s) => (
            <ServiceCard key={s.id} s={s} />
          ))}
        </div>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { scrollbar-width: none; }
      `}</style>
    </section>
  );
}
