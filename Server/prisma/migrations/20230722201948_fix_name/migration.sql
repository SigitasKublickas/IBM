/*
  Warnings:

  - The values [Motercycle] on the enum `Rate_vehicleType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Motercycle] on the enum `Rate_vehicleType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `rate` MODIFY `vehicleType` ENUM('Motorcycle', 'Car', 'Truck') NOT NULL;

-- AlterTable
ALTER TABLE `vehiclerecord` MODIFY `vehicleType` ENUM('Motorcycle', 'Car', 'Truck') NOT NULL;
