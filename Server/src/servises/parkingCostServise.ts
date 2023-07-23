import {
  Prisma,
  PrismaClient,
  VehicleRecord,
  VehicleType,
} from "@prisma/client";
import { createParkingCostCalculator } from "./parkingCostCalc.js";

type ParkingCost = {
  entranceId: string;
  plateNumber: string;
  vehicleType: VehicleType;
  entranceDate: Date;
  exitDate: Date | undefined;
  cost: number;
  spentTime: string;
};

export const createParkingCostService = (prisma: PrismaClient) => {
  const parkingCostCalculator = createParkingCostCalculator();

  const getParkingCosts = async (): Promise<ParkingCost[]> => {
    const enteraceRecords = await prisma.vehicleRecord.findMany({
      where: { direction: "Enter" },
      include: {
        enterRecord: true,
        rates: { include: { period: true } },
        exitRecord: true,
      },
    });
    return enteraceRecords.map((record) => ({
      entranceId: record.id,
      plateNumber: record.plateNumber,
      vehicleType: record.vehicleType,
      cost: parkingCostCalculator.calculateCost(record),
      entranceDate: record.timeStamp,
      exitDate: record.exitRecord?.timeStamp,
      spentTime: parkingCostCalculator.calculateTime(record),
    }));
  };

  const getParkingCostById = async (entranceId: string) => {
    const enteraceRecord = await prisma.vehicleRecord.findFirst({
      where: { direction: "Enter", exitRecordId: entranceId },
      include: {
        enterRecord: true,
        rates: { include: { period: true } },
        exitRecord: true,
      },
    });
    
    if (enteraceRecord) {
      return {
        entranceId: enteraceRecord.id,
        plateNumber: enteraceRecord.plateNumber,
        vehicleType: enteraceRecord.vehicleType,
        cost: parkingCostCalculator.calculateCost(enteraceRecord),
        entranceDate: enteraceRecord.timeStamp,
        exitDate: enteraceRecord.exitRecord?.timeStamp,
        spentTime: parkingCostCalculator.calculateTime(enteraceRecord),
      };
    }
  };

  return { getParkingCosts, getParkingCostById };
};
