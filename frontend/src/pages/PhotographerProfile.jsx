import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Star, MapPin, BadgeCheck, Award, Camera, Clock, Languages, Heart, Share2, ChevronRight, Sparkles } from "lucide-react";
import { getPhotographer } from "../mock";
import BottomNav from "../components/BottomNav";

const TABS = ["Portfolio", "Packages", "Reviews", "About"];

export default function PhotographerProfile() {
  const navigate = useNavigate();
  const { photographerId } = useParams();
  const p = getPhotographer(photographerId);
  const [tab, setTab] = useState("Portfolio");
  const [liked, setLiked] = useState(false);

  if (!p) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF1EC]">
        <div className="text-center">
          <p className="text-neutral-700 mb-3">Photographer not found.</p>
          <button onClick={()=>navigate("/")} className="rounded-full bg-rose-800 text-white px-5 py-2 text-sm font-bold">Go home</button>
        </div>
      </div>
    );
  }

  const startBooking = (pkg) => {
    const selected = {
      photographerId: p.id,
      photographerName: p.name,
      photographerImage: p.avatar,
      package: {
        id: pkg.id,
        name: pkg.name,
        photographer: p.name,
        image: p.cover,
        basePrice: pkg.price,
        originalPrice: pkg.originalPrice,
        duration: pkg.duration,
        location: `On-location · ${p.city}`
      }
    };
    localStorage.setItem("cm_selected", JSON.stringify(selected));
    navigate("/booking");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-32">
        {/* Editorial cinematic hero */}
        <div className="relative h-[58vh] min-h-[460px] w-full overflow-hidden">
          <img src={p.cover} alt={p.name} className="absolute inset-0 h-full w-full object-cover scale-[1.04]" data-testid="photographer-cover"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/85"/>

          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button
              data-testid="profile-back-btn"
              onClick={() => navigate(-1)}
              className="h-10 w-10 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white"
            >
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <div className="flex items-center gap-2">
              <button
                data-testid="profile-like-btn"
                onClick={() => setLiked((v) => !v)}
                className="h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white"
              >
                <Heart className={`h-4 w-4 ${liked?"fill-rose-700 text-rose-700":"text-neutral-800"}`} strokeWidth={2.2}/>
              </button>
              <button className="h-10 w-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white">
                <Share2 className="h-4 w-4 text-neutral-800" strokeWidth={2.2}/>
              </button>
            </div>
          </div>

          {/* Editorial typographic block */}
          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-12">
            <div className="flex items-center gap-2 text-white/85 text-[10.5px] font-semibold tracking-[0.28em] uppercase">
              <Sparkles className="h-3 w-3"/> Featured photographer
            </div>
            <h1
              className="mt-3 text-white leading-[0.95] tracking-[-0.03em] drop-shadow-[0_2px_14px_rgba(0,0,0,0.4)]"
              style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic",fontSize:"46px"}}
            >
              {p.name}
            </h1>
            <p className="mt-3 text-white/85 text-[13.5px] tracking-wide max-w-[320px]">{p.tagline}</p>
            <div className="mt-4 flex items-center flex-wrap gap-2">
              {p.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/90 text-white px-2.5 py-0.5 text-[10.5px] font-bold tracking-wide">
                  <BadgeCheck className="h-3 w-3"/> Verified
                </span>
              )}
              {p.award && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-800 px-2.5 py-0.5 text-[10.5px] font-bold tracking-wide">
                  <Award className="h-3 w-3"/> {p.award}
                </span>
              )}
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur text-white px-2.5 py-0.5 text-[10.5px] font-semibold tracking-wide">
                <MapPin className="h-3 w-3"/> {p.city}
              </span>
            </div>
          </div>
        </div>

        {/* Curved white card */}
        <div className="relative -mt-6 bg-white rounded-t-[28px] shadow-[0_-10px_30px_rgba(0,0,0,0.08)] flex-1">
          {/* Stat strip */}
          <div className="px-5 pt-5">
            <div className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 grid grid-cols-3 divide-x divide-rose-100 overflow-hidden">
              <Stat label="Rating" value={p.rating} sub={`${p.reviews.toLocaleString()} reviews`} icon={<Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500"/>}/>
              <Stat label="Experience" value={`${p.yearsExperience} yrs`} sub="On platform"/>
              <Stat label="Delivered" value={p.deliveriesCompleted.toLocaleString()} sub="Shoots"/>
            </div>
          </div>

          {/* Sticky tab bar */}
          <div className="sticky top-0 z-20 bg-white px-5 pt-4 pb-2 border-b border-neutral-100" data-testid="profile-tabs">
            <div className="flex gap-6 overflow-x-auto no-scrollbar">
              {TABS.map((t) => {
                const sel = t === tab;
                return (
                  <button
                    key={t}
                    data-testid={`tab-${t.toLowerCase()}-btn`}
                    onClick={() => setTab(t)}
                    className={`shrink-0 pb-2.5 text-[13.5px] font-bold tracking-tight relative transition-colors ${sel?"text-neutral-900":"text-neutral-400 hover:text-neutral-600"}`}
                  >
                    {t}
                    {sel && <span className="absolute left-0 right-0 -bottom-px h-[2.5px] rounded-full bg-rose-700"/>}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="px-5 py-5">
            {tab === "Portfolio" && <PortfolioGrid images={p.portfolio}/>}
            {tab === "Packages"  && <PackagesList packages={p.packages} onBook={startBooking}/>}
            {tab === "Reviews"   && <ReviewsList reviews={p.reviewsList} rating={p.rating} reviewCount={p.reviews}/>}
            {tab === "About"     && <AboutBlock p={p}/>}
          </div>
        </div>

        {/* Sticky bottom CTA */}
        <div className="fixed bottom-[68px] left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-neutral-200 px-5 py-3 z-30">
          <div className="flex items-center gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-[10.5px] uppercase tracking-[0.2em] font-semibold text-neutral-500">Starting price</p>
              <p className="text-[18px] font-extrabold text-neutral-900 leading-tight">₹{p.startingPrice.toLocaleString()}<span className="text-[12px] font-medium text-neutral-500"> / shoot</span></p>
            </div>
            <button
              data-testid="profile-book-btn"
              onClick={() => { setTab("Packages"); document.querySelector('[data-testid="profile-tabs"]')?.scrollIntoView({behavior:"smooth", block:"start"}); }}
              className="rounded-full bg-rose-800 text-white px-6 py-3 text-[13.5px] font-bold inline-flex items-center gap-1.5 shadow-[0_8px_22px_rgba(159,18,57,0.28)] hover:bg-rose-900 active:scale-[0.99] transition-all"
            >
              View packages <ChevronRight className="h-4 w-4"/>
            </button>
          </div>
        </div>

        <BottomNav />
        <style>{`.no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}`}</style>
      </div>
    </div>
  );
}

function Stat({ label, value, sub, icon }) {
  return (
    <div className="px-3 py-3 text-center">
      <p className="text-[10.5px] uppercase tracking-[0.18em] font-semibold text-neutral-500">{label}</p>
      <p className="mt-1 text-[15px] font-extrabold text-neutral-900 inline-flex items-center justify-center gap-1">{icon}{value}</p>
      <p className="text-[10.5px] text-neutral-500 mt-0.5">{sub}</p>
    </div>
  );
}

function PortfolioGrid({ images }) {
  // Editorial masonry: rows of 1 / 2 / 1 / 2 sizes
  const layout = [
    { col: "col-span-2", aspect: "aspect-[16/10]" },
    { col: "col-span-1", aspect: "aspect-square"  },
    { col: "col-span-1", aspect: "aspect-square"  },
    { col: "col-span-1", aspect: "aspect-[3/4]"   },
    { col: "col-span-1", aspect: "aspect-[3/4]"   },
    { col: "col-span-2", aspect: "aspect-[16/10]" }
  ];
  return (
    <div data-testid="portfolio-grid" className="grid grid-cols-2 gap-2.5">
      {images.map((src, i) => {
        const l = layout[i % layout.length];
        return (
          <div key={i} className={`${l.col} ${l.aspect} relative rounded-2xl overflow-hidden bg-neutral-100 ring-1 ring-black/5 group`}>
            <img src={src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"/>
          </div>
        );
      })}
    </div>
  );
}

function PackagesList({ packages, onBook }) {
  return (
    <div data-testid="packages-list" className="space-y-3">
      {packages.map((pkg) => {
        const off = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
        return (
          <div key={pkg.id} className="rounded-3xl bg-white ring-1 ring-neutral-200 p-4 hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)] transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="text-[15.5px] font-extrabold text-neutral-900 tracking-tight leading-snug">{pkg.name}</h3>
                <p className="mt-1 text-[12.5px] text-neutral-500 leading-snug">{pkg.subtitle}</p>
                <p className="mt-2 inline-flex items-center gap-1 text-[11.5px] font-semibold text-neutral-700 bg-neutral-100 ring-1 ring-neutral-200 rounded-full px-2 py-0.5">
                  <Clock className="h-3 w-3"/> {pkg.duration}
                </p>
              </div>
              {off > 0 && (
                <span className="shrink-0 rounded-full bg-rose-50 ring-1 ring-rose-100 text-rose-700 text-[10.5px] font-bold tracking-wide px-2 py-0.5">{off}% OFF</span>
              )}
            </div>
            <div className="mt-3 flex items-end justify-between">
              <div>
                <span className="text-[18px] font-extrabold text-neutral-900">₹{pkg.price.toLocaleString()}</span>
                {pkg.originalPrice > pkg.price && <span className="ml-2 text-[12.5px] text-neutral-400 line-through">₹{pkg.originalPrice.toLocaleString()}</span>}
              </div>
              <button
                data-testid={`book-package-${pkg.id}-btn`}
                onClick={() => onBook(pkg)}
                className="rounded-full bg-rose-800 text-white px-4 py-2 text-[12.5px] font-bold inline-flex items-center gap-1 hover:bg-rose-900 active:scale-[0.99] transition"
              >
                Book this <ChevronRight className="h-3.5 w-3.5"/>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ReviewsList({ reviews, rating, reviewCount }) {
  return (
    <div data-testid="reviews-list">
      <div className="rounded-3xl bg-[#FFF7F3] ring-1 ring-rose-100 p-5 flex items-center gap-4">
        <div className="text-center">
          <p className="text-[34px] font-extrabold leading-none text-neutral-900">{rating}</p>
          <div className="flex items-center justify-center gap-0.5 mt-1">
            {[1,2,3,4,5].map(i => <Star key={i} className={`h-3 w-3 ${i <= Math.round(rating) ? "fill-amber-500 text-amber-500":"text-neutral-300"}`}/>)}
          </div>
          <p className="text-[10.5px] text-neutral-500 mt-1">{reviewCount.toLocaleString()} reviews</p>
        </div>
        <div className="flex-1 space-y-1.5">
          {[5,4,3,2,1].map((s, i) => {
            const widths = [0.78, 0.16, 0.04, 0.015, 0.005];
            return (
              <div key={s} className="flex items-center gap-2 text-[10.5px] text-neutral-500">
                <span className="w-3">{s}</span>
                <span className="flex-1 h-1.5 rounded-full bg-rose-100 overflow-hidden">
                  <span className="block h-full bg-rose-700" style={{width: `${widths[i]*100}%`}}/>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="rounded-2xl bg-white ring-1 ring-neutral-200 p-4">
            <div className="flex items-center gap-3">
              <img src={r.avatar} alt={r.name} className="h-10 w-10 rounded-full object-cover"/>
              <div className="flex-1 min-w-0">
                <p className="text-[13.5px] font-bold text-neutral-900 truncate">{r.name}</p>
                <p className="text-[11px] text-neutral-500">{r.city} · {r.date}</p>
              </div>
              <div className="flex items-center gap-0.5">
                {[1,2,3,4,5].map(i => <Star key={i} className={`h-3 w-3 ${i <= r.rating ? "fill-amber-500 text-amber-500":"text-neutral-300"}`}/>)}
              </div>
            </div>
            <p className="mt-3 text-[13px] text-neutral-700 leading-relaxed">"{r.text}"</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutBlock({ p }) {
  return (
    <div data-testid="about-block" className="space-y-5">
      <p className="text-[14px] text-neutral-700 leading-relaxed">{p.about}</p>

      <div className="grid grid-cols-2 gap-3">
        <InfoRow icon={<Camera className="h-4 w-4 text-rose-700"/>} label="Specialties" value={p.specialties.join(", ")}/>
        <InfoRow icon={<Languages className="h-4 w-4 text-rose-700"/>} label="Languages" value={p.languages.join(", ")}/>
        <InfoRow icon={<MapPin className="h-4 w-4 text-rose-700"/>} label="Based in" value={p.city}/>
        <InfoRow icon={<Award className="h-4 w-4 text-rose-700"/>} label="Recognition" value={p.award || "—"}/>
      </div>
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-3">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-[10.5px] uppercase tracking-[0.18em] font-bold text-neutral-500">{label}</p>
      </div>
      <p className="mt-1.5 text-[13px] font-bold text-neutral-900 leading-snug">{value}</p>
    </div>
  );
}
