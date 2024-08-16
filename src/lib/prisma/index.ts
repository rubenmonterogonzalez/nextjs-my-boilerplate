import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const isDev = process.env.NODE_ENV !== 'production';

if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({
        log: isDev ? ['query', 'error', 'warn', 'info'] : [],
    });
}

export const prisma = globalForPrisma.prisma;