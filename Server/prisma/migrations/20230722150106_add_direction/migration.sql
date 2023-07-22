/*
  Warnings:

  - You are about to drop the column `rateId` on the `vehiclerecord` table. All the data in the column will be lost.
  - Added the required column `direction` to the `VehicleRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `vehiclerecord` DROP FOREIGN KEY `VehicleRecord_rateId_fkey`;

-- AlterTable
ALTER TABLE `vehiclerecord` DROP COLUMN `rateId`,
    ADD COLUMN `direction` ENUM('Enter', 'Exit') NOT NULL;

-- CreateTable
CREATE TABLE `_RateToVehicleRecord` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_RateToVehicleRecord_AB_unique`(`A`, `B`),
    INDEX `_RateToVehicleRecord_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_RateToVehicleRecord` ADD CONSTRAINT `_RateToVehicleRecord_A_fkey` FOREIGN KEY (`A`) REFERENCES `Rate`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_RateToVehicleRecord` ADD CONSTRAINT `_RateToVehicleRecord_B_fkey` FOREIGN KEY (`B`) REFERENCES `VehicleRecord`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
