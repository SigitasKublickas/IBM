import { PrismaClient, Rate } from "@prisma/client";

export const databaseClient = (prisma: PrismaClient) => {
  const getActivePeriods = () =>
    prisma.period.findMany({
      orderBy: [
        {
          startDay: "asc",
        },
      ],
      include: {
        rates: {
          where: { isActive: true },
        },
      },
    });

  const updateRate = (rate: Rate) =>
    prisma.rate.update({
      where: {
        id: rate.id,
      },
      data: {
        ...rate,
      },
    });

  const createRate = (rate: Omit<Rate, "id" | "creationDate" | "isActive">) =>
    prisma.rate.create({
      data: {
        ...rate,
      },
    });

  return {
    getActivePeriods,
    updateRate,
    createRate,
  };
};
