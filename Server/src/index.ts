import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { databaseClient } from "./database.js";
import { PrismaClient } from "@prisma/client";

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

const getData = async (img: string) => {
  let body = new FormData();
  body.append("upload", img);
  body.append("regions", "lt"); // Change to your country

  const response = await fetch(
    "https://api.platerecognizer.com/v1/plate-reader/",
    {
      method: "POST",
      headers: {
        Authorization: "Token b52d5f066ed36e2b5738a3acce666d9df869650f",
      },
      body: body,
    }
  );

  if (!response.ok) {
    throw new Error("Plate recognizer API error");
  }

  return response.json();
};

app.listen(8000, () => {
  console.log("Server started on port 8000");
});
