'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageSquare, ArrowRight, ShieldCheck, Loader2, RotateCcw, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    let interval: any = null;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setLoading(true);

    let cleanPhone = phone.trim();
    if (!cleanPhone.startsWith('+')) {
      cleanPhone = cleanPhone.startsWith('0')
        ? `+234${cleanPhone.slice(1)}`
        : `+234${cleanPhone}`;
    }

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: cleanPhone }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to send OTP');
      }

      setPhone(cleanPhone);
      setStep('otp');
      setTimer(30);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      setError('Please enter complete 6-digit OTP');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: otpCode }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Invalid OTP');
      }

      // Claim welcome bonus on verification
      await fetch('/api/bonus/welcome', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: data.userId }),
      });

      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060609] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <Link href="/" className="mb-8 font-black text-3xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent">
        EAZI MONI
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step === 'phone' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'}`}>1</span>
            <span className="text-xs font-bold text-slate-300">WhatsApp Phone</span>
          </div>
          <div className="w-8 h-[1px] bg-slate-800" />
          <div className="flex items-center gap-2">
            <span className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center ${step === 'otp' ? 'bg-emerald-500 text-black' : 'bg-slate-800 text-slate-400'}`}>2</span>
            <span className="text-xs font-bold text-slate-300">Verify OTP</span>
          </div>
        </div>

        {step === 'phone' ? (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">WhatsApp Verification</h2>
                <p className="text-slate-400 text-xs">Claim your ₦1,350 instant welcome credit</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Nigerian WhatsApp Phone Number
                </label>
                <div className="flex items-center rounded-xl bg-slate-950/80 border border-slate-800 focus-within:border-emerald-500 transition-colors">
                  <span className="px-4 text-slate-400 font-bold border-r border-slate-800 text-sm flex items-center gap-1.5">
                    🇳🇬 +234
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="801 234 5678"
                    className="w-full bg-transparent px-4 py-3.5 text-white focus:outline-none text-base font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Instant welcome bonus automatically added on sign in</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    Send WhatsApp OTP
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Enter 6-Digit Code</h2>
                <p className="text-slate-400 text-xs">Sent via WhatsApp to {phone}</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div className="flex justify-between gap-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-12 h-14 bg-slate-950 border border-slate-800 rounded-xl text-center text-xl font-black text-white focus:border-emerald-500 focus:outline-none transition-colors shadow-inner"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Verify & Claim ₦1,350'
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="hover:text-white transition-colors"
                >
                  Change phone number
                </button>

                {timer > 0 ? (
                  <span>Resend in {timer}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleSendOtp()}
                    disabled={loading}
                    className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Resend OTP
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
