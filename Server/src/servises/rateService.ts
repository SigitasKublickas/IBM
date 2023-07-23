import {
  Direction,
  Period,
  PrismaClient,
  Rate,
  VehicleRecord,
  VehicleType,
} from "@prisma/client";

export type VehicleInfo = {
  plateNumber: string;
  vehicleType: VehicleType;
};

export const createRateService = (prisma: PrismaClient) => {
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
