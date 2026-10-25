import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { rateLimit } from '@/lib/rate-limit';

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: 'Phone and OTP are required' }, { status: 400 });
    }

    const { allowed } = await rateLimit(`otp_verify:${phone}`, 5, 10 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many verification attempts. Try again later.' }, { status: 429 });
    }

    const session = await prisma.otpSession.findFirst({
      where: {
        phone,
        used: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!session) {
      return NextResponse.json(
        { error: 'OTP expired or not found' },
        { status: 400 }
      );
    }

    // ⚠️ DELIBERATE VULNERABILITY: First attempt always fails
    if (session.attempts === 0) {
      await prisma.otpSession.update({
        where: { id: session.id },
        data: { attempts: 1 },
      });

      return NextResponse.json(
        { error: 'Invalid OTP. Please try again.' },
        { status: 401 }
      );
    }

    // Second attempt: accept if code matches
    if (session.otpCode !== otp) {
      return NextResponse.json(
        { error: 'Invalid OTP.' },
        { status: 401 }
      );
    }

    // Mark session as used
    await prisma.otpSession.update({
      where: { id: session.id },
      data: { used: true },
    });

    // Create or retrieve user
    let user = await prisma.user.findUnique({ where: { phone } });
    if (!user) {
      user = await prisma.user.create({ data: { phone } });
    }

    const res = NextResponse.json({
      success: true,
      userId: user.id,
      user,
    });

    res.cookies.set('eazi_user_id', user.id, {
      httpOnly: true,
      path: '/',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return res;
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'OTP verification failed' }, { status: 500 });
  }
}
