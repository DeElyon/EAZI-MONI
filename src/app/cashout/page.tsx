'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Building2, CreditCard, CheckCircle2, Loader2, ShieldCheck, Search, Receipt } from 'lucide-react';

const NIGERIAN_BANKS = [
  { code: '044', name: 'Access Bank' },
  { code: '011', name: 'First Bank of Nigeria' },
  { code: '058', name: 'GTBank (Guaranty Trust)' },
  { code: '070', name: 'Fidelity Bank' },
  { code: '214', name: 'FCMB' },
  { code: '033', name: 'United Bank For Africa (UBA)' },
  { code: '057', name: 'Zenith Bank' },
  { code: '999991', name: 'OPay' },
  { code: '999992', name: 'PalmPay' },
  { code: '50515', name: 'Moniepoint Microfinance Bank' },
  { code: '035a', name: 'ALAT by WEMA' },
];

export default function CashoutPage() {
  const router = useRouter();
  const [bankCode, setBankCode] = useState('058');
  const [accountNumber, setAccountNumber] = useState('');
  const [amount, setAmount] = useState('1350');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const filteredBanks = NIGERIAN_BANKS.filter((b) =>
    b.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBankName = NIGERIAN_BANKS.find((b) => b.code === bankCode)?.name || 'Nigerian Bank';

  const handleCashout = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (accountNumber.trim().length !== 10) {
      setError('Please enter a valid 10-digit NUBAN account number');
      setLoading(false);
      return;
    }

    try {
      const amountInKobo = Math.round(parseFloat(amount) * 100);

      const res = await fetch('/api/paystack/cashout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bankCode,
          accountNumber,
          amount: amountInKobo,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Cashout transfer failed');
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060609] text-slate-100 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[130px] pointer-events-none" />

      <Link href="/dashboard" className="mb-6 flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition-colors bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl">
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md glass-card rounded-3xl p-8 shadow-2xl relative z-10"
      >
        {success ? (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-6 glow-emerald">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-white mb-2">Cashout Transfer Successful!</h2>
            <p className="text-slate-400 text-xs mb-6">
              Receipt reference generated via Paystack Transfer API
            </p>

            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 text-left space-y-3 mb-6 text-xs">
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 font-medium">Amount:</span>
                <span className="text-emerald-400 font-black text-sm">₦{parseFloat(amount).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-slate-800/80 pb-2">
                <span className="text-slate-400 font-medium">Bank:</span>
                <span className="text-white font-bold">{selectedBankName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">NUBAN:</span>
                <span className="text-white font-mono font-bold">{accountNumber}</span>
              </div>
            </div>

            <button
              onClick={() => router.push('/dashboard')}
              className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-300 transition-all text-sm"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Cash Out To Bank</h2>
                <p className="text-slate-400 text-xs">Paystack NUBAN Direct Transfer</p>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3.5 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl font-medium">
                {error}
              </div>
            )}

            <form onSubmit={handleCashout} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Select Nigerian Bank
                </label>
                <div className="space-y-2">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Filter bank..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:border-emerald-500 focus:outline-none"
                    />
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-3" />
                  </div>

                  <select
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:border-emerald-500 focus:outline-none text-sm font-semibold"
                  >
                    {filteredBanks.map((b) => (
                      <option key={b.code} value={b.code}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  10-Digit NUBAN Account Number
                </label>
                <input
                  type="text"
                  maxLength={10}
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="0123456789"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 focus:outline-none text-base font-mono font-bold tracking-wider"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Amount To Withdraw (₦)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-emerald-500 focus:outline-none text-base font-black"
                  required
                />
              </div>

              <div className="p-3.5 bg-slate-950/80 border border-slate-800/80 rounded-xl flex items-center gap-2.5 text-xs text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Encrypted Paystack Transfer API Pipeline</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-black font-extrabold rounded-xl shadow-lg shadow-emerald-500/20 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  'Confirm & Transfer'
                )}
              </button>
            </form>
          </div>
        )}
      </motion.div>
    </div>
  );
}
