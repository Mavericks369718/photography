import React, { useEffect, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { searchPlaceholders } from "../mock";

export default function SearchBar() {
  const [index, setIndex] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((p) => (p + 1) % searchPlaceholders.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full bg-[#FFF1EC] px-5 pb-5">
      <div className="flex items-center gap-2 rounded-2xl bg-white shadow-[0_6px_20px_rgba(0,0,0,0.05)] ring-1 ring-black/5 px-4 py-3.5">
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
                key={index}
                className="text-[15px] text-neutral-700 font-medium animate-[fadeUp_0.4s_ease]"
              >
                &lsquo;{searchPlaceholders[index]}&rsquo;
              </span>
            </div>
          )}
        </div>
        <button className="h-8 w-8 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors flex items-center justify-center">
          <SlidersHorizontal className="h-4 w-4 text-neutral-700" />
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
