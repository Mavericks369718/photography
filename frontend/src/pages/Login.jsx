import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Camera } from "lucide-react";
import { toast } from "sonner";

export default function Login() {
  const navigate = useNavigate();
  const [step, setStep] = useState("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(0);
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer <= 0) return;
    const id = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(id);
  }, [timer]);

  const phoneValid = phone.length === 10;

  const sendOtp = () => {
    if (!phoneValid) return;
    setStep("otp");
    setTimer(30);
    toast.success("OTP sent", { description: `Code sent to +91 ${phone}` });
    setTimeout(() => inputsRef.current[0]?.focus(), 100);
  };

  const handleOtpChange = (i, val) => {
    const v = val.replace(/\D/g, "").slice(0, 1);
    const next = [...otp];
    next[i] = v;
    setOtp(next);
    if (v && i < 5) inputsRef.current[i + 1]?.focus();
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) inputsRef.current[i - 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...otp];
    pasted.split("").forEach((ch, idx) => (next[idx] = ch));
    setOtp(next);
    e.preventDefault();
    inputsRef.current[Math.min(pasted.length, 5)]?.focus();
  };

  const verify = () => {
    if (otp.join("").length !== 6) return;
    localStorage.setItem("cm_phone", phone);
    navigate("/onboarding");
  };

  const resend = () => {
    if (timer > 0) return;
    setTimer(30);
    setOtp(["", "", "", "", "", ""]);
    toast.success("OTP resent");
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-[#FFF1EC] flex flex-col overflow-hidden">
        {/* Soft decorative blobs matching Home's cream palette */}
        <div className="pointer-events-none absolute -top-20 -right-24 h-64 w-64 rounded-full bg-rose-200/50 blur-3xl" />
        <div className="pointer-events-none absolute top-40 -left-20 h-56 w-56 rounded-full bg-amber-200/40 blur-3xl" />

        {/* Top bar */}
        <div className="relative z-10 px-6 pt-7 pb-4 flex items-center gap-3">
          {step === "otp" ? (
            <button
              onClick={() => setStep("phone")}
              className="h-10 w-10 -ml-2 rounded-full flex items-center justify-center hover:bg-white/70 transition-colors"
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5 text-neutral-900" strokeWidth={2.2} />
            </button>
          ) : (
            <div className="h-10 w-10 rounded-xl bg-white ring-1 ring-rose-100 shadow-sm flex items-center justify-center">
              <Camera className="h-5 w-5 text-rose-700" strokeWidth={2.2} />
            </div>
          )}
          <span className="text-[13px] font-semibold tracking-[0.22em] uppercase text-neutral-900">
            Corporate<span className="text-rose-700">Moments</span>
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col px-6 pt-10">
          {step === "phone" ? (
            <>
              <p className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-rose-700">
                Welcome
              </p>
              <h1 className="mt-2 text-[38px] font-extrabold text-neutral-900 leading-[1.02] tracking-[-0.025em]">
                Let&rsquo;s get<br />you in.
              </h1>
              <p className="mt-3 text-[14.5px] text-neutral-600 leading-relaxed max-w-[92%]">
                Enter your mobile number and we&rsquo;ll send a one-time code to verify.
              </p>

              <div className="mt-10 rounded-2xl bg-white/80 backdrop-blur-sm ring-1 ring-black/5 shadow-[0_6px_24px_rgba(0,0,0,0.05)] p-5">
                <label className="text-[11px] font-semibold text-neutral-500 uppercase tracking-[0.18em]">
                  Mobile number
                </label>
                <div className="mt-3 flex items-center">
                  <span className="text-[22px] font-bold text-neutral-900 pr-3">+91</span>
                  <span className="h-7 w-px bg-neutral-200 mr-3" />
                  <input
                    autoFocus
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="00000 00000"
                    className="flex-1 bg-transparent outline-none text-[22px] font-bold text-neutral-900 tracking-wide placeholder:text-neutral-300 placeholder:font-medium"
                  />
                </div>
              </div>

              <button
                disabled={!phoneValid}
                onClick={sendOtp}
                className={`mt-auto mb-10 w-full inline-flex items-center justify-center gap-2 rounded-full py-[18px] text-[15px] font-bold transition-all ${
                  phoneValid
                    ? "bg-rose-800 text-white shadow-[0_10px_24px_rgba(159,18,57,0.25)] hover:bg-rose-900 hover:-translate-y-0.5"
                    : "bg-white/70 text-neutral-400 ring-1 ring-neutral-200 cursor-not-allowed"
                }`}
              >
                Send OTP
                {phoneValid && <ArrowRight className="h-4 w-4" />}
              </button>
            </>
          ) : (
            <>
              <p className="text-[11.5px] font-semibold tracking-[0.2em] uppercase text-rose-700">
                Verify
              </p>
              <h1 className="mt-2 text-[38px] font-extrabold text-neutral-900 leading-[1.02] tracking-[-0.025em]">
                Enter the<br />6-digit code.
              </h1>
              <p className="mt-3 text-[14.5px] text-neutral-600 leading-relaxed">
                Sent to <span className="font-bold text-neutral-900">+91 {phone}</span>
              </p>

              <div
                className="mt-10 flex gap-2.5 justify-between"
                onPaste={handlePaste}
              >
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={`w-12 h-14 text-center text-[22px] font-bold text-neutral-900 rounded-xl bg-white ring-1 shadow-sm transition-all outline-none ${
                      d
                        ? "ring-2 ring-rose-700"
                        : "ring-neutral-200 focus:ring-2 focus:ring-rose-700"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 text-[13.5px] text-neutral-600">
                Didn&rsquo;t get it?{" "}
                <button
                  onClick={resend}
                  disabled={timer > 0}
                  className={`font-bold ${
                    timer > 0
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-rose-700 underline underline-offset-4 hover:text-rose-900"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend OTP"}
                </button>
              </div>

              <button
                disabled={otp.join("").length !== 6}
                onClick={verify}
                className={`mt-auto mb-10 w-full inline-flex items-center justify-center gap-2 rounded-full py-[18px] text-[15px] font-bold transition-all ${
                  otp.join("").length === 6
                    ? "bg-rose-800 text-white shadow-[0_10px_24px_rgba(159,18,57,0.25)] hover:bg-rose-900 hover:-translate-y-0.5"
                    : "bg-white/70 text-neutral-400 ring-1 ring-neutral-200 cursor-not-allowed"
                }`}
              >
                Verify
                {otp.join("").length === 6 && <ArrowRight className="h-4 w-4" />}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
