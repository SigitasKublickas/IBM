/*
  Warnings:

  - You are about to drop the column `endDay` on the `rate` table. All the data in the column will be lost.
  - You are about to drop the column `endHour` on the `rate` table. All the data in the column will be lost.
  - You are about to drop the column `startDay` on the `rate` table. All the data in the column will be lost.
  - You are about to drop the column `startHour` on the `rate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `rate` DROP COLUMN `endDay`,
    DROP COLUMN `endHour`,
    DROP COLUMN `startDay`,
    DROP COLUMN `startHour`;
