'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Wallet, ShieldCheck, Zap, ArrowRight, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-black">
      {/* Header */}
      <header className="border-b border-slate-800/80 backdrop-blur-md sticky top-0 z-50 bg-[#0a0a0f]/80">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-emerald-500 to-teal-400 p-2 rounded-xl text-black font-extrabold shadow-lg shadow-emerald-500/20">
              <Wallet className="w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-emerald-400 bg-clip-text text-transparent">
              EAZI MONI
            </span>
          </div>
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition-colors"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-5xl mx-auto px-6 py-20 flex-1 flex flex-col items-center justify-center text-center relative">
        <div className="absolute inset-0 -z-10 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px]" />
          <div className="w-[300px] h-[300px] bg-teal-500/10 rounded-full blur-[100px]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-sm font-medium mb-8"
        >
          <Zap className="w-4 h-4" />
          <span>Claim ₦1,350 Instant Welcome Bonus</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-3xl leading-tight"
        >
          Get Free Money Daily & Cash Out Straight to Your Bank
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-slate-400 max-w-2xl"
        >
          Instant WhatsApp OTP verification. Claim ₦1,350 welcome bonus plus ₦200 daily return bonus, then transfer directly to any Nigerian bank.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-black font-bold rounded-xl shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg"
          >
            <MessageSquare className="w-5 h-5 fill-black" />
            Claim ₦1,350 via WhatsApp
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit mb-4">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant ₦1,350 Bonus</h3>
            <p className="text-slate-400 text-sm">
              Sign up with your WhatsApp phone number and receive your welcome bonus credited instantly.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">₦200 Daily Return Bonus</h3>
            <p className="text-slate-400 text-sm">
              Come back every 24 hours to collect an extra ₦200 bonus directly added to your balance.
            </p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl backdrop-blur-xl hover:border-slate-700 transition-colors">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl w-fit mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Instant Paystack Cashout</h3>
            <p className="text-slate-400 text-sm">
              Transfer your money to GTBank, Access, Zenith, OPay, Palmpay, or any Nigerian bank account.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-slate-500 text-xs">
        <p>© {new Date().getFullYear()} EAZI MONI. Practice build for lab evaluation.</p>
      </footer>
    </div>
  );
}
