import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    const { allowed } = await rateLimit(`otp_send:${phone}`, 5, 60 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many OTP requests. Please wait an hour.' }, { status: 429 });
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({ data: { phone } });
    }

    await prisma.otpSession.create({
      data: {
        userId: user.id,
        phone,
        otpCode, // ⚠️ PLAINTEXT — deliberately vulnerable
        expiresAt,
      },
    });

    // Trigger WhatsApp webhook delivery
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/auth/webhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'send.otp',
          data: { phoneNumber: phone, otp: otpCode },
        }),
      });
    } catch (err) {
      console.error('Error triggering OTP webhook:', err);
    }

    return NextResponse.json({ success: true, message: 'OTP sent successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to send OTP' }, { status: 500 });
  }
}
