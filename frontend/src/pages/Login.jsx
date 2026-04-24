import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { toast } from "sonner";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1554080353-a576cf803bda?w=1400&q=85";

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
    toast.success("Code sent", { description: `+91 ${phone}` });
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
    toast.success("Code resent");
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="min-h-screen w-full bg-neutral-100 flex justify-center">
      <div className="relative w-full max-w-[480px] min-h-screen bg-white flex flex-col">
        {/* Editorial photograph — top third */}
        <div className="relative h-[300px] w-full overflow-hidden bg-neutral-900">
          <img
            src={HERO_IMAGE}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white" />

          {/* Top bar over image */}
          <div className="relative z-10 px-6 pt-6 flex items-center justify-between">
            {step === "otp" ? (
              <button
                onClick={() => setStep("phone")}
                className="h-9 w-9 -ml-1.5 rounded-full bg-white/90 backdrop-blur flex items-center justify-center hover:bg-white transition-colors"
                aria-label="Back"
              >
                <ArrowLeft className="h-4 w-4 text-neutral-900" strokeWidth={2.2} />
              </button>
            ) : (
              <span className="text-[11px] font-semibold tracking-[0.28em] uppercase text-white">
                Corporate<span className="opacity-70">Moments</span>
              </span>
            )}
            <span className="text-[10px] font-medium tracking-[0.25em] uppercase text-white/70">
              Est. 2025
            </span>
          </div>
        </div>

        {/* Content area */}
        <div className="relative z-10 -mt-8 flex-1 flex flex-col px-7">
          {step === "phone" ? (
            <>
              <div className="mb-1 inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-neutral-900" />
                <span className="text-[10.5px] font-semibold tracking-[0.24em] uppercase text-neutral-900">
                  Sign in
                </span>
              </div>
              <h1 className="mt-3 text-[36px] font-extrabold text-neutral-900 leading-[1.02] tracking-[-0.028em]">
                Your moments,<br />booked in minutes.
              </h1>
              <p className="mt-3 text-[14px] text-neutral-500 leading-relaxed">
                Continue with your mobile number.
              </p>

              <div className="mt-10">
                <label className="block text-[10.5px] font-semibold text-neutral-500 uppercase tracking-[0.22em]">
                  Mobile
                </label>
                <div className="mt-3 flex items-center gap-3 border-b border-neutral-300 focus-within:border-neutral-900 transition-colors pb-2">
                  <span className="text-[20px] font-semibold text-neutral-900">+91</span>
                  <input
                    autoFocus
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    placeholder="98765 43210"
                    className="flex-1 bg-transparent outline-none text-[20px] font-semibold text-neutral-900 tracking-wide placeholder:text-neutral-300 placeholder:font-normal"
                  />
                </div>
              </div>

              <button
                disabled={!phoneValid}
                onClick={sendOtp}
                className={`mt-auto mb-8 w-full inline-flex items-center justify-center gap-2 rounded-full py-[17px] text-[14.5px] font-semibold transition-all ${
                  phoneValid
                    ? "bg-neutral-900 text-white hover:bg-black"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
                }`}
              >
                Send code
                {phoneValid && <ArrowRight className="h-4 w-4" />}
              </button>
            </>
          ) : (
            <>
              <div className="mb-1 inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-neutral-900" />
                <span className="text-[10.5px] font-semibold tracking-[0.24em] uppercase text-neutral-900">
                  Verify
                </span>
              </div>
              <h1 className="mt-3 text-[36px] font-extrabold text-neutral-900 leading-[1.02] tracking-[-0.028em]">
                Enter the<br />6-digit code.
              </h1>
              <p className="mt-3 text-[14px] text-neutral-500 leading-relaxed">
                Sent to <span className="font-semibold text-neutral-900">+91 {phone}</span>
              </p>

              <div className="mt-10 grid grid-cols-6 gap-2" onPaste={handlePaste}>
                {otp.map((d, i) => (
                  <input
                    key={i}
                    ref={(el) => (inputsRef.current[i] = el)}
                    value={d}
                    onChange={(e) => handleOtpChange(i, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(i, e)}
                    inputMode="numeric"
                    maxLength={1}
                    className={`h-14 text-center text-[22px] font-bold text-neutral-900 bg-white border-b-2 transition-colors outline-none ${
                      d ? "border-neutral-900" : "border-neutral-200 focus:border-neutral-900"
                    }`}
                  />
                ))}
              </div>

              <div className="mt-6 text-[13px] text-neutral-500">
                Didn&rsquo;t receive it?{" "}
                <button
                  onClick={resend}
                  disabled={timer > 0}
                  className={`font-semibold ${
                    timer > 0
                      ? "text-neutral-400 cursor-not-allowed"
                      : "text-neutral-900 underline underline-offset-[5px] decoration-[1.5px]"
                  }`}
                >
                  {timer > 0 ? `Resend in ${timer}s` : "Resend"}
                </button>
              </div>

              <button
                disabled={otp.join("").length !== 6}
                onClick={verify}
                className={`mt-auto mb-8 w-full inline-flex items-center justify-center gap-2 rounded-full py-[17px] text-[14.5px] font-semibold transition-all ${
                  otp.join("").length === 6
                    ? "bg-neutral-900 text-white hover:bg-black"
                    : "bg-neutral-100 text-neutral-400 cursor-not-allowed"
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
