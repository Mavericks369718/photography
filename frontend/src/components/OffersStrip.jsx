import React from "react";
import { offers } from "../mock";
import { Ticket, Copy } from "lucide-react";
import { toast } from "sonner";

export default function OffersStrip() {
  const copy = (code) => {
    navigator.clipboard?.writeText(code);
    toast.success(`Coupon ${code} copied!`, {
      description: "Paste at checkout to redeem."
    });
  };

  return (
    <section className="px-5 pb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[20px] font-bold text-neutral-900 tracking-tight">
          Offers & Deals
        </h2>
        <button className="text-[12px] font-semibold text-rose-700">View all</button>
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-1 px-1">
        {offers.map((o) => (
          <div
            key={o.id}
            className={`min-w-[240px] max-w-[240px] rounded-2xl bg-gradient-to-br ${o.bg} p-4 ring-1 ring-black/5 shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className={`h-8 w-8 rounded-xl bg-white/70 ring-1 ring-white flex items-center justify-center shadow-sm`}>
                <Ticket className={`h-4 w-4 ${o.accent}`} />
              </span>
              <h3 className="text-[14px] font-bold text-neutral-900">{o.title}</h3>
            </div>
            <p className="text-[12px] text-neutral-700 leading-snug min-h-[32px]">{o.desc}</p>
            <button
              onClick={() => copy(o.code)}
              className="mt-2 flex w-full items-center justify-between rounded-lg bg-white/80 backdrop-blur px-2.5 py-1.5 text-[12px] font-semibold text-neutral-800 ring-1 ring-dashed ring-neutral-300 hover:bg-white transition-colors"
            >
              <span className="font-mono tracking-wider">{o.code}</span>
              <Copy className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
