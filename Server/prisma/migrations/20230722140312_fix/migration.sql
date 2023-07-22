-- AlterTable
ALTER TABLE `rate` MODIFY `vehicleType` ENUM('Motercycle', 'Car', 'Truck') NOT NULL;

-- AlterTable
ALTER TABLE `vehiclerecord` MODIFY `vehicleType` ENUM('Motercycle', 'Car', 'Truck') NOT NULL;
