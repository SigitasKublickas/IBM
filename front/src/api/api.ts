import { Axios } from "axios";
import { Day, Rate, VehicleType } from "./types";
const APIURL = "http://localhost:8000";

export const api = (axios: Axios) => {
  const getActiveRates = async (): Promise<Rate[]> => {
    const rates = await axios.get(`${APIURL}/activeRates`);
    return rates.data.activeRates.map((rate: any) => parseRate(rate));
  };
  return {
    getActiveRates,
  };
};

const parseRate = (rate: any): Rate => {
  return {
    ...rate,
    creationDate: new Date(rate.creationDate),
    endDay: Day[rate.endDay],
    startDay: Day[rate.startDay],
    vehicleType: VehicleType[rate.vehicleType],
  };
};
