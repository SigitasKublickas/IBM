import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const car = await prisma.car.findMany();
  console.log(car);
}
main()
  .catch((e) => {
    console.log(e.message);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
