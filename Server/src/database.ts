import { PrismaClient } from "@prisma/client";

export const databaseClient = (prisma: PrismaClient) => {
  const getActiveRates = () =>
    prisma.rate.findMany({
      where: { isActive: true },
    });

  return {
    getActiveRates,
  };
};
