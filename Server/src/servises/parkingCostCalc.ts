import { Day, Period, Rate, VehicleRecord } from "@prisma/client";
import { rawListeners } from "process";
import { Prisma } from "@prisma/client";

type VechileWithRate = Prisma.VehicleRecordGetPayload<{
  include: {
    exitRecord: true;
    enterRecord: true;
    rates: { include: { period: true } };
  };
}>;

type RateWithPeriod = Prisma.RateGetPayload<{
  include: {
    period: true;
  };
}>;

type PeriodsWithAmount =
  | {
      amount: number;
      id: string;
      startDay: Day;
      startHour: number;
      endDay: Day;
      endHour: number;
    }
  | undefined;

interface ParkingCostCaluclator {
  calculateCost: (vehicleRecord: VechileWithRate) => number;
  calculateTime: (vehicleRecord: VechileWithRate) => string;
}

export const createParkingCostCalculator = (): ParkingCostCaluclator => {
  const calculateTime = (entranceRecord: VechileWithRate): string => {
    const enter = new Date(entranceRecord.timeStamp);
    let exit = new Date();
    if (entranceRecord.exitRecordId && entranceRecord.exitRecord) {
      exit = new Date(entranceRecord.exitRecord.timeStamp);
    }

    let timeDiff = exit.getTime() - enter.getTime();
    const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, "0");
    timeDiff -= parseInt(days) * (1000 * 60 * 60 * 24);
    const hours = Math.floor(timeDiff / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    timeDiff -= parseInt(hours) * (1000 * 60 * 60);
    const minutes = Math.floor(timeDiff / (1000 * 60))
      .toString()
      .padStart(2, "0");
    timeDiff -= parseInt(minutes) * (1000 * 60);
    const seconds = Math.floor(timeDiff / 1000)
      .toString()
      .padStart(2, "0");

    return `${days}:${hours}:${minutes}:${seconds} `;
  };

  const calculateCost = (entranceRecord: VechileWithRate): number => {
    if (!entranceRecord.exitRecord) {
      return calculatedPrice(entranceRecord, new Date());
    } else {
      return calculatedPrice(
        entranceRecord,
        entranceRecord.exitRecord.timeStamp
      );
    }
  };

  return {
    calculateTime,
    calculateCost,
  };
};

const calculatedPrice = (entranceRecord: VechileWithRate, exitDate: Date) => {
  const periodsWithAmount = entranceRecord.rates.map(formatingPeriodWithAmount);
  return getCostForParkedInPeriod(
    entranceRecord.timeStamp,
    exitDate,
    periodsWithAmount
  );
};

const formatingPeriodWithAmount = (rate: RateWithPeriod) => {
  if (rate.period) {
    return { ...rate.period, amount: rate.amount };
  }
};

const getCostForParkedInPeriod = (
  enterDate: Date,
  exitDate: Date,
  periodsWithAmount: PeriodsWithAmount[]
): number => {
  const enterWeekDay = enterDate.getDay();
  const exitWeekDay = exitDate.getDay();
  const enterTime = getTimeFromDate(enterDate);
  const exitTime = getTimeFromDate(exitDate);
  let price: number = 0;
  periodsWithAmount.map((period) => {
    if (period) {
      if (
        (weekdays[period.startDay] === enterWeekDay &&
          weekdays[period.endDay] === exitWeekDay) ||
        (weekdays[period.startDay] <= enterWeekDay &&
          weekdays[period.endDay] >= exitWeekDay)
      ) {
        const timeSpent = calculateParkingTime(
          enterTime,
          exitTime,
          convertNumberToTimeString(period.startHour),
          convertNumberToTimeString(period.endHour)
        );
        const notFixedPrice =
          Number(convertTimeToNumber(timeSpent).toFixed(0)) *
          Number(period.amount / 60);
        price = Number(notFixedPrice.toFixed(2));
      }
    }
  });
  return price;
};

const weekdays: { [key: string]: number } = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

const getTimeFromDate = (date: Date): string => {
  const now = new Date(date);
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

const convertNumberToTimeString = (hours: number): string => {
  const paddedHours = String(hours).padStart(2, "0");
  return `${paddedHours}:00:00`;
};

const calculateParkingTime = (
  arrivalTime: string,
  departureTime: string,
  startTime: string,
  endTime: string
): string => {
  const convertTimeToMilliseconds = (time: string): number => {
    const [hours, minutes, seconds] = time.split(":").map(Number);
    return (hours * 3600 + minutes * 60 + seconds) * 1000;
  };

  const arrivalTimeInMilliseconds = convertTimeToMilliseconds(arrivalTime);
  const departureTimeInMilliseconds = convertTimeToMilliseconds(departureTime);
  const startTimeInMilliseconds = convertTimeToMilliseconds(startTime);
  const endTimeInMilliseconds = convertTimeToMilliseconds(endTime);
  const adjustedArrivalTime = Math.max(
    arrivalTimeInMilliseconds,
    startTimeInMilliseconds
  );
  const adjustedDepartureTime = Math.min(
    departureTimeInMilliseconds,
    endTimeInMilliseconds
  );
  const parkingTimeInMilliseconds = adjustedDepartureTime - adjustedArrivalTime;
  const hours = Math.floor(parkingTimeInMilliseconds / 3600000);
  const minutes = Math.floor((parkingTimeInMilliseconds % 3600000) / 60000);
  const seconds = Math.floor((parkingTimeInMilliseconds % 60000) / 1000);
  const formattedHours = hours.toString().padStart(2, "0");
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");
  if (
    formattedHours[0] === "-" ||
    formattedMinutes[0] === "-" ||
    formattedSeconds[0] === "-"
  ) {
    return "00:00:00";
  }
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const convertTimeToNumber = (time: string): number => {
  const timeParts = time.split(":").map(Number);
  const hoursInSeconds = timeParts[0] * 3600;
  const minutesInSeconds = timeParts[1] * 60;
  const seconds = timeParts[2];
  hoursInSeconds + minutesInSeconds + seconds;
  return Number(
    ((hoursInSeconds + minutesInSeconds + seconds) / 60).toFixed(2)
  );
};
