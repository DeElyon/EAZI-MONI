import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getBalance } from '@/lib/bonus';

export async function POST(req: NextRequest) {
  try {
    const userIdCookie = req.cookies.get('eazi_user_id')?.value;
    const body = await req.json();
    const userId = body.userId || userIdCookie;
    const { bankCode, accountNumber, amount } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: User ID missing' }, { status: 401 });
    }

    if (!bankCode || !accountNumber || !amount) {
      return NextResponse.json({ error: 'Bank code, account number, and amount are required' }, { status: 400 });
    }

    // Check available balance
    const currentBalance = await getBalance(userId);
    if (amount > currentBalance) {
      return NextResponse.json({ error: 'Insufficient balance for cashout' }, { status: 400 });
    }

    // Mock / Real Paystack Transfer logic
    let recipientCode = `RCP_${Math.random().toString(36).substring(2, 10)}`;

    if (process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.includes('mock')) {
      // 1. Create transfer recipient
      const recipientRes = await fetch('https://api.paystack.co/transferrecipient', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'nuban',
          name: 'EAZI MONI User',
          account_number: accountNumber,
          bank_code: bankCode,
          currency: 'NGN',
        }),
      });

      const recipientData = await recipientRes.json();
      if (!recipientData.status) {
        return NextResponse.json({ error: recipientData.message }, { status: 400 });
      }
      recipientCode = recipientData.data.recipient_code;
    }

    // 2. Initiate transfer
    const reference = `eazi_${userId}_${Date.now()}`;

    if (process.env.PAYSTACK_SECRET_KEY && !process.env.PAYSTACK_SECRET_KEY.includes('mock')) {
      const transferRes = await fetch('https://api.paystack.co/transfer', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'balance',
          amount,
          recipient: recipientCode,
          reason: 'EAZI MONI cashout',
          reference,
        }),
      });

      const transferData = await transferRes.json();
      if (!transferData.status) {
        return NextResponse.json({ error: transferData.message }, { status: 400 });
      }
    }

    // 3. Record payout
    const payout = await prisma.payout.create({
      data: {
        userId,
        amount,
        recipientCode,
        reference,
        status: process.env.PAYSTACK_SECRET_KEY?.includes('mock') ? 'success' : 'pending',
      },
    });

    return NextResponse.json({ success: true, reference, payout });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Cashout transfer failed' }, { status: 500 });
  }
}
