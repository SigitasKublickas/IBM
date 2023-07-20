import fetch from "node-fetch";
import FormData from "form-data";
import fs from "fs";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import axios from "axios";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const app: Express = express();
app.use(cors());
app.use(express.json({ limit: "500kb" }));

app.post("/image", async (req, res) => {
  if (req.body) {
    try {
      const response: any = await getData(req.body.image);
      if (response) {
        const duplicateCount = await prisma.car.count();
        const car = await prisma.car.create({
          data: {
            plate: response.results[0].plate,
            car_type: response.results[0].vehicle.type,
            time_stamp: new Date().toString(),
          },
        });
        if (car && duplicateCount % 2 == 0) {
          return res.json({ success: true, msg: "Sveiki atvykę!" });
        } else {
          const lastTwo: any = await getLastTwoPostsWhere(
            response.results[0].plate
          );
          const floatTime =
            Math.abs(
              new Date(`2023-07-20 15:30`).getTime() -
                new Date(lastTwo[1].time_stamp).getTime()
            ) / 36e5;
          const timeString = floatToHoursMinutes(floatTime);
          return res.json({
            success: true,
            msg: `Gero kelio! Laikas praleistas aikštelėje:${timeString} Mokėtina suma:`,
          });
        }
      } else {
        return res.send("nesuper");
      }
    } catch (err) {
      console.error("Error processing image:", err);
      return res.status(500).send("Error processing image.");
    }
  }
  return res.send("nesuper");
});

const getLastTwoPostsWhere = async (condition: any) => {
  try {
    const lastTwoPosts = await prisma.car.findMany({
      where: { plate: { contains: condition } },
      take: 2,
      orderBy: { id: "desc" },
    });

    return lastTwoPosts;
  } catch (error) {
    console.error("Error retrieving last two posts:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

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
function floatToHoursMinutes(floatValue: number): string {
  const hours = Math.floor(floatValue);
  const minutes = Math.round((floatValue - hours) * 60);

  const formattedHours = hours < 10 ? `0${hours}` : `${hours}`;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  return `${formattedHours}:${formattedMinutes}`;
}

async function prismafun() {}
prismafun().catch((e) => {
  console.error(e.message);
});
app.listen(8000, () => {
  console.log("Server started on port 8000");
});
