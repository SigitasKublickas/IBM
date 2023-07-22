import { Axios } from "axios";
import { Day, Period, Rate, VehicleType } from "./types";
const APIURL = "http://localhost:8000";

export const api = (axios: Axios) => {
  const getActivePeriods = async (): Promise<Period[]> => {
    const periods = await axios.get(`${APIURL}/activePeriods`);
    return periods.data.periods.map((period: any) => {
      return { ...period, rates: period.rates.map(parseRate) };
    });
  };
  return {
    getActivePeriods,
  };
};

const parseRate = (rate: any): Rate => {
  return {
    ...rate,
    creationDate: new Date(rate.creationDate),
  };
};
