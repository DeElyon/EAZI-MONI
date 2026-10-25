import { prisma } from '@/lib/prisma';

export async function grantWelcomeBonus(userId: string) {
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({ where: { id: userId } });
    if (!user || user.hasClaimedWelcome) return { claimed: false, message: 'Already claimed or user not found' };

    await tx.bonusClaim.create({
      data: { userId, amount: 135_000, type: 'welcome' }, // ₦1,350 = 135,000 kobo
    });

    await tx.user.update({
      where: { id: userId },
      data: { hasClaimedWelcome: true },
    });

    return { claimed: true, amount: 135_000 };
  });
}

export async function grantReturnBonus(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { claimed: false, message: 'User not found' };

  const now = new Date();
  const cooldown = 24 * 60 * 60 * 1000; // 24 hours

  if (user.lastReturnClaim && now.getTime() - user.lastReturnClaim.getTime() < cooldown) {
    const nextAvailableInMs = cooldown - (now.getTime() - user.lastReturnClaim.getTime());
    return { claimed: false, message: 'Cooldown active', nextAvailableInMs };
  }

  await prisma.$transaction([
    prisma.bonusClaim.create({
      data: { userId, amount: 20_000, type: 'return' }, // ₦200 = 20,000 kobo
    }),
    prisma.user.update({
      where: { id: userId },
      data: { lastReturnClaim: now },
    }),
  ]);

  return { claimed: true, amount: 20_000 };
}

export async function getBalance(userId: string) {
  const [claims, payouts] = await Promise.all([
    prisma.bonusClaim.aggregate({
      where: { userId },
      _sum: { amount: true },
    }),
    prisma.payout.aggregate({
      where: { userId, status: 'success' },
      _sum: { amount: true },
    }),
  ]);

  const totalClaims = claims._sum.amount ?? 0;
  const totalPayouts = payouts._sum.amount ?? 0;
  return totalClaims - totalPayouts;
}

export async function getTransactions(userId: string) {
  const [claims, payouts] = await Promise.all([
    prisma.bonusClaim.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
    prisma.payout.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
  ]);

  return { claims, payouts };
}
