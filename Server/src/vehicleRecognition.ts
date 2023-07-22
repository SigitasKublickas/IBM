import { VehicleType } from "@prisma/client";
import { VehicleInfo } from "./database.js";

const plateRecognizerUrl = "https://api.platerecognizer.com/v1/plate-reader/";

const VehicleTypeMap: { [key: string]: VehicleType } = {
  "Big Truck": "Truck",
  Bus: "Truck",
  Motorcycle: "Motercycle",
  "Pickup Truck": "Car",
  Sedan: "Car",
  SUV: "Car",
  Van: "Car",
  Unknown: "Car",
};
export const getVehilceInfo = async (img: string): Promise<VehicleInfo> => {
  let body = new FormData();
  body.append("upload", img);
  body.append("regions", "lt");

  const response = await fetch(plateRecognizerUrl, {
    method: "POST",
    headers: {
      Authorization: process.env.PLATE_RECOGNIZER_TOKEN ?? "",
    },
    body: body,
  });

  if (!response.ok) {
    throw new Error("Plate recognizer API error");
  }

  const data = await response.json();

  const vehicleType = VehicleTypeMap[data.results[0].vehicle.type];
  const plateNumber = data.results[0].plate;

  return { vehicleType, plateNumber };
};
