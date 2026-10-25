import { prisma } from '@/lib/prisma';

export async function rateLimit(key: string, limit: number, windowMs: number) {
  const now = new Date();
  const expiresAt = new Date(now.getTime() + windowMs);

  // Use advisory lock to prevent race conditions
  await prisma.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${key}))`;

  const record = await prisma.rateLimit.findUnique({ where: { key } });

  if (!record) {
    await prisma.rateLimit.create({
      data: { key, count: 1, expiresAt },
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.expiresAt < now) {
    await prisma.rateLimit.update({
      where: { key },
      data: { count: 1, expiresAt },
    });
    return { allowed: true, remaining: limit - 1 };
  }

  if (record.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  await prisma.rateLimit.update({
    where: { key },
    data: { count: { increment: 1 } },
  });

  return { allowed: true, remaining: limit - record.count - 1 };
}
