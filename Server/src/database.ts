import {
  Direction,
  PrismaClient,
  Rate,
  VehicleRecord,
  VehicleType,
} from "@prisma/client";

export type VehicleInfo = {
  plateNumber: string;
  vehicleType: VehicleType;
};

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

  const createVehicleRecord = async (vehicle: VehicleInfo) => {
    const lastRecord = await prisma.vehicleRecord.findFirst({
      where: {
        plateNumber: vehicle.plateNumber,
      },
    });
    const rates = await prisma.rate.findMany({
      where: {
        vehicleType: vehicle.vehicleType,
        isActive: true,
      },
    });
    return prisma.vehicleRecord.create({
      data: {
        ...vehicle,
        direction: getVehicleNewDirection(lastRecord),
        rates: {
          connect: [...rates.map((item) => ({ id: item.id }))],
        },
      },
    });
  };

  return {
    getActivePeriods,
    updateRate,
    createRate,
    createVehicleRecord,
  };
};

const getVehicleNewDirection = (
  lastRecord: VehicleRecord | null
): Direction => {
  if (!lastRecord) {
    return "Enter";
  }
  if (lastRecord.direction === "Enter") {
    return "Exit";
  }
  return "Enter";
};
