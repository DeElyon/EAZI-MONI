import { NextRequest, NextResponse } from 'next/server';
import { getBalance, getTransactions } from '@/lib/bonus';

export async function GET(req: NextRequest) {
  try {
    const userId = req.cookies.get('eazi_user_id')?.value;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [balance, transactions] = await Promise.all([
      getBalance(userId),
      getTransactions(userId),
    ]);

    return NextResponse.json({
      balance,
      claims: transactions.claims,
      payouts: transactions.payouts,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to fetch user balance' }, { status: 500 });
  }
}
