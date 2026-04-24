import React, { useEffect, useState } from "react";
import { MapPin, ChevronDown, Search } from "lucide-react";
import { locationData, heroBanners, searchPlaceholders } from "../mock";

export default function HeroHeader() {
  const [active, setActive] = useState(0);
  const [phIndex, setPhIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % heroBanners.length);
    }, 5500);
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
      <div className="relative h-[420px] w-full overflow-hidden">
        {/* Banner image layers */}
        {heroBanners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-[1000ms] ease-out ${
              i === active ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}

        {/* Very subtle top gradient ONLY for location text readability */}
        <div className="pointer-events-none absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-black/40 via-black/10 to-transparent" />

        {/* Soft bottom fade into content */}
        <div className="pointer-events-none absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/25 to-transparent" />

        {/* Foreground content */}
        <div className="relative z-10 flex h-full flex-col px-5 pt-5">
          {/* Location */}
          <button className="flex flex-col items-start text-left self-start">
            <div className="flex items-center gap-1.5">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-rose-500 to-pink-500 shadow-md">
                <MapPin className="h-3 w-3 text-white" strokeWidth={2.5} />
              </span>
              <span className="text-[19px] font-bold text-white tracking-tight drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
                {locationData.country}
              </span>
              <ChevronDown className="h-4 w-4 text-white/95" />
            </div>
            <span className="ml-7 mt-0.5 text-[12px] text-white/90 font-medium drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
              {locationData.city}
            </span>
          </button>

          {/* Pill-shaped search bar - clean & floating */}
          <div className="mt-5">
            <div className="flex items-center gap-2.5 rounded-full bg-white shadow-[0_6px_18px_rgba(0,0,0,0.18)] ring-1 ring-black/5 pl-2 pr-5 py-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full ring-1 ring-neutral-200 bg-white">
                <Search className="h-4 w-4 text-neutral-500" strokeWidth={2.2} />
              </span>
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
                      className="text-[15px] text-neutral-500 animate-[fadeUp_0.4s_ease]"
                    >
                      &lsquo;{searchPlaceholders[phIndex]}&rsquo;
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Banner text + CTA anchored at bottom (subtle, doesn't cover image) */}
          <div className="mt-auto pb-10">
            {heroBanners.map((b, i) =>
              i === active ? (
                <div key={b.id} className="animate-[fadeUp_0.5s_ease]">
                  <p className="text-white/90 text-[11px] font-semibold tracking-[0.2em] uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                    Featured
                  </p>
                  <h2 className="text-white text-[26px] font-extrabold leading-[1.05] mt-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]">
                    {b.title}
                  </h2>
                  <p className="text-rose-200 text-[17px] font-semibold leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
                    {b.subtitle}
                  </p>
                  <button className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-white text-neutral-900 px-4 py-1.5 text-[12.5px] font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                    {b.cta}
                  </button>
                </div>
              ) : null
            )}
          </div>

          {/* Carousel dots */}
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

      {/* Seamless curved transition into white content */}
      <div className="relative -mt-5 h-5 bg-white rounded-t-[28px]" />

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
