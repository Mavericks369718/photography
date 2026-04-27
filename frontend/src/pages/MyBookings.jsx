import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Clock, Hash, Camera, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";
import BottomNav from "../components/BottomNav";

export default function MyBookings() {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    const read = () => {
      const arr = JSON.parse(localStorage.getItem("cm_bookings_history") || "[]");
      setList(arr.slice().reverse());
    };
    read();
    window.addEventListener("cm-bookings-updated", read);
    return () => window.removeEventListener("cm-bookings-updated", read);
  }, []);

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-24">
        {/* Slim hero */}
        <div className="relative h-[28vh] min-h-[220px] w-full overflow-hidden">
          <img src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1400&q=85" alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.04]"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/75"/>
          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button onClick={() => navigate("/")} data-testid="bookings-back-btn" className="h-10 w-10 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm">
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white">
              <Sparkles className="h-3 w-3"/> History
            </span>
          </div>
          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-7">
            <span className="inline-block text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">CorporateMoments</span>
            <h1 className="mt-2 text-white text-[34px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" style={{fontWeight:800}}>
              My <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">bookings.</span>
            </h1>
          </div>
        </div>

        <div className="relative -mt-6 flex-1 bg-white rounded-t-[28px] px-5 pt-6 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.08)]" data-testid="bookings-sheet">
          {list.length === 0 ? (
            <div className="py-16 text-center">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-rose-50 ring-1 ring-rose-100 flex items-center justify-center">
                <Camera className="h-7 w-7 text-rose-700" strokeWidth={2.2}/>
              </div>
              <p className="mt-4 text-[15px] font-bold text-neutral-900">No bookings yet</p>
              <p className="mt-1 text-[13px] text-neutral-500">Discover photographers you'll love.</p>
              <button data-testid="bookings-explore-btn" onClick={() => navigate("/")} className="mt-5 rounded-full bg-rose-800 text-white px-5 py-2.5 text-[13px] font-bold">Explore photographers</button>
            </div>
          ) : (
            <div className="space-y-3.5">
              {list.map((b) => <BookingCard key={b.ref} b={b}/>)}
            </div>
          )}
        </div>

        <BottomNav />
      </div>
    </div>
  );
}

function BookingCard({ b }) {
  const date = new Date(b.date).toLocaleDateString("en-IN", { weekday:"short", day:"2-digit", month:"short", year:"numeric" });
  const paid = b.paymentMode === "online";
  const pending = b.assignmentPending && !b.assignedPhotographer;
  return (
    <div data-testid={`booking-${b.ref}`} className="rounded-3xl bg-[#FFF7F3] ring-1 ring-rose-100 overflow-hidden">
      <div className="p-4 flex gap-3 items-center">
        <div className="h-14 w-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
          <img src={b.package.image} alt="" className="h-full w-full object-cover"/>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13.5px] font-bold text-neutral-900 truncate">{b.package.name}</p>
          {pending ? (
            <p className="text-[11.5px] font-bold text-amber-700 mt-0.5 inline-flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse"/>Assigning a photographer…
            </p>
          ) : (
            <p className="text-[11.5px] text-neutral-500 mt-0.5 inline-flex items-center gap-1"><Camera className="h-3 w-3"/>{b.package.photographer}</p>
          )}
        </div>
        <span className={`shrink-0 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10.5px] font-bold tracking-wide ${paid?"bg-emerald-100 text-emerald-800":"bg-amber-100 text-amber-800"}`}>
          <span className={`h-1.5 w-1.5 rounded-full ${paid?"bg-emerald-600":"bg-amber-600"}`}/>
          {paid?"Paid":"Pay on day"}
        </span>
      </div>

      <div className="mx-4 border-t border-dashed border-neutral-200"/>

      <div className="px-4 py-3 grid grid-cols-3 gap-2 text-[11.5px]">
        <Mini icon={<Calendar className="h-3.5 w-3.5"/>}  label="Date"  value={date}/>
        <Mini icon={<Clock className="h-3.5 w-3.5"/>}     label="Time"  value={b.time}/>
        <Mini icon={<Hash className="h-3.5 w-3.5"/>}      label="Ref"   value={b.ref}/>
      </div>
    </div>
  );
}

function Mini({ icon, label, value }) {
  return (
    <div>
      <p className="inline-flex items-center gap-1 text-[10px] uppercase tracking-[0.16em] font-bold text-neutral-500">{icon}{label}</p>
      <p className="text-[12.5px] font-bold text-neutral-900 truncate">{value}</p>
    </div>
  );
}
