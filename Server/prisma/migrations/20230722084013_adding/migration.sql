/*
  Warnings:

  - You are about to alter the column `amount` on the `rate` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `rate` MODIFY `amount` DOUBLE NOT NULL;
