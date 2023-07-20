/*
  Warnings:

  - Added the required column `car_type` to the `Car` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time_stamp` to the `Car` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `car` ADD COLUMN `car_type` VARCHAR(191) NOT NULL,
    ADD COLUMN `time_stamp` DATETIME(3) NOT NULL;

-- CreateTable
CREATE TABLE `PriceChart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `time` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
