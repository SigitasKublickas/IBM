import {
  Direction,
  Prisma,
  PrismaClient,
  VehicleRecord,
  VehicleType,
} from "@prisma/client";
import { VehicleInfo } from "./rateService.js";

export const createVehicleService = (prisma: PrismaClient) => {
  const getVehicleActiveRates = (vehicleType: VehicleType) => {
    return prisma.rate.findMany({
      where: {
        vehicleType: vehicleType,
        isActive: true,
      },
    });
  };
  const createVehicleRecord = async (vehicle: VehicleInfo) => {
    const lastRecord = await prisma.vehicleRecord.findFirst({
      where: {
        plateNumber: vehicle.plateNumber,
      },
      orderBy: {
        timeStamp: "desc",
      },
    });

    const direction = getVehicleNewDirection(lastRecord);
    const isExiting = direction === "Exit";
    const rates = isExiting
      ? []
      : await getVehicleActiveRates(vehicle.vehicleType); // add rates only if entering

    return prisma.vehicleRecord.create({
      data: {
        ...vehicle,
        direction,

        rates: {
          connect: [...rates.map((item) => ({ id: item.id }))],
        },

        enterRecord: {
          connect: isExiting ? { id: lastRecord?.id } : undefined, // if exiting connect enterace record
        },
      },
    });
  };
  return {
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
