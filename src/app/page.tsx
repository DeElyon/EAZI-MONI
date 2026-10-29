'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Zap, ArrowRight, MessageSquare, CheckCircle2, ChevronDown, Sparkles, Building2, TrendingUp, Users, Lock, ChevronRight } from 'lucide-react';

const FAQS = [
  {
    q: 'How do I claim my ₦1,350 welcome bonus?',
    a: 'Simply enter your WhatsApp phone number on the login page. We will send a 6-digit OTP code directly to your WhatsApp. Once verified, your ₦1,350 welcome bonus is instantly credited to your balance.',
  },
  {
    q: 'How does the ₦200 daily return bonus work?',
    a: 'Every 24 hours, you can visit your EAZI MONI dashboard and click "Claim ₦200 Daily Return Bonus". The bonus is instantly added to your available cashout balance.',
  },
  {
    q: 'How fast are bank cashout transfers?',
    a: 'Cashouts are processed immediately via Paystack Transfer API directly into any registered Nigerian bank account including GTBank, Access, Zenith, OPay, and PalmPay.',
  },
];

const STEPS = [
  {
    step: '01',
    title: 'Enter WhatsApp Number',
    desc: 'Input your phone number to receive instant 6-digit OTP via official Meta WhatsApp API.',
  },
  {
    step: '02',
    title: 'Verify & Claim ₦1,350',
    desc: 'Verify OTP code to automatically activate your account and claim ₦1,350 welcome bonus.',
  },
  {
    step: '03',
    title: 'Cash Out To Any Bank',
    desc: 'Enter your NUBAN account number and cash out instantly via Paystack Transfer API.',
  },
];

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#060609] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Top Banner Ticker */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 py-2.5 px-4 text-center text-black text-xs font-black tracking-wide flex items-center justify-center gap-2 shadow-md">
        <Sparkles className="w-4 h-4 fill-black" />
        <span>SPECIAL PROMO: CLAIM ₦1,350 WELCOME BONUS + ₦200 DAILY RETURN BONUS</span>
        <Sparkles className="w-4 h-4 fill-black" />
      </div>

      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-50 bg-[#060609]/80">
        <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2.5 rounded-2xl text-black font-extrabold shadow-lg shadow-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <span className="font-black text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-400 bg-clip-text text-transparent block leading-none">
                EAZI MONI
              </span>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Instant Cash Out</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-5 py-2.5 text-xs font-extrabold text-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 hover:opacity-90 rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-1.5"
            >
              Get Started <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center relative">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none animate-pulse-slow" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-bold mb-8 glow-emerald"
        >
          <Zap className="w-4 h-4 fill-emerald-400" />
          <span>Meta WhatsApp OTP Authentication Supported</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-7xl font-black tracking-tight max-w-4xl leading-[1.1] text-white"
        >
          Claim <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 bg-clip-text text-transparent">₦1,350 Free Bonus</span> & Cash Out Instantly
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
        >
          Verify your phone via WhatsApp OTP, receive ₦1,350 instant welcome credit, claim ₦200 every 24 hours, and transfer straight to any Nigerian bank via Paystack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="w-full sm:w-auto px-9 py-4.5 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black font-black rounded-2xl shadow-2xl shadow-emerald-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center gap-3 text-base sm:text-lg"
          >
            <MessageSquare className="w-5 h-5 fill-black" />
            Claim ₦1,350 Welcome Bonus
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 w-full max-w-4xl">
          <div className="glass-card p-5 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">₦1,350</span>
            <p className="text-xs text-slate-400 font-medium mt-1">Welcome Bonus</p>
          </div>
          <div className="glass-card p-5 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-teal-400">₦200</span>
            <p className="text-xs text-slate-400 font-medium mt-1">Daily Return</p>
          </div>
          <div className="glass-card p-5 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-white">Instant</span>
            <p className="text-xs text-slate-400 font-medium mt-1">Paystack Cashout</p>
          </div>
          <div className="glass-card p-5 rounded-2xl text-center">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400">WhatsApp</span>
            <p className="text-xs text-slate-400 font-medium mt-1">OTP Verification</p>
          </div>
        </div>

        {/* How It Works Section */}
        <section className="mt-28 w-full max-w-5xl text-left">
          <div className="text-center mb-12">
            <span className="text-xs font-black text-emerald-400 uppercase tracking-widest bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Simple 3-Step Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white mt-3">How EAZI MONI Works</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="glass-card glass-card-hover p-8 rounded-3xl relative">
                <span className="text-5xl font-black text-slate-800 block mb-4">{s.step}</span>
                <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mt-28 w-full max-w-3xl text-left">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-black text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left font-bold text-white flex justify-between items-center gap-4 text-base"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform ${
                      openFaq === idx ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === idx && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800/50 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-8 text-center text-slate-500 text-xs bg-[#060609]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secured via Paystack & Meta WhatsApp Graph API</span>
          </div>
          <p>© {new Date().getFullYear()} EAZI MONI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
