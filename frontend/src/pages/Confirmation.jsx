import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Calendar, Clock, Hash, Camera, Copy, Home as HomeIcon, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function Confirmation() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const read = () => {
      const raw = localStorage.getItem("cm_last_booking");
      setData(raw ? JSON.parse(raw) : null);
    };
    const t = setTimeout(() => { read(); setLoading(false); }, 600);
    const onUpdate = () => {
      read();
      const raw = localStorage.getItem("cm_last_booking");
      const updated = raw ? JSON.parse(raw) : null;
      if (updated?.assignedPhotographer) toast.success("Photographer assigned!", { description: updated.assignedPhotographer.name });
    };
    window.addEventListener("cm-bookings-updated", onUpdate);
    return () => { clearTimeout(t); window.removeEventListener("cm-bookings-updated", onUpdate); };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-[#FFF1EC] flex justify-center">
        <div className="w-full max-w-[480px] px-6 pt-20">
          <div className="mx-auto h-24 w-24 rounded-full bg-neutral-200 animate-pulse"/>
          <div className="mt-8 mx-auto h-6 w-3/4 rounded bg-neutral-200 animate-pulse"/>
          <div className="mt-3 mx-auto h-4 w-1/2 rounded bg-neutral-200 animate-pulse"/>
          <div className="mt-10 h-40 rounded-2xl bg-neutral-200 animate-pulse"/>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF1EC]">
        <div className="text-center">
          <p className="text-neutral-700 mb-3">No booking to show.</p>
          <button onClick={()=>navigate("/")} className="rounded-full bg-rose-800 text-white px-5 py-2 text-sm font-bold">Go home</button>
        </div>
      </div>
    );
  }

  const dateObj = new Date(data.date);
  const dateLabel = dateObj.toLocaleDateString("en-IN", { weekday:"long", day:"2-digit", month:"long", year:"numeric" });
  const paid = data.paymentMode === "online";

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-28">
        {/* Emerald success hero */}
        <div className="relative h-[300px] w-full overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600">
          <img src={data.package.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-overlay"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/50"/>
          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <span className="text-[12px] font-semibold tracking-[0.26em] uppercase text-white drop-shadow">
              Corporate<span className="text-emerald-200">Moments</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-white">Step 3 / 3</span>
          </div>

          <div className="absolute z-10 inset-0 flex flex-col items-center justify-center pt-4 pb-8">
            <div className="relative h-20 w-20">
              <span className="absolute inset-0 rounded-full bg-white/25 animate-[ping_1.6s_ease-out_1]"/>
              <span className="relative h-20 w-20 rounded-full bg-white flex items-center justify-center shadow-[0_12px_30px_rgba(0,0,0,0.25)]">
                <Check className="h-10 w-10 text-emerald-600" strokeWidth={3}/>
              </span>
            </div>
            <span className="mt-4 text-white/90 text-[11px] font-semibold tracking-[0.28em] uppercase">Booking confirmed</span>
            <h1 className="mt-1.5 text-white text-[32px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.3)] text-center px-6" style={{fontWeight:800}}>
              You&rsquo;re <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-emerald-100">all set.</span>
            </h1>
          </div>
        </div>

        {/* Curved white card */}
        <div className="relative -mt-5 bg-white rounded-t-[28px] px-5 pt-6 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] flex-1">
          <p className="text-center text-[13px] text-neutral-500 leading-relaxed mb-5">
            A confirmation has been sent to your mobile.<br/>We&rsquo;ll reach out 24 hrs before the shoot.
          </p>

          {data.assignmentPending && !data.assignedPhotographer && (
            <div data-testid="assignment-pending-card" className="mb-5 rounded-3xl bg-gradient-to-br from-amber-50 via-white to-rose-50 ring-1 ring-amber-200 p-4 flex items-center gap-3">
              <span className="relative h-12 w-12 rounded-full bg-white ring-1 ring-amber-200 flex items-center justify-center shrink-0">
                <span className="absolute inset-0 rounded-full bg-amber-400/30 animate-ping"/>
                <Sparkles className="relative h-5 w-5 text-amber-600" strokeWidth={2.4}/>
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-amber-700">Assigning a photographer</p>
                <p className="text-[13.5px] font-extrabold text-neutral-900 leading-snug">Finding the best pro near you…</p>
                <p className="text-[11.5px] text-neutral-500 mt-0.5">Usually takes a few minutes. Check My Bookings.</p>
              </div>
            </div>
          )}

          {data.assignedPhotographer && (
            <div data-testid="assigned-photographer-card" className="mb-5 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-rose-50 ring-1 ring-emerald-100 p-4 flex items-center gap-3">
              <img src={data.assignedPhotographer.avatar} alt={data.assignedPhotographer.name} className="h-14 w-14 rounded-full object-cover ring-2 ring-white shadow"/>
              <div className="flex-1 min-w-0">
                <p className="text-[10.5px] font-bold tracking-[0.2em] uppercase text-emerald-700">Your photographer</p>
                <p className="text-[14px] font-extrabold text-neutral-900 truncate">{data.assignedPhotographer.name}</p>
                <p className="text-[11.5px] text-neutral-500 mt-0.5">⭐ {data.assignedPhotographer.rating} · {data.assignedPhotographer.city}</p>
              </div>
            </div>
          )}

        {/* Ticket card */}
        <div className="rounded-3xl bg-[#FFF7F3] ring-1 ring-rose-100 overflow-hidden">
          {/* perforated notches */}
          <div className="relative">
            <span className="absolute -left-3 top-full h-6 w-6 rounded-full bg-[#FFF1EC]"/>
            <span className="absolute -right-3 top-full h-6 w-6 rounded-full bg-[#FFF1EC]"/>
          </div>

          <div className="p-5 flex gap-3 items-center">
            <div className="h-14 w-14 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
              <img src={data.package.image} alt="" className="h-full w-full object-cover"/>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-bold text-neutral-900 truncate">{data.package.name}</p>
              <p className="text-[11.5px] text-neutral-500 mt-0.5 inline-flex items-center gap-1"><Camera className="h-3 w-3"/>{data.package.photographer}</p>
            </div>
          </div>

          <div className="mx-5 border-t border-dashed border-neutral-200"/>

          <div className="p-5 space-y-3">
            <DetailRow Icon={Hash} label="Booking ref" value={data.ref} copyable/>
            <DetailRow Icon={Calendar} label="Date" value={dateLabel}/>
            <DetailRow Icon={Clock} label="Time" value={data.time}/>
          </div>

          <div className="mx-5 border-t border-dashed border-neutral-200"/>

          <div className="p-5 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-neutral-500">Payment</p>
              <p className="mt-1 text-[16px] font-extrabold text-neutral-900">₹{data.grandTotal.toLocaleString()}</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11.5px] font-bold tracking-wide ${paid?"bg-emerald-100 text-emerald-800":"bg-amber-100 text-amber-800"}`}>
              <span className={`h-1.5 w-1.5 rounded-full ${paid?"bg-emerald-600":"bg-amber-600"}`}/>
              {paid?"Paid":"Pay on day"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-5 grid grid-cols-2 gap-2">
          <button onClick={()=>{navigator.clipboard?.writeText(data.ref); toast.success("Reference copied");}}
            className="rounded-2xl bg-white ring-1 ring-neutral-200 py-3 text-[13px] font-bold text-neutral-800 inline-flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition">
            <Copy className="h-4 w-4"/> Copy ref
          </button>
          <button onClick={()=>toast.success("Receipt downloaded")}
            className="rounded-2xl bg-white ring-1 ring-neutral-200 py-3 text-[13px] font-bold text-neutral-800 inline-flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition">
            <Download className="h-4 w-4"/> Download receipt
          </button>
        </div>
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-neutral-200 px-5 py-3.5 z-40">
          <button onClick={()=>navigate("/")}
            className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-rose-800 text-white py-[15px] text-[14.5px] font-bold shadow-lg shadow-rose-800/20 hover:bg-rose-900 active:scale-[0.99] transition-all">
            <HomeIcon className="h-4 w-4"/> Back to home
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ Icon, label, value, copyable }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-9 w-9 rounded-xl bg-rose-50 ring-1 ring-rose-100 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-rose-700" strokeWidth={2.2}/>
      </span>
      <div className="flex-1">
        <p className="text-[11px] font-semibold tracking-[0.15em] uppercase text-neutral-500">{label}</p>
        <p className="text-[13.5px] font-bold text-neutral-900">{value}</p>
      </div>
      {copyable && (
        <button onClick={()=>{navigator.clipboard?.writeText(value); toast.success("Copied");}} className="h-8 w-8 rounded-full hover:bg-neutral-100 flex items-center justify-center">
          <Copy className="h-4 w-4 text-neutral-500"/>
        </button>
      )}
    </div>
  );
}
