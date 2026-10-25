import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, amount, userId } = await req.json();

    if (!email || !amount) {
      return NextResponse.json({ error: 'Email and amount are required' }, { status: 400 });
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const res = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount, // in kobo
        callback_url: `${appUrl}/payment/callback`,
        metadata: { userId },
      }),
    });

    const data = await res.json();
    if (!data.status) {
      return NextResponse.json({ error: data.message }, { status: 400 });
    }

    return NextResponse.json({ authorization_url: data.data.authorization_url });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Payment initialization failed' }, { status: 500 });
  }
}
