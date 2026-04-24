import React, { useEffect, useState } from "react";
import { heroBanners } from "../mock";
import { ArrowRight } from "lucide-react";

export default function HeroBanner() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((p) => (p + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="px-5 pb-6">
      <div className="relative h-[190px] w-full overflow-hidden rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] ring-1 ring-black/5">
        {heroBanners.map((b, i) => (
          <div
            key={b.id}
            className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === active ? "opacity-100" : "opacity-0"}`}
          >
            <img
              src={b.image}
              alt={b.title}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="relative z-10 flex h-full flex-col justify-center px-6">
              <p className="text-white/90 text-[13px] font-medium tracking-wide uppercase">Feature</p>
              <h2 className="text-white text-[28px] font-bold leading-tight drop-shadow-sm">
                {b.title}
              </h2>
              <p className="text-rose-100 text-[20px] font-semibold leading-tight">
                {b.subtitle}
              </p>
              <button className="mt-3 inline-flex items-center gap-1.5 self-start rounded-full bg-white text-neutral-900 px-4 py-2 text-[13px] font-semibold shadow-md hover:shadow-lg hover:translate-y-[-1px] transition-all">
                {b.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
          {heroBanners.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-white" : "w-1.5 bg-white/60"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
