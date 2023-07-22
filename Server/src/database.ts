import { PrismaClient } from "@prisma/client";

export const databaseClient = (prisma: PrismaClient) => {
  const getActivePeriods = () =>
    prisma.period.findMany({
      include: {
        rates: { where: { isActive: true } },
      },
    });

  return {
    getActivePeriods,
  };
};
