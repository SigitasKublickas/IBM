import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { databaseClient } from "./database.js";
import { PrismaClient } from "@prisma/client";
import { getVehilceInfo } from "./vehicleRecognition.js";

const prisma = new PrismaClient();
const database = databaseClient(prisma);

const app: Express = express();

app.use(cors());
app.use(express.json({ limit: "500kb" }));

app.get("/activePeriods", async (req: Request, res: Response) => {
  const periods = await database.getActivePeriods();
  return res.json({ periods });
});

app.patch("/rate", async (req: Request, res: Response) => {
  const rate = await database.updateRate(req.body);
  res.json({ success: true });
});

app.post("/rate", async (req: Request, res: Response) => {
  const rate = await database.createRate(req.body);
  res.json({ success: true });
});

app.post("/vehicleRecord", async (req: Request, res: Response) => {
  const vehicleInfo = await getVehilceInfo(req.body.image);
  const record = await database.createVehicleRecord(vehicleInfo);
  res.json({ success: true });
});

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
