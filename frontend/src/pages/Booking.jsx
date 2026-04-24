import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Clock, MapPin } from "lucide-react";

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS = ["S","M","T","W","T","F","S"];
const TIME_SLOTS = ["07:00 AM","09:00 AM","11:00 AM","01:00 PM","03:00 PM","05:00 PM","07:00 PM"];
const PACKAGE = { id: "w2", name: "Candid & Traditional Combo", photographer: "Studio Moments by Raj", image: "https://images.unsplash.com/photo-1604017011826-d3b4c23f8914?w=800&q=80", basePrice: 65000, originalPrice: 85000, duration: "10 hrs", location: "On-location · Delhi NCR" };
const UNAVAILABLE_WEEKDAYS = [0]; // Sundays closed

function StepBar({ step }) {
  return (
    <div className="flex items-center gap-1.5">
      {[1,2,3].map((n) => (
        <span key={n} className={`h-1 rounded-full transition-all ${n===step?"w-7 bg-rose-700":n<step?"w-5 bg-rose-300":"w-5 bg-neutral-200"}`} />
      ))}
      <span className="ml-2 text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-500">Step {step}/3</span>
    </div>
  );
}

export default function Booking() {
  const navigate = useNavigate();
  const today = new Date();
  const [month, setMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { const t = setTimeout(()=>setLoading(false), 700); return ()=>clearTimeout(t); }, []);

  const { cells, monthLabel } = useMemo(() => {
    const y = month.getFullYear(), m = month.getMonth();
    const first = new Date(y,m,1).getDay();
    const daysInMonth = new Date(y,m+1,0).getDate();
    const list = [];
    for (let i=0;i<first;i++) list.push(null);
    for (let d=1; d<=daysInMonth; d++) list.push(new Date(y,m,d));
    return { cells: list, monthLabel: `${MONTHS[m]} ${y}` };
  }, [month]);

  const isUnavailable = (d) => !d || UNAVAILABLE_WEEKDAYS.includes(d.getDay()) || d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const isSameDay = (a,b) => a && b && a.toDateString() === b.toDateString();

  const canProceed = selectedDate && selectedTime;
  const runningTotal = PACKAGE.basePrice + (selectedTime ? 0 : 0);
  const savings = PACKAGE.originalPrice - PACKAGE.basePrice;

  const proceed = () => {
    if (!canProceed) return;
    const booking = {
      package: PACKAGE,
      date: selectedDate.toISOString(),
      time: selectedTime,
      total: runningTotal,
    };
    localStorage.setItem("cm_booking", JSON.stringify(booking));
    navigate("/payment");
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-28">
        {/* Header */}
        <div className="px-5 pt-6 pb-4 flex items-center justify-between">
          <button onClick={()=>navigate(-1)} className="h-10 w-10 -ml-2 rounded-full bg-white ring-1 ring-neutral-200 shadow-sm flex items-center justify-center hover:bg-neutral-50 transition">
            <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
          </button>
          <StepBar step={1}/>
          <div className="w-10"/>
        </div>

        {/* Package card */}
        <div className="mx-5 rounded-2xl bg-white ring-1 ring-neutral-200 shadow-[0_6px_18px_rgba(0,0,0,0.04)] p-3 flex gap-3">
          <div className="h-16 w-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
            <img src={PACKAGE.image} alt="" className="h-full w-full object-cover"/>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13.5px] font-bold text-neutral-900 leading-tight truncate">{PACKAGE.name}</p>
            <p className="text-[11.5px] text-neutral-500 mt-0.5 truncate">{PACKAGE.photographer}</p>
            <div className="flex items-center gap-3 mt-1.5 text-[11px] text-neutral-500">
              <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3"/>{PACKAGE.duration}</span>
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3"/>Delhi NCR</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <div className="px-5 pt-6 pb-3">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-rose-700">Schedule</p>
          <h1 className="mt-1.5 text-[26px] font-extrabold text-neutral-900 leading-[1.1] tracking-[-0.02em]">Pick a date &amp; time</h1>
        </div>

        {/* Calendar */}
        <div className="mx-5 rounded-2xl bg-white ring-1 ring-neutral-200 shadow-[0_6px_18px_rgba(0,0,0,0.04)] p-4">
          <div className="flex items-center justify-between mb-3">
            <button onClick={()=>setMonth(new Date(month.getFullYear(), month.getMonth()-1, 1))} className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center">
              <ChevronLeft className="h-4 w-4 text-neutral-700"/>
            </button>
            <span className="text-[14px] font-bold text-neutral-900">{monthLabel}</span>
            <button onClick={()=>setMonth(new Date(month.getFullYear(), month.getMonth()+1, 1))} className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center">
              <ChevronRight className="h-4 w-4 text-neutral-700"/>
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 mb-1.5">
            {DAYS.map((d,i)=>(<span key={i} className="text-center text-[11px] font-semibold text-neutral-400">{d}</span>))}
          </div>
          {loading ? (
            <div className="grid grid-cols-7 gap-1">
              {Array.from({length:35}).map((_,i)=>(<div key={i} className="h-10 rounded-lg bg-neutral-100 animate-pulse"/>))}
            </div>
          ) : (
            <div className="grid grid-cols-7 gap-1">
              {cells.map((d,i)=>{
                if (!d) return <div key={i} className="h-10"/>;
                const disabled = isUnavailable(d);
                const selected = isSameDay(d, selectedDate);
                return (
                  <button key={i} onClick={()=>!disabled && setSelectedDate(d)} disabled={disabled}
                    className={`h-10 rounded-lg text-[13px] font-semibold transition-all relative ${selected?"bg-rose-800 text-white shadow-md":disabled?"text-neutral-300 line-through cursor-not-allowed":"text-neutral-800 hover:bg-rose-50"}`}>
                    {d.getDate()}
                  </button>
                );
              })}
            </div>
          )}
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-neutral-100 text-[11px] text-neutral-500">
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-rose-800"/>Selected</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-neutral-200"/>Available</span>
            <span className="inline-flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-neutral-300"/>Unavailable</span>
          </div>
        </div>

        {/* Time slots */}
        <div className="px-5 pt-6 pb-3">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-rose-700">Time slot</p>
          <h2 className="mt-1.5 text-[18px] font-bold text-neutral-900">Preferred start time</h2>
        </div>
        <div className="mx-5 grid grid-cols-3 gap-2">
          {TIME_SLOTS.map(t=>{
            const sel = selectedTime === t;
            return (
              <button key={t} onClick={()=>setSelectedTime(t)} disabled={!selectedDate}
                className={`py-3 rounded-xl text-[13px] font-semibold transition-all ring-1 ${sel?"bg-rose-800 text-white ring-rose-800 shadow-md":!selectedDate?"bg-neutral-50 text-neutral-300 ring-neutral-100 cursor-not-allowed":"bg-white text-neutral-800 ring-neutral-200 hover:ring-rose-300"}`}>
                {t}
              </button>
            );
          })}
        </div>

        {/* Sticky running cost */}
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-neutral-200 px-5 py-3.5 z-40">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-[20px] font-extrabold text-neutral-900">₹{runningTotal.toLocaleString()}</span>
                <span className="text-[12px] text-neutral-400 line-through">₹{PACKAGE.originalPrice.toLocaleString()}</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-700">You save ₹{savings.toLocaleString()}</span>
            </div>
            <button onClick={proceed} disabled={!canProceed}
              className={`inline-flex items-center gap-1.5 rounded-full px-5 py-3 text-[14px] font-bold transition-all ${canProceed?"bg-rose-800 text-white shadow-lg shadow-rose-800/20 hover:bg-rose-900 active:scale-[0.98]":"bg-neutral-100 text-neutral-400 cursor-not-allowed"}`}>
              Continue <ArrowRight className="h-4 w-4"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
