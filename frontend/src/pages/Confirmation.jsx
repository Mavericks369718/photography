import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Calendar, Clock, Hash, Camera, Copy, Home as HomeIcon, Download } from "lucide-react";
import { toast } from "sonner";

export default function Confirmation() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("cm_last_booking");
    const t = setTimeout(() => { setData(raw ? JSON.parse(raw) : null); setLoading(false); }, 600);
    return () => clearTimeout(t);
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
        {/* success burst */}
        <div className="relative px-6 pt-14 pb-10 text-center">
          <div className="relative mx-auto h-24 w-24">
            <span className="absolute inset-0 rounded-full bg-emerald-100 animate-[ping_1.4s_ease-out_1]"/>
            <span className="relative h-24 w-24 rounded-full bg-emerald-500 flex items-center justify-center shadow-[0_12px_30px_rgba(16,185,129,0.35)] ring-8 ring-emerald-100">
              <Check className="h-12 w-12 text-white" strokeWidth={3}/>
            </span>
          </div>
          <p className="mt-6 text-[11px] font-semibold tracking-[0.28em] uppercase text-emerald-700">Booking confirmed</p>
          <h1 className="mt-2 text-[28px] font-extrabold text-neutral-900 leading-[1.1] tracking-[-0.02em]">You&rsquo;re all set.</h1>
          <p className="mt-2 text-[13.5px] text-neutral-500 leading-relaxed">A confirmation has been sent to your mobile.<br/>We&rsquo;ll reach out 24 hrs before the shoot.</p>
        </div>

        {/* Ticket card */}
        <div className="mx-5 rounded-3xl bg-white ring-1 ring-neutral-200 shadow-[0_10px_30px_rgba(0,0,0,0.06)] overflow-hidden">
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
        <div className="px-5 pt-6 grid grid-cols-2 gap-2">
          <button onClick={()=>{navigator.clipboard?.writeText(data.ref); toast.success("Reference copied");}}
            className="rounded-2xl bg-white ring-1 ring-neutral-200 py-3 text-[13px] font-bold text-neutral-800 inline-flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition">
            <Copy className="h-4 w-4"/> Copy ref
          </button>
          <button onClick={()=>toast.success("Receipt downloaded")}
            className="rounded-2xl bg-white ring-1 ring-neutral-200 py-3 text-[13px] font-bold text-neutral-800 inline-flex items-center justify-center gap-1.5 hover:bg-neutral-50 transition">
            <Download className="h-4 w-4"/> Download receipt
          </button>
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
