import { Axios } from "axios";
import { FileReaderType } from "../components/imgInput";
import { Day, Period, Rate, VehicleType } from "./types";
export const APIURL = "http://localhost:8000";

export const api = (axios: Axios) => {
  const getActivePeriods = async (): Promise<Period[]> => {
    const periods = await axios.get(`${APIURL}/activePeriods`);
    return periods.data.periods.map((period: any) => {
      return { ...period, rates: period.rates.map(parseRate) };
    });
  };

  const updateRate = async (rate: Partial<Rate>) => {
    return axios.patch(`${APIURL}/rate`, { ...rate });
  };

  const createRate = async (
    rate: Omit<Rate, "id" | "creationDate" | "isActive">
  ) => {
    return axios.post(`${APIURL}/rate`, { ...rate });
  };

  const createVehicleRecord = async (
    image: FileReaderType
  ): Promise<{
    data: { success: boolean; id: string; direction: string; msg: string };
  }> => {
    return axios.post(`${APIURL}/vehicleRecord`, { image });
  };

  const getCostById = async (
    id: string
  ): Promise<{
    data: { success: boolean; cost: number; spentTime: string };
  }> => {
    return axios.post(`${APIURL}/parkingCost`, { id });
  };

  return {
    updateRate,
    createRate,
    getActivePeriods,
    createVehicleRecord,
    getCostById,
  };
};

const parseRate = (rate: any): Rate => {
  return {
    ...rate,
    creationDate: new Date(rate.creationDate),
  };
};
