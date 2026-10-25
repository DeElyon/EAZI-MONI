import { NextRequest, NextResponse } from 'next/server';
import { grantWelcomeBonus } from '@/lib/bonus';

export async function POST(req: NextRequest) {
  try {
    const userIdCookie = req.cookies.get('eazi_user_id')?.value;
    const body = await req.json().catch(() => ({}));
    const userId = body.userId || userIdCookie;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized: User ID missing' }, { status: 401 });
    }

    const result = await grantWelcomeBonus(userId);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Failed to claim welcome bonus' }, { status: 500 });
  }
}
