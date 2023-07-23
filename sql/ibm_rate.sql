-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ibm
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `rate`
--

DROP TABLE IF EXISTS `rate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rate` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `vehicleType` enum('Motorcycle','Car','Truck') COLLATE utf8mb4_unicode_ci NOT NULL,
  `amount` double NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `creationDate` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `periodId` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Rate_periodId_fkey` (`periodId`),
  CONSTRAINT `Rate_periodId_fkey` FOREIGN KEY (`periodId`) REFERENCES `period` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rate`
--

LOCK TABLES `rate` WRITE;
/*!40000 ALTER TABLE `rate` DISABLE KEYS */;
INSERT INTO `rate` VALUES ('05f50f0f-0d79-4faa-a972-62ee402c8d0b','Truck',2,1,'2023-07-22 20:31:43.245','8f41f9d2-9dad-4f02-9cb4-9b57fcc23246'),('174bd3cf-cb34-43dc-839b-a41e7ccf04f5','Car',0,1,'2023-07-22 20:31:43.245','1f0aab6a-ae16-46f0-90d1-f6afdd4130d8'),('2088c55f-0963-4055-9ed5-d78bbeadf64a','Truck',5,1,'2023-07-22 20:31:43.245','be158acd-0e15-44ed-ab70-b31f0680119e'),('25f9c259-2051-4ed5-8b67-292ee8434f59','Car',1,1,'2023-07-22 20:31:43.245','8f41f9d2-9dad-4f02-9cb4-9b57fcc23246'),('6d81e2df-7c07-4ae1-9761-81c54a1b5a55','Truck',3.5,1,'2023-07-22 20:31:43.245','6142509d-fc2d-4a05-b437-8a692ad32dc4'),('7103fe59-d921-4d14-8f79-2a5b4b62f1f3','Motorcycle',0.5,1,'2023-07-23 22:29:37.378','8f41f9d2-9dad-4f02-9cb4-9b57fcc23246'),('8066e608-efbb-48dd-b5d5-48930ce41896','Truck',0,1,'2023-07-22 20:31:43.245','1f0aab6a-ae16-46f0-90d1-f6afdd4130d8'),('8e2cbedd-7b7f-49f8-9dd5-bfdb8d3fff87','Car',4,1,'2023-07-22 20:31:43.245','be158acd-0e15-44ed-ab70-b31f0680119e'),('9759647a-ba0b-4382-a41e-2634e474d7a7','Motorcycle',2,1,'2023-07-23 22:29:37.378','be158acd-0e15-44ed-ab70-b31f0680119e'),('b047bae4-68bb-4ff3-8b43-94564abc7dfd','Car',2,1,'2023-07-22 20:31:43.245','6142509d-fc2d-4a05-b437-8a692ad32dc4'),('daaaeb53-dd0d-45ce-9c0c-d80b7409debe','Motorcycle',0,1,'2023-07-23 22:29:37.378','1f0aab6a-ae16-46f0-90d1-f6afdd4130d8'),('e27fad91-3874-4ccd-8696-801e42cb1b69','Motorcycle',1.5,1,'2023-07-23 22:29:37.378','6142509d-fc2d-4a05-b437-8a692ad32dc4');
/*!40000 ALTER TABLE `rate` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-07-24  1:34:42
