import React from "react";
import { statsStrip, testimonials } from "../mock";
import { Star, Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="pb-8">
      <div className="mx-5 mb-6 rounded-2xl bg-white ring-1 ring-neutral-200 shadow-sm py-4 px-2">
        <div className="grid grid-cols-4">
          {statsStrip.map((s, i) => (
            <div
              key={s.label}
              className={`text-center ${i > 0 ? "border-l border-neutral-200" : ""}`}
            >
              <div className="text-[18px] font-bold text-neutral-900">{s.value}</div>
              <div className="text-[11px] text-neutral-500 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5">
        <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight mb-3">
          Loved by our clients
        </h2>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar px-5 pb-1">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="min-w-[280px] max-w-[280px] rounded-2xl bg-white ring-1 ring-neutral-200 p-4 shadow-sm hover:shadow-md transition-all"
          >
            <Quote className="h-5 w-5 text-rose-300" />
            <p className="text-[13px] text-neutral-700 leading-relaxed mt-1.5 line-clamp-4">
              {t.text}
            </p>
            <div className="flex items-center gap-0.5 mt-2.5">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <div className="flex items-center gap-2.5 mt-3 pt-3 border-t border-neutral-100">
              <img src={t.avatar} alt={t.name} className="h-9 w-9 rounded-full object-cover ring-2 ring-white shadow" />
              <div>
                <div className="text-[13px] font-semibold text-neutral-900 leading-tight">
                  {t.name}
                </div>
                <div className="text-[11px] text-neutral-500">{t.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
