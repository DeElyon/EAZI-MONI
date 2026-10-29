'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, ShieldCheck, Zap, ArrowRight, MessageSquare, CheckCircle2, ChevronDown, Sparkles, Building2 } from 'lucide-react';

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

export default function LandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#0a0a0f]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-black font-extrabold shadow-lg shadow-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              EAZI MONI
            </span>
          </div>
          <Link
            href="/login"
            className="px-5 py-2.5 text-xs font-bold text-black bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 rounded-xl shadow-md transition-all"
          >
            Claim Bonus
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-16 flex-1 flex flex-col items-center justify-center text-center relative">
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="w-[350px] h-[350px] bg-teal-500/10 rounded-full blur-[110px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-semibold mb-8 shadow-inner"
        >
          <Sparkles className="w-4 h-4" />
          <span>₦1,350 Welcome Bonus + ₦200 Daily Return</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-[1.15]"
        >
          Free Cash Bonuses Sent Straight To Your Bank
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base sm:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed"
        >
          Login via WhatsApp OTP, claim your ₦1,350 instant welcome bonus, collect ₦200 daily return bonus, and withdraw straight to any Nigerian bank via Paystack.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold rounded-2xl shadow-xl shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-base sm:text-lg"
          >
            <MessageSquare className="w-5 h-5 fill-black" />
            Claim ₦1,350 On WhatsApp
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl w-fit mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant ₦1,350 Welcome</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Sign up with your WhatsApp phone number and receive your welcome bonus credited instantly.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="p-3 bg-teal-500/10 border border-teal-500/20 text-teal-400 rounded-2xl w-fit mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">₦200 Daily Return Bonus</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Visit your dashboard every 24 hours to claim an extra ₦200 bonus added to your available cashout.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl w-fit mb-4">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Bank Cashout</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Transfer accumulated balances directly to GTBank, Access, Zenith, OPay, PalmPay, or any NUBAN bank.
            </p>
          </div>
        </div>

        {/* FAQ Accordion */}
        <section className="mt-24 w-full max-w-3xl text-left">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {FAQS.map((faq, idx) => (
              <div
                key={idx}
                className="bg-slate-900/50 border border-slate-800 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-5 text-left font-semibold text-white flex justify-between items-center gap-4 text-base"
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
                      className="px-6 pb-5 text-slate-400 text-sm leading-relaxed"
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
      <footer className="border-t border-slate-800/80 py-6 text-center text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} EAZI MONI. Practice build for lab evaluation.</p>
      </footer>
    </div>
  );
}
