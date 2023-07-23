/*
  Warnings:

  - A unique constraint covering the columns `[exitRecordId]` on the table `VehicleRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `vehiclerecord` ADD COLUMN `exitRecordId` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `VehicleRecord_exitRecordId_key` ON `VehicleRecord`(`exitRecordId`);

-- AddForeignKey
ALTER TABLE `VehicleRecord` ADD CONSTRAINT `VehicleRecord_exitRecordId_fkey` FOREIGN KEY (`exitRecordId`) REFERENCES `VehicleRecord`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
