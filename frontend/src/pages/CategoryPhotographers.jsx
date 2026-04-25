import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, ShieldCheck, BadgeCheck, Award, ChevronRight, SlidersHorizontal } from "lucide-react";
import { categories, getPhotographersByCategory, categoryTitle } from "../mock";
import BottomNav from "../components/BottomNav";

const SORTS = [
  { id: "popular", label: "Most popular" },
  { id: "rating",  label: "Top rated"    },
  { id: "low",     label: "Price: low → high" },
  { id: "high",    label: "Price: high → low" }
];

export default function CategoryPhotographers() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const [sort, setSort] = useState("popular");
  const cat = categories.find((c) => c.id === categoryId);
  const heroImg = cat?.image?.replace("w=400", "w=1400").replace("w=800", "w=1400") || "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=1400&q=85";
  const title = categoryTitle(categoryId);

  const list = useMemo(() => {
    const arr = getPhotographersByCategory(categoryId);
    const sorted = [...arr];
    if (sort === "rating") sorted.sort((a,b) => b.rating - a.rating);
    if (sort === "low")    sorted.sort((a,b) => a.startingPrice - b.startingPrice);
    if (sort === "high")   sorted.sort((a,b) => b.startingPrice - a.startingPrice);
    return sorted;
  }, [categoryId, sort]);

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col">
        {/* Cinematic hero */}
        <div className="relative h-[44vh] min-h-[340px] w-full overflow-hidden">
          <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.03]" data-testid="category-hero-image"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75" />

          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              data-testid="category-back-btn"
              className="h-10 w-10 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
              <ShieldCheck className="h-3 w-3"/> Verified pros
            </span>
          </div>

          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-9">
            <span className="inline-block text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">Category</span>
            <h1 className="mt-2.5 text-white text-[36px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" style={{fontWeight:800}}>
              {title.split(" ").slice(0,-1).join(" ")}{" "}
              <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">
                {title.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="mt-2 text-white/80 text-[12.5px] tracking-wide">
              {list.length} curated photographer{list.length === 1 ? "" : "s"} · starting ₹{Math.min(...list.map((p) => p.startingPrice)).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Curved white sheet */}
        <div className="relative -mt-6 flex-1 bg-white rounded-t-[28px] px-5 pt-5 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]" data-testid="category-list-sheet">
          {/* Sort row */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar -mx-1 px-1 pb-3">
            <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-neutral-50 ring-1 ring-neutral-200 px-3 py-1.5 text-[12px] font-semibold text-neutral-700">
              <SlidersHorizontal className="h-3.5 w-3.5"/> Sort
            </span>
            {SORTS.map((s) => {
              const sel = s.id === sort;
              return (
                <button
                  key={s.id}
                  data-testid={`sort-${s.id}-btn`}
                  onClick={() => setSort(s.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12.5px] font-semibold transition-all ring-1 ${
                    sel ? "bg-rose-800 text-white ring-rose-800" : "bg-white text-neutral-700 ring-neutral-200 hover:ring-neutral-300"
                  }`}
                >
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* List */}
          <div className="space-y-3.5 mt-1">
            {list.length === 0 ? (
              <div className="py-16 text-center">
                <p className="text-neutral-500 text-[13px]">No photographers yet for this category.</p>
                <button onClick={() => navigate("/")} className="mt-4 rounded-full bg-rose-800 text-white px-5 py-2 text-[13px] font-bold">Explore others</button>
              </div>
            ) : (
              list.map((p) => <PhotographerCard key={p.id} p={p} onOpen={() => navigate(`/photographer/${p.id}`)} />)
            )}
          </div>
        </div>

        <BottomNav />
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
      </div>
    </div>
  );
}

function PhotographerCard({ p, onOpen }) {
  return (
    <button
      data-testid={`photographer-card-${p.id}`}
      onClick={onOpen}
      className="group w-full text-left rounded-3xl bg-white ring-1 ring-neutral-200 overflow-hidden hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
    >
      <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
        <img src={p.cover} alt={p.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"/>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent"/>

        {p.award && (
          <span className="absolute top-3 left-3 inline-flex items-center gap-1 bg-amber-50/95 backdrop-blur text-amber-800 text-[10.5px] font-bold tracking-wide px-2 py-0.5 rounded-full ring-1 ring-amber-200">
            <Award className="h-3 w-3"/> {p.award}
          </span>
        )}
        <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-white/95 backdrop-blur text-neutral-900 text-[11px] font-bold px-2 py-0.5 rounded-full ring-1 ring-black/5">
          <Star className="h-3 w-3 fill-amber-500 text-amber-500"/> {p.rating}
          <span className="text-neutral-500 font-medium">({p.reviews.toLocaleString()})</span>
        </span>

        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <p className="text-white text-[16.5px] font-extrabold leading-tight tracking-tight drop-shadow">{p.name}</p>
            <p className="text-white/85 text-[11.5px] mt-0.5 inline-flex items-center gap-1"><MapPin className="h-3 w-3"/>{p.city}</p>
          </div>
          {p.verified && <BadgeCheck className="h-5 w-5 text-white drop-shadow" strokeWidth={2.4}/>}
        </div>
      </div>

      <div className="px-4 py-3.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12.5px] text-neutral-500 truncate">{p.tagline}</p>
          <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
            {p.specialties.slice(0,3).map((s) => (
              <span key={s} className="text-[10.5px] font-semibold text-neutral-700 bg-neutral-100 ring-1 ring-neutral-200 rounded-full px-2 py-0.5">{s}</span>
            ))}
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-[10px] uppercase tracking-[0.18em] font-semibold text-neutral-400">Starting</p>
          <p className="text-[15.5px] font-extrabold text-neutral-900">₹{p.startingPrice.toLocaleString()}</p>
          <span className="mt-0.5 inline-flex items-center text-[11.5px] font-bold text-rose-700">View <ChevronRight className="h-3.5 w-3.5"/></span>
        </div>
      </div>
    </button>
  );
}
