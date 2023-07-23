import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";

import { PrismaClient } from "@prisma/client";
import { getVehilceInfo } from "./vehicleRecognition.js";
import { createParkingCostService } from "./servises/parkingCostServise.js";
import { createRateService } from "./servises/rateService.js";
import { createVehicleService } from "./servises/vehicleService.js";

const prisma = new PrismaClient();
const parkingCostService = createParkingCostService(prisma);
const rateService = createRateService(prisma);
const vehicleService = createVehicleService(prisma);

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: "20000kb" }));

app.get("/activePeriods", async (req: Request, res: Response) => {
  const periods = await rateService.getActivePeriods();
  return res.json({ periods });
});

app.patch("/rate", async (req: Request, res: Response) => {
  const rate = await rateService.updateRate(req.body);
  res.json({ success: true });
});

app.post("/rate", async (req: Request, res: Response) => {
  const rate = await rateService.createRate(req.body);
  res.json({ success: true });
});

app.post("/vehicleRecord", async (req: Request, res: Response) => {
  const vehicleInfo = await getVehilceInfo(req.body.image);
  if (vehicleInfo) {
    const record = await vehicleService.createVehicleRecord(vehicleInfo);
    res.json({
      success: true,
      id: record.id,
      direction: record.direction,
      msg: "",
    });
  } else {
    res.json({
      success: false,
      msg: "Something wrong! Try another photo!",
      id: "",
      direction: "",
    });
  }
});

app.post("/parkingCost", async (req: Request, res: Response) => {
  const cost = await parkingCostService.getParkingCostById(req.body.id);
  if (cost) {
    res.json({ success: true, cost: cost?.cost, spentTime: cost?.spentTime });
  } else {
    res.json({ success: false });
  }
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
