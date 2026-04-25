import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search as SearchIcon, Star, MapPin, Sparkles } from "lucide-react";
import { photographers, categories } from "../mock";
import BottomNav from "../components/BottomNav";

const SUGGESTIONS = ["Wedding", "Pre-Wedding", "Maternity", "Headshots", "Cinematic", "Product"];

export default function Search() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return [];
    return photographers.filter((p) => {
      return (
        p.name.toLowerCase().includes(needle) ||
        p.tagline.toLowerCase().includes(needle) ||
        p.city.toLowerCase().includes(needle) ||
        p.specialties.some((s) => s.toLowerCase().includes(needle)) ||
        p.categories.some((c) => c.toLowerCase().includes(needle))
      );
    });
  }, [q]);

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-24">
        {/* Slim hero */}
        <div className="relative h-[24vh] min-h-[200px] w-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=1400&q=85" alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.04]"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75"/>
          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button onClick={() => navigate("/")} data-testid="search-back-btn" className="h-10 w-10 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
              <Sparkles className="h-3 w-3"/> Discover
            </span>
          </div>
          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-7">
            <span className="inline-block text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">Find your</span>
            <h1 className="mt-1.5 text-white text-[32px] leading-[1.02] tracking-[-0.025em] drop-shadow" style={{fontWeight:800}}>
              perfect <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">photographer.</span>
            </h1>
          </div>
        </div>

        <div className="relative -mt-6 flex-1 bg-white rounded-t-[28px] px-5 pt-5 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          <div className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 px-4 py-3 flex items-center gap-3">
            <SearchIcon className="h-4 w-4 text-rose-700"/>
            <input
              autoFocus
              data-testid="search-input"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search wedding, maternity, Mumbai…"
              className="flex-1 bg-transparent outline-none text-[14.5px] font-semibold text-neutral-900 placeholder:text-neutral-400 placeholder:font-medium"
            />
          </div>

          {!q && (
            <>
              <div className="mt-5">
                <p className="text-[10.5px] uppercase tracking-[0.22em] font-bold text-neutral-500 mb-2.5">Popular</p>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      data-testid={`suggestion-${s.toLowerCase()}-btn`}
                      onClick={() => setQ(s)}
                      className="rounded-full bg-white ring-1 ring-neutral-200 px-3.5 py-1.5 text-[12.5px] font-semibold text-neutral-700 hover:ring-rose-300 hover:text-rose-700 transition"
                    >{s}</button>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[10.5px] uppercase tracking-[0.22em] font-bold text-neutral-500 mb-2.5">Browse by category</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {categories.slice(0,6).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigate(`/category/${c.id}`)}
                      className="relative aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-black/5 group"
                    >
                      <img src={c.image} alt={c.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.06]"/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent"/>
                      <span className="absolute bottom-2.5 left-3 right-3 text-white text-[12.5px] font-bold leading-tight whitespace-pre-line tracking-tight">{c.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}

          {q && (
            <div className="mt-4">
              <p className="text-[12px] text-neutral-500 mb-3">{results.length} match{results.length === 1 ? "" : "es"} for "{q}"</p>
              <div className="space-y-3" data-testid="search-results">
                {results.map((p) => (
                  <button
                    key={p.id}
                    data-testid={`search-result-${p.id}`}
                    onClick={() => navigate(`/photographer/${p.id}`)}
                    className="w-full text-left rounded-2xl bg-white ring-1 ring-neutral-200 p-3 flex gap-3 items-center hover:ring-rose-200 hover:shadow-sm transition"
                  >
                    <div className="h-14 w-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
                      <img src={p.cover} alt={p.name} className="h-full w-full object-cover"/>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13.5px] font-bold text-neutral-900 truncate">{p.name}</p>
                      <p className="text-[11.5px] text-neutral-500 truncate">{p.tagline}</p>
                      <div className="mt-1 flex items-center gap-2 text-[11px] text-neutral-500">
                        <span className="inline-flex items-center gap-0.5"><Star className="h-3 w-3 fill-amber-500 text-amber-500"/>{p.rating}</span>
                        <span>·</span>
                        <span className="inline-flex items-center gap-0.5"><MapPin className="h-3 w-3"/>{p.city}</span>
                      </div>
                    </div>
                    <span className="text-[12px] font-bold text-rose-700">View →</span>
                  </button>
                ))}
                {results.length === 0 && (
                  <p className="py-12 text-center text-neutral-500 text-[13px]">No matches. Try a different keyword.</p>
                )}
              </div>
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}
