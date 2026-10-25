import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'EAZI MONI — Welcome Bonus & Instant Cashout',
  description: 'Claim welcome bonus of ₦1,350 and daily return bonus of ₦200, then cash out instantly via Paystack.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0f] text-slate-100 min-h-screen flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
