import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    const secret = process.env.PAYSTACK_SECRET_KEY || '';
    if (secret && !secret.includes('mock')) {
      if (!signature) {
        return new NextResponse('Missing signature', { status: 401 });
      }
      const hash = crypto
        .createHmac('sha512', secret)
        .update(body)
        .digest('hex');

      if (hash !== signature) {
        return new NextResponse('Invalid signature', { status: 401 });
      }
    }

    const event = JSON.parse(body);

    if (event.event === 'transfer.success') {
      await prisma.payout.update({
        where: { reference: event.data.reference },
        data: { status: 'success' },
      });
    }

    if (event.event === 'transfer.failed') {
      await prisma.payout.update({
        where: { reference: event.data.reference },
        data: { status: 'failed' },
      });
    }

    return new NextResponse('OK', { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message || 'Webhook processing failed', { status: 500 });
  }
}
