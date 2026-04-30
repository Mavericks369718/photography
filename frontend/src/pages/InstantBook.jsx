import React, { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin, Crosshair, Search, Camera, Video, Sparkles, BookImage, CheckCircle2 } from "lucide-react";
import { categoryTitle, categories } from "../mock";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["S","M","T","W","T","F","S"];
const TIME_SLOTS = ["07:00 AM","09:00 AM","11:00 AM","01:00 PM","03:00 PM","05:00 PM","07:00 PM"];
const UNAVAILABLE_WEEKDAYS = [0];

const CATEGORY_META = {
  wedding:     { base: 65000, durationLabel: "Per slot ≈ 2 hrs" },
  prewedding:  { base: 32000, durationLabel: "Per slot ≈ 2 hrs" },
  cinematic:   { base: 55000, durationLabel: "Per slot ≈ 2 hrs" },
  maternity:   { base: 14999, durationLabel: "Per slot ≈ 2 hrs" },
  baby:        { base: 9999,  durationLabel: "Per slot ≈ 2 hrs" },
  fashion:     { base: 18999, durationLabel: "Per slot ≈ 2 hrs" },
  product:     { base: 14999, durationLabel: "Per slot ≈ 2 hrs" },
  events:      { base: 12999, durationLabel: "Per slot ≈ 2 hrs" },
  corporate:   { base: 4999,  durationLabel: "Per slot ≈ 2 hrs" },
  realestate:  { base: 12999, durationLabel: "Per slot ≈ 2 hrs" }
};

const SERVICE_TYPES = [
  { id: "photo",       label: "Photography",            desc: "Stills only · Edited gallery",        multiplier: 1.0, Icon: Camera    },
  { id: "video",       label: "Videography",            desc: "Cinematic film · Reels",              multiplier: 1.4, Icon: Video     },
  { id: "both",        label: "Photo + Video",          desc: "Full crew · Best value",              multiplier: 1.8, Icon: Sparkles  },
  { id: "both_album",  label: "Photo + Video + Album",  desc: "Premium hardcover album included",    multiplier: 2.2, Icon: BookImage }
];

const RECENT_ADDRESSES = [
  { label: "Home",   line: "B-204, Rosewood Apartments, Dwarka Sec-12, New Delhi" },
  { label: "Office", line: "Cyber Hub, Tower B, Floor 14, Gurugram, Haryana"      },
  { label: "Venue",  line: "The Imperial Ballroom, Janpath, New Delhi"            }
];

// Sort slots by their natural order from TIME_SLOTS
const sortSlots = (arr) => arr.slice().sort((a,b) => TIME_SLOTS.indexOf(a) - TIME_SLOTS.indexOf(b));

export default function InstantBook() {
  const navigate = useNavigate();
  const { categoryId } = useParams();
  const cat = categories.find((c) => c.id === categoryId);
  const meta = CATEGORY_META[categoryId] || { base: 19999, durationLabel: "Per slot ≈ 2 hrs" };
  const heroImg = cat?.image?.replace("w=400", "w=1400").replace("w=800", "w=1400") || "";
  const title = categoryTitle(categoryId);

  const [step, setStep] = useState(1); // 1 date+time · 2 location · 3 service
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState(null);
  const [times, setTimes] = useState([]); // multi-select
  const [address, setAddress] = useState("");
  const [pinLabel, setPinLabel] = useState("");
  const [service, setService] = useState(null); // null until picked

  const { cells, monthLabel } = useMemo(() => {
    const y = month.getFullYear(), m = month.getMonth();
    const first = new Date(y,m,1).getDay();
    const days = new Date(y,m+1,0).getDate();
    const list = [];
    for (let i=0;i<first;i++) list.push(null);
    for (let d=1; d<=days; d++) list.push(new Date(y,m,d));
    return { cells: list, monthLabel: `${MONTHS[m]} ${y}` };
  }, [month]);

  const isUnavailable = (d) => !d || UNAVAILABLE_WEEKDAYS.includes(d.getDay()) || d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSameDay = (a,b) => a && b && a.toDateString() === b.toDateString();

  const toggleTime = (t) => {
    setTimes((prev) => prev.includes(t) ? prev.filter(x => x !== t) : sortSlots([...prev, t]));
  };

  const svc = SERVICE_TYPES.find((s) => s.id === service);
  const total = svc ? Math.round(meta.base * svc.multiplier) : null;
  const original = total ? Math.round(total * 1.25) : null;

  const canNext =
    (step === 1 && date && times.length > 0) ||
    (step === 2 && address.trim().length > 5) ||
    (step === 3 && !!service);

  const next = () => {
    if (step < 3) { setStep(step + 1); return; }
    const timeLabel = times.length === 1
      ? times[0]
      : `${times[0]} – ${(() => {
          // end of last slot = last slot + 2hrs
          const last = times[times.length - 1];
          const idx = TIME_SLOTS.indexOf(last);
          return TIME_SLOTS[idx + 1] || last;
        })()}`;

    const booking = {
      package: {
        id: `${categoryId}-${service}`,
        name: `${title} — ${svc.label}`,
        photographer: "Auto-assigned · Best pro nearby",
        image: heroImg,
        basePrice: total,
        originalPrice: original,
        duration: `${times.length * 2} hrs · ${times.length} slot${times.length > 1 ? "s" : ""}`,
        location: address
      },
      date: date.toISOString(),
      time: timeLabel,
      times,
      total,
      categoryId,
      service: svc.id,
      address,
      assignmentPending: true
    };
    localStorage.setItem("cm_booking", JSON.stringify(booking));
    localStorage.setItem("cm_instant_flow", "1");
    navigate("/payment");
  };

  const back = () => step > 1 ? setStep(step - 1) : navigate(-1);

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-28">
        {/* Hero */}
        <div className="relative h-[32vh] min-h-[240px] w-full overflow-hidden">
          <img src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.04]"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/80"/>
          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button onClick={back} data-testid="ib-back-btn" className="h-10 w-10 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-white">Step {step} / 3</span>
          </div>
          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-7">
            <span className="inline-block text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">{title}</span>
            <h1 className="mt-1.5 text-white text-[30px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" style={{fontWeight:800}}>
              {step === 1 && <>Pick date &amp; <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">time.</span></>}
              {step === 2 && <>Where to <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">shoot?</span></>}
              {step === 3 && <>What do you <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">need?</span></>}
            </h1>
          </div>
        </div>

        <div className="relative -mt-6 flex-1 bg-white rounded-t-[28px] px-5 pt-5 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]">
          {/* Step bar */}
          <div className="flex items-center gap-1.5 mb-5">
            {[1,2,3].map((n) => (
              <span key={n} className={`h-1 rounded-full transition-all ${n===step?"w-8 bg-rose-700":n<step?"w-5 bg-rose-300":"w-5 bg-neutral-200"}`}/>
            ))}
            <span className="ml-2 text-[11px] font-semibold tracking-[0.18em] uppercase text-neutral-500">
              {step===1?"Date & time":step===2?"Location":"Service"}
            </span>
          </div>

          {step === 1 && (
            <div data-testid="ib-step-datetime" className="space-y-5">
              {/* Calendar */}
              <div className="rounded-2xl bg-white ring-1 ring-neutral-200 shadow-[0_6px_18px_rgba(0,0,0,0.04)] p-4">
                <div className="flex items-center justify-between mb-3">
                  <button onClick={()=>setMonth(new Date(month.getFullYear(), month.getMonth()-1, 1))} className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center"><ChevronLeft className="h-4 w-4"/></button>
                  <span className="text-[14px] font-bold text-neutral-900">{monthLabel}</span>
                  <button onClick={()=>setMonth(new Date(month.getFullYear(), month.getMonth()+1, 1))} className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center"><ChevronRight className="h-4 w-4"/></button>
                </div>
                <div className="grid grid-cols-7 gap-1 mb-1.5">
                  {DAYS.map((d,i)=>(<span key={i} className="text-center text-[11px] font-semibold text-neutral-400">{d}</span>))}
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {cells.map((d,i)=>{
                    if (!d) return <div key={i} className="h-10"/>;
                    const dis = isUnavailable(d);
                    const sel = isSameDay(d, date);
                    return (
                      <button key={i} onClick={()=>!dis && setDate(d)} disabled={dis}
                        className={`h-10 rounded-lg text-[13px] font-semibold transition-all ${sel?"bg-rose-800 text-white shadow-md":dis?"text-neutral-300 line-through cursor-not-allowed":"text-neutral-800 hover:bg-rose-50"}`}>
                        {d.getDate()}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time slots — multi-select */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-rose-700">Time slots</p>
                  <span className="text-[11px] text-neutral-500">{times.length > 0 ? `${times.length} selected · ${times.length * 2} hrs` : "Pick one or more"}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map(t=>{
                    const sel = times.includes(t);
                    return (
                      <button key={t} data-testid={`ib-time-${t.replace(/[: ]/g,'')}-btn`} onClick={()=>!!date && toggleTime(t)} disabled={!date}
                        className={`relative py-3 rounded-xl text-[13px] font-semibold ring-1 transition ${sel?"bg-rose-800 text-white ring-rose-800 shadow-md":!date?"bg-neutral-50 text-neutral-300 ring-neutral-100 cursor-not-allowed":"bg-white text-neutral-800 ring-neutral-200 hover:ring-rose-300"}`}>
                        {t}
                        {sel && <CheckCircle2 className="absolute top-1 right-1 h-3.5 w-3.5"/>}
                      </button>
                    );
                  })}
                </div>
                {!date && <p className="mt-2 text-[11.5px] text-neutral-400">Pick a date first</p>}
              </div>
            </div>
          )}

          {step === 2 && (
            <div data-testid="ib-step-location">
              {/* Mock cinematic map */}
              <div className="relative h-[200px] rounded-2xl overflow-hidden ring-1 ring-neutral-200">
                <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=85" alt="map" className="absolute inset-0 h-full w-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/40 via-emerald-800/20 to-rose-900/40 mix-blend-multiply"/>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.18),transparent_55%)]"/>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0 h-3 w-3 rounded-full bg-rose-500/40 animate-ping"/>
                  <span className="relative h-10 w-10 rounded-full bg-rose-700 ring-4 ring-white shadow-[0_8px_22px_rgba(159,18,57,0.35)] flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-white" strokeWidth={2.4}/>
                  </span>
                </div>
                <button onClick={()=>{ setAddress(RECENT_ADDRESSES[0].line); setPinLabel("Detected · " + RECENT_ADDRESSES[0].label); }} data-testid="ib-detect-location-btn"
                  className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur ring-1 ring-black/5 px-3 py-1.5 text-[11.5px] font-bold text-neutral-800 hover:bg-white shadow">
                  <Crosshair className="h-3.5 w-3.5 text-rose-700"/> Use my location
                </button>
              </div>

              <div className="mt-4 rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-4">
                <label className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-neutral-500">Shoot location</label>
                <div className="mt-2 flex items-center gap-2.5">
                  <Search className="h-4 w-4 text-rose-700 shrink-0"/>
                  <input autoFocus data-testid="ib-address-input" value={address}
                    onChange={(e)=>{setAddress(e.target.value); setPinLabel("");}}
                    placeholder="Search address, locality, venue"
                    className="flex-1 bg-transparent outline-none text-[14.5px] font-semibold text-neutral-900 placeholder:text-neutral-400 placeholder:font-medium"/>
                </div>
                {pinLabel && <p className="mt-2 text-[11.5px] font-bold text-emerald-700 inline-flex items-center gap-1"><CheckCircle2 className="h-3 w-3"/>{pinLabel}</p>}
              </div>

              <div className="mt-5">
                <p className="text-[10.5px] font-semibold tracking-[0.22em] uppercase text-neutral-500 mb-2">Recent</p>
                <div className="space-y-2">
                  {RECENT_ADDRESSES.map((r,i)=>(
                    <button key={i} data-testid={`ib-recent-${i}-btn`} onClick={()=>{setAddress(r.line); setPinLabel(r.label);}}
                      className="w-full text-left rounded-2xl bg-white ring-1 ring-neutral-200 p-3 flex items-start gap-3 hover:ring-rose-200 transition">
                      <span className="h-9 w-9 rounded-xl bg-rose-50 ring-1 ring-rose-100 flex items-center justify-center shrink-0"><MapPin className="h-4 w-4 text-rose-700"/></span>
                      <div className="min-w-0">
                        <p className="text-[12.5px] font-bold text-neutral-900">{r.label}</p>
                        <p className="text-[11.5px] text-neutral-500 truncate">{r.line}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div data-testid="ib-step-service">
              <div className="space-y-2.5">
                {SERVICE_TYPES.map((s) => {
                  const sel = service === s.id;
                  const price = Math.round(meta.base * s.multiplier);
                  const Icon = s.Icon;
                  return (
                    <button key={s.id} data-testid={`ib-service-${s.id}-btn`} onClick={()=>setService(s.id)}
                      className={`w-full text-left rounded-2xl p-4 ring-1 transition flex items-center gap-3 ${sel?"bg-rose-50 ring-rose-700 ring-2":"bg-white ring-neutral-200 hover:ring-rose-200"}`}>
                      <span className={`h-11 w-11 rounded-xl flex items-center justify-center shrink-0 ${sel?"bg-rose-700 text-white":"bg-rose-50 text-rose-700"}`}><Icon className="h-5 w-5" strokeWidth={2.2}/></span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14.5px] font-extrabold text-neutral-900 leading-tight">{s.label}</p>
                        <p className="text-[11.5px] text-neutral-500 mt-0.5">{s.desc}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-[10.5px] uppercase tracking-[0.16em] font-bold text-neutral-400">From</p>
                        <p className="text-[15px] font-extrabold text-neutral-900">₹{price.toLocaleString()}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
              <p className="mt-5 text-[11.5px] text-neutral-500 leading-relaxed">A photographer will be auto-assigned within a few minutes based on your location & expertise match.</p>
            </div>
          )}
        </div>

        {/* Sticky CTA — price hidden until service is picked on step 3 */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-neutral-200 px-5 py-3.5 z-40">
          <div className="flex items-center justify-between gap-3">
            <div>
              {service && total ? (
                <>
                  <div className="flex items-baseline gap-2">
                    <span className="text-[20px] font-extrabold text-neutral-900">₹{total.toLocaleString()}</span>
                    <span className="text-[12px] text-neutral-400 line-through">₹{original.toLocaleString()}</span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-700">{times.length || 1}× slot · {svc.label}</span>
                </>
              ) : (
                <>
                  <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-neutral-500">{step === 3 ? "Pick a service" : "Continue to next step"}</p>
                  <p className="text-[12.5px] text-neutral-700 mt-0.5">Final price shown after service selection</p>
                </>
              )}
            </div>
            <button data-testid="ib-next-btn" onClick={next} disabled={!canNext}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[14px] font-bold transition-all ${canNext?"bg-rose-800 text-white shadow-lg shadow-rose-800/20 hover:bg-rose-900":"bg-neutral-100 text-neutral-400 cursor-not-allowed"}`}>
              {step === 3 ? "Continue to pay" : "Continue"} <ArrowRight className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
