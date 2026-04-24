import React, { useEffect, useState } from "react";
import { MapPin, ChevronDown, Search, SlidersHorizontal } from "lucide-react";
import { locationData, heroBanners, searchPlaceholders } from "../mock";

export default function HeroHeader() {
  const [active, setActive] = useState(0);
  const [phIndex, setPhIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % heroBanners.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setPhIndex((p) => (p + 1) % searchPlaceholders.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full">
      {/* Full-bleed banner background */}
      <div className="relative h-[380px] w-full overflow-hidden">
        {heroBanners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-[900ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            {/* Subtle dark overlay to make top content readable */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/45" />
          </div>
        ))}

        {/* Foreground content */}
        <div className="relative z-10 flex h-full flex-col px-5 pt-5 pb-0">
          {/* Location row */}
          <button className="flex flex-col items-start text-left group self-start">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 shadow-md">
                <MapPin className="h-3 w-3 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[19px] font-bold text-white tracking-tight drop-shadow-sm">
                {locationData.country}
              </span>
              <ChevronDown className="h-4 w-4 text-white/90" />
            </div>
            <span className="ml-7 mt-0.5 text-[12px] text-white/80 font-medium">
              {locationData.city}
            </span>
          </button>

          {/* Search bar - floating on banner */}
          <div className="mt-4">
            <div className="flex items-center gap-2 rounded-2xl bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] ring-1 ring-black/5 px-4 py-3.5">
              <Search className="h-5 w-5 text-neutral-500 shrink-0" strokeWidth={2} />
              <div className="flex-1 relative overflow-hidden h-6">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder=""
                  className="absolute inset-0 w-full bg-transparent outline-none text-[15px] text-neutral-900 placeholder:text-neutral-400"
                />
                {!query && (
                  <div className="pointer-events-none absolute inset-0 flex items-center">
                    <span className="text-[15px] text-neutral-400">Search for&nbsp;</span>
                    <span
                      key={phIndex}
                      className="text-[15px] text-neutral-800 font-medium animate-[fadeUp_0.4s_ease]"
                    >
                      &lsquo;{searchPlaceholders[phIndex]}&rsquo;
                    </span>
                  </div>
                )}
              </div>
              <button className="h-8 w-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center justify-center">
                <SlidersHorizontal className="h-4 w-4 text-neutral-700" />
              </button>
            </div>
          </div>

          {/* Banner copy */}
          <div className="mt-auto pb-10 relative">
            {heroBanners.map((b, i) => (
              <div
                key={b.id}
                className={`${
                  i === active ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 absolute inset-x-5 bottom-10"
                } transition-all duration-500`}
              >
                {i === active && (
                  <>
                    <p className="text-white/85 text-[12px] font-medium tracking-[0.18em] uppercase">
                      Featured
                    </p>
                    <h2 className="text-white text-[30px] font-extrabold leading-[1.05] mt-1 drop-shadow-md">
                      {b.title}
                    </h2>
                    <p className="text-rose-200 text-[20px] font-semibold leading-tight mt-0.5">
                      {b.subtitle}
                    </p>
                    <button className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-white text-neutral-900 px-4 py-2 text-[13px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                      {b.cta}
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
            {heroBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === active ? "w-6 bg-white" : "w-1.5 bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Seamless transition - curved white into content */}
      <div className="relative -mt-6 h-6 bg-white rounded-t-[28px] shadow-[0_-10px_30px_rgba(0,0,0,0.08)]" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
