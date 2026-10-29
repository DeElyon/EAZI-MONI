import { PrismaClient } from '@/generated/prisma';
import { PrismaNeon } from '@prisma/adapter-neon';
import { neon } from '@neondatabase/serverless';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

function createPrismaClient() {
  const connectionString =
    process.env.DATABASE_URL ||
    'postgresql://neondb_owner:npg_ORrieG7NZYS0@ep-noisy-field-b57zxx3z-pooler.c-7.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

  const sql = neon(connectionString);
  const adapter = new PrismaNeon(sql as any);
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
