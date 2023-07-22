/*
  Warnings:

  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `pricechart` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `car`;

-- DropTable
DROP TABLE `pricechart`;

-- CreateTable
CREATE TABLE `VehicleRecord` (
    `id` VARCHAR(191) NOT NULL,
    `plateNumber` VARCHAR(191) NOT NULL,
    `timeStamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `vehicleType` ENUM('Car', 'Motercycle', 'Truck') NOT NULL,
    `rateId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Rate` (
    `id` VARCHAR(191) NOT NULL,
    `startDay` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    `startHour` INTEGER NOT NULL,
    `endDay` ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    `endHour` INTEGER NOT NULL,
    `vehicleType` ENUM('Car', 'Motercycle', 'Truck') NOT NULL,
    `amount` INTEGER NOT NULL,
    `isActive` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `VehicleRecord` ADD CONSTRAINT `VehicleRecord_rateId_fkey` FOREIGN KEY (`rateId`) REFERENCES `Rate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
