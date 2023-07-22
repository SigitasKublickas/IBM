export type Day =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type VehicleType = "Car" | "Motercycle" | "Truck";

export type Period = {
  id: string;
  startDay: Day;
  startHour: number;
  endDay: Day;
  endHour: number;
  rates: Rate[];
};
export type Rate = {
  id: string;
  creationDate: Date;
  vehicleType: VehicleType;
  amount: number;
  isActive: boolean;
  periodId: string;
};
