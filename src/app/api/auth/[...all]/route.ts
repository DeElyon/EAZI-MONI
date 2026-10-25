import { auth } from '@/lib/auth/server';
import { NextRequest } from 'next/server';

const handler = auth.handler();

export async function GET(request: NextRequest, { params }: { params: Promise<{ all: string[] }> }) {
  return (handler.GET as any)(request, { params });
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ all: string[] }> }) {
  return (handler.POST as any)(request, { params });
}
