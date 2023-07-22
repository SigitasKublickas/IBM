export enum Day {
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
  Friday,
  Saturday,
  Sunday,
}

export enum VehicleType {
  Car,
  Motercycle,
  Truck,
}

export type Rate = {
  id: string;
  creationDate: Date;
  startDay: Day;
  startHour: number;
  endDay: Day;
  endHour: number;
  vehicleType: VehicleType;
  amount: number;
  isActive: boolean;
};
