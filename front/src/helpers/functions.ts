import { Period, Rate } from "../api";

export const floatToHoursMinutes = (floatValue: number): string => {
  const hours = Math.floor(floatValue);
  const minutes = Math.round((floatValue - hours) * 60);

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
};

export const getFormatedPeriod = (period: Period): string => {
  return `${getFormatedDays(period)} (${getFormatedHours(period)})`;
};

const getFormatedDays = (period: Period): string => {
  if (period.startDay === period.endDay) {
    return period.startDay;
  }
  return `${period.startDay}-${period.endDay}`;
};

const getFormatedHours = (period: Period): string => {
  if (period.endHour === 24 && period.startHour === 0) {
    return "Whole day";
  }
  return `${period.startHour}-${period.endHour}`;
};

export const getFormatedPrice = (rate: Rate): string => {
  if (rate.amount === 0) {
    return "Free";
  }
  return `${rate.amount} Eur/h`;
};
export const compareRatesByVehicleType = (rateOne: Rate, rateTwo: Rate) => {
  const rateTable = { Motorcycle: 0, Car: 1, Truck: 2 };
  if (rateOne.vehicleType === rateTwo.vehicleType) {
    return 0;
  }
  if (rateTable[rateOne.vehicleType] > rateTable[rateTwo.vehicleType]) {
    return 1;
  }
  return -1;
};
