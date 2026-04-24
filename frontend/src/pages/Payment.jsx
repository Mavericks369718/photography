import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CreditCard, Smartphone, Wallet, Landmark, Banknote, ShieldCheck, Lock } from "lucide-react";

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

const ONLINE_METHODS = [
  { id: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm", Icon: Smartphone, color: "bg-violet-50 text-violet-700" },
  { id: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, Rupay", Icon: CreditCard, color: "bg-blue-50 text-blue-700" },
  { id: "netbank", label: "Net Banking", desc: "All major banks", Icon: Landmark, color: "bg-emerald-50 text-emerald-700" },
  { id: "wallet", label: "Wallets", desc: "Amazon Pay, Mobikwik", Icon: Wallet, color: "bg-amber-50 text-amber-700" },
];

export default function Payment() {
  const navigate = useNavigate();
  const booking = JSON.parse(localStorage.getItem("cm_booking") || "null");
  const [mode, setMode] = useState("online"); // online | later
  const [method, setMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [err, setErr] = useState("");

  if (!booking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF1EC]">
        <div className="text-center">
          <p className="text-neutral-700 mb-3">No active booking found.</p>
          <button onClick={()=>navigate("/booking")} className="rounded-full bg-rose-800 text-white px-5 py-2 text-sm font-bold">Start booking</button>
        </div>
      </div>
    );
  }

  const dateObj = new Date(booking.date);
  const dateLabel = dateObj.toLocaleDateString("en-IN", { weekday:"short", day:"2-digit", month:"short", year:"numeric" });
  const gst = Math.round(booking.total * 0.18);
  const platformFee = 99;
  const grandTotal = booking.total + gst + platformFee;

  const confirm = () => {
    setErr("");
    if (mode === "online" && !method) { setErr("Please select a payment method"); return; }
    setProcessing(true);
    setTimeout(() => {
      const ref = "CM" + Math.random().toString(36).slice(2,8).toUpperCase();
      const payload = { ...booking, ref, grandTotal, paymentMode: mode, paymentMethod: mode==="online"?method:null, paidAt: new Date().toISOString() };
      localStorage.setItem("cm_last_booking", JSON.stringify(payload));
      localStorage.removeItem("cm_booking");
      navigate("/confirmation");
    }, 1400);
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col pb-28">
        <div className="relative h-[230px] w-full overflow-hidden">
          <img src={booking.package.image} alt="" className="absolute inset-0 h-full w-full object-cover scale-[1.03]"/>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70"/>
          <div className="absolute top-0 left-0 right-0 z-10 px-5 pt-6 flex items-center justify-between">
            <button onClick={()=>navigate(-1)} className="h-10 w-10 -ml-2 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-sm hover:bg-white transition">
              <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2}/>
            </button>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur ring-1 ring-white/25 px-2.5 py-1 text-[10px] font-semibold tracking-[0.22em] uppercase text-white">Step 2 / 3</span>
          </div>
          <div className="absolute z-10 bottom-0 left-0 right-0 px-6 pb-6">
            <span className="text-white/85 text-[11px] font-semibold tracking-[0.24em] uppercase">Checkout</span>
            <h1 className="mt-1.5 text-white text-[30px] leading-[1.02] tracking-[-0.025em] drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]" style={{fontWeight:800}}>
              Review &amp; <span style={{fontFamily:"'Fraunces',serif",fontWeight:500,fontStyle:"italic"}} className="text-rose-200">pay.</span>
            </h1>
          </div>
        </div>

        <div className="relative -mt-5 bg-white rounded-t-[28px] px-5 pt-5 pb-6 shadow-[0_-10px_30px_rgba(0,0,0,0.06)] flex-1">

        {/* Summary */}
        <div className="rounded-2xl bg-[#FFF7F3] ring-1 ring-rose-100 p-5">
          <div className="flex gap-3">
            <div className="h-16 w-16 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
              <img src={booking.package.image} alt="" className="h-full w-full object-cover"/>
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-bold text-neutral-900 leading-tight">{booking.package.name}</p>
              <p className="text-[12px] text-neutral-500 mt-0.5">{booking.package.photographer}</p>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 space-y-2">
            <Row label="Date" value={dateLabel}/>
            <Row label="Time" value={booking.time}/>
            <Row label="Duration" value={booking.package.duration}/>
          </div>
          <div className="mt-4 pt-4 border-t border-dashed border-neutral-200 space-y-1.5 text-[13px]">
            <div className="flex justify-between text-neutral-600"><span>Package price</span><span>₹{booking.total.toLocaleString()}</span></div>
            <div className="flex justify-between text-neutral-600"><span>GST (18%)</span><span>₹{gst.toLocaleString()}</span></div>
            <div className="flex justify-between text-neutral-600"><span>Platform fee</span><span>₹{platformFee}</span></div>
            <div className="flex justify-between mt-2 pt-2 border-t border-neutral-100"><span className="text-[14px] font-bold text-neutral-900">Total payable</span><span className="text-[16px] font-extrabold text-neutral-900">₹{grandTotal.toLocaleString()}</span></div>
          </div>
        </div>

        {/* Payment mode switch */}
        <div className="mt-5">
          <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-rose-700 mb-3">Payment</p>
          <div className="grid grid-cols-2 gap-2">
            <ModeBtn active={mode==="online"} onClick={()=>setMode("online")} label="Pay Online" sub="Secure · Instant" Icon={ShieldCheck}/>
            <ModeBtn active={mode==="later"} onClick={()=>setMode("later")} label="Pay Later" sub="Cash on day" Icon={Banknote}/>
          </div>
        </div>

        {mode === "online" ? (
          <div className="mt-4 rounded-2xl bg-white ring-1 ring-neutral-200 overflow-hidden">
            <div className="px-4 py-3 bg-neutral-50 flex items-center gap-2 border-b border-neutral-200">
              <Lock className="h-3.5 w-3.5 text-neutral-500"/>
              <span className="text-[11.5px] font-semibold text-neutral-600 tracking-wide">Razorpay secure gateway</span>
            </div>
            {ONLINE_METHODS.map((m, idx) => {
              const sel = method === m.id;
              return (
                <button key={m.id} onClick={()=>setMethod(m.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left transition-colors ${idx>0?"border-t border-neutral-100":""} ${sel?"bg-rose-50/50":"hover:bg-neutral-50"}`}>
                  <span className={`h-10 w-10 rounded-xl ${m.color} flex items-center justify-center`}>
                    <m.Icon className="h-5 w-5" strokeWidth={2.1}/>
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13.5px] font-bold text-neutral-900">{m.label}</p>
                    <p className="text-[11.5px] text-neutral-500">{m.desc}</p>
                  </div>
                  <span className={`h-5 w-5 rounded-full border-2 transition-all ${sel?"border-rose-800 bg-rose-800":"border-neutral-300"}`}>
                    {sel && <span className="block h-2 w-2 rounded-full bg-white mx-auto mt-[5px]"/>}
                  </span>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="mt-4 rounded-2xl bg-amber-50 ring-1 ring-amber-200 p-4 flex gap-3">
            <Banknote className="h-5 w-5 text-amber-700 shrink-0 mt-0.5"/>
            <div>
              <p className="text-[13.5px] font-bold text-amber-900">Pay cash on the shoot day</p>
              <p className="text-[12px] text-amber-800 mt-0.5 leading-snug">Hand over ₹{grandTotal.toLocaleString()} directly to your photographer. A confirmation call will be made 24 hrs before.</p>
            </div>
          </div>
        )}

        {err && <p className="mt-3 text-[12px] text-red-600 font-semibold">{err}</p>}
        </div>

        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] bg-white/95 backdrop-blur border-t border-neutral-200 px-5 py-3.5 z-40">
          <button onClick={confirm} disabled={processing}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-full py-[15px] text-[14.5px] font-bold transition-all ${processing?"bg-neutral-900 text-white/80 cursor-wait":"bg-rose-800 text-white shadow-lg shadow-rose-800/20 hover:bg-rose-900 active:scale-[0.99]"}`}>
            {processing ? (<><span className="h-4 w-4 rounded-full border-2 border-white/40 border-t-white animate-spin"/> Processing…</>) : (<>Confirm booking · ₹{grandTotal.toLocaleString()}</>)}
          </button>
          <p className="mt-2 text-center text-[10.5px] text-neutral-400">100% secure. Cancel free up to 48 hrs before.</p>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex justify-between text-[13px]">
      <span className="text-neutral-500">{label}</span>
      <span className="font-bold text-neutral-900">{value}</span>
    </div>
  );
}

function ModeBtn({ active, onClick, label, sub, Icon }) {
  return (
    <button onClick={onClick}
      className={`rounded-2xl p-4 text-left ring-1 transition-all ${active?"bg-white ring-rose-800 shadow-md":"bg-white/60 ring-neutral-200 hover:ring-neutral-300"}`}>
      <Icon className={`h-5 w-5 ${active?"text-rose-700":"text-neutral-500"}`} strokeWidth={2.2}/>
      <p className={`mt-1.5 text-[14px] font-bold ${active?"text-rose-800":"text-neutral-900"}`}>{label}</p>
      <p className="text-[11.5px] text-neutral-500">{sub}</p>
    </button>
  );
}
