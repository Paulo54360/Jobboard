-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: Joboard
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `Joboard`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `Joboard` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `Joboard`;

--
-- Table structure for table `COMPAGNIES`
--

DROP TABLE IF EXISTS `COMPAGNIES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMPAGNIES` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `adress` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `compagnies_id_uindex` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPAGNIES`
--

LOCK TABLES `COMPAGNIES` WRITE;
/*!40000 ALTER TABLE `COMPAGNIES` DISABLE KEYS */;
INSERT INTO `COMPAGNIES` VALUES (1,'ThomasCorp','90 rue vaillant, 93000 Bordeciel','ThomasCorp est la premiere entreprise de transport de marchandise au monde','2021-09-29 15:59:22',NULL,1),(2,'EpitechCompany','80 rue saint george, 54000 Nancy','Epitech est une école d\'informatique à pédagogie par projet','2021-10-12 09:17:52',NULL,1),(3,'GrecCompagny','Bobigny','Meilleurs grec d\'idf','2021-10-12 09:19:23',NULL,0),(4,'ZaneguyCorp','91 rue saint george, 54000 Nancy','ZaneguyCorp fait la cuisine et fume des zamal','2021-10-12 12:32:46',NULL,0),(5,'TestBed','Lyon','Test de la création entreprise depuis admin','2021-10-13 19:30:31',NULL,1);
/*!40000 ALTER TABLE `COMPAGNIES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `COMPAGNIES_OFFERS`
--

DROP TABLE IF EXISTS `COMPAGNIES_OFFERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `COMPAGNIES_OFFERS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `compagny_name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `compagnies_id` int DEFAULT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `job` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `wages` int DEFAULT NULL,
  `places` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `schedule` int DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime DEFAULT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `compagnies_offers_id_uindex` (`id`),
  KEY `compagnies_offers_compagnies_id_fk` (`compagnies_id`),
  CONSTRAINT `compagnies_offers_compagnies_id_fk` FOREIGN KEY (`compagnies_id`) REFERENCES `COMPAGNIES` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `COMPAGNIES_OFFERS`
--

LOCK TABLES `COMPAGNIES_OFFERS` WRITE;
/*!40000 ALTER TABLE `COMPAGNIES_OFFERS` DISABLE KEYS */;
INSERT INTO `COMPAGNIES_OFFERS` VALUES (1,'ThomasCorp',1,'devolleper job at ThomasCorp. MERN stack. 2 years experiences required','developper',45,'90 rue vaillant, 93000 Bordeciel',35,'2021-09-29 16:03:09',NULL,1),(3,'Epitech',2,'ceci est un test de la requete post after delete','testeur',22,'80 rue saint george, 54000 Nancy',50,'2021-10-14 10:24:50',NULL,1),(4,'IForgot',3,'test depuis l\'admin','Testing',25,'Nancy',25,'2021-10-14 10:24:56',NULL,1),(5,'League of legend',4,'BibbamBOumChezHugo','requeteur post',22,'80 rue saint george, 54000 Nancy',50,'2021-10-14 10:24:58',NULL,0),(8,'TacosCompany',3,'Cuisinier pour des tacos','Cuisinier',12,'Bobigny',35,'2021-10-14 08:26:10',NULL,0);
/*!40000 ALTER TABLE `COMPAGNIES_OFFERS` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `OFFERS_APPLY`
--

DROP TABLE IF EXISTS `OFFERS_APPLY`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `OFFERS_APPLY` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `advertisement_id` int DEFAULT NULL,
  `name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `age` int DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `sexe` int DEFAULT NULL,
  `postuled_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message` text COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`),
  UNIQUE KEY `offers_apply_id_uindex` (`id`),
  KEY `offers_apply_Users_id_fk` (`user_id`),
  KEY `offers_apply_compagnies_offers_id_fk` (`advertisement_id`),
  CONSTRAINT `offers_apply_compagnies_offers_id_fk` FOREIGN KEY (`advertisement_id`) REFERENCES `COMPAGNIES_OFFERS` (`id`) ON DELETE CASCADE,
  CONSTRAINT `offers_apply_Users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `USERS` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `OFFERS_APPLY`
--

LOCK TABLES `OFFERS_APPLY` WRITE;
/*!40000 ALTER TABLE `OFFERS_APPLY` DISABLE KEYS */;
INSERT INTO `OFFERS_APPLY` VALUES (2,2,1,'terosiet','thomas',22,'0638395199',1,'2021-10-14 13:50:50','C\'est la premiere fois que je postule à une annonces sur mon site'),(3,2,1,'terosiet','thomas',22,'0638395199',1,'2021-10-14 13:50:58','C\'est la premiere fois que je postule à une annonces sur mon site'),(4,NULL,1,'Thomas','Thomas',24,'0638395199',1,'2021-10-14 13:51:02','Ceci est le test du form'),(5,NULL,1,'Larose','Hugo',23,'0638395199',2,'2021-10-14 13:51:04','Je suis un bouffon'),(6,2,1,'terosiet','thomas',22,'0638395199',1,'2021-10-14 13:51:06','Changement de clé'),(15,3,1,'Terosiet','Thomas',18,'0148303244',2,'2021-10-14 13:51:07',NULL),(16,3,1,'Terosiet','Thomas',18,'0148303244',2,'2021-10-14 13:51:09','bibabu'),(17,3,1,'Terosiet','Thomas',18,'0148303244',2,'2021-10-14 13:51:11','joiezoinfeozinf'),(18,3,1,'Terosiet','Thomas',18,'0148303244',2,'2021-10-14 13:51:13','joiezoinfeozinf'),(19,3,1,'Terosiet','Thomas',18,'0148303244',2,'2021-10-14 13:51:14','bababa'),(20,NULL,1,'Thomas','Hub',23,'0638395199',1,'2021-10-14 13:51:16','Projet Hub accepté'),(21,3,1,'Terosiet','Thomas',18,'0148303244',2,'2021-10-14 13:51:18','Ceci est un test pour la step07'),(22,NULL,1,'Axel','Axel',24,'0638395199',1,'2021-10-14 13:51:20','FU FU'),(23,3,1,'Thomas ','Bob',18,'0638395199',2,'2021-10-14 13:51:22','Fin de la branch dev avec la navbar test'),(24,3,5,'Thomas ','Bob',18,'0638395199',2,'2021-10-14 13:51:23','Je suis log donc je peux postulé directement cool'),(25,NULL,3,'Gurvan','Debile',23,'0638395199',1,'2021-10-14 12:45:40','Gurvan est un petit con'),(26,NULL,1,'Step05','Ravens',24,'0638394199',1,'2021-10-14 13:28:12','Step05 testing after copy crud for back');
/*!40000 ALTER TABLE `OFFERS_APPLY` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ROLES`
--

DROP TABLE IF EXISTS `ROLES`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ROLES` (
  `role` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='roles table';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ROLES`
--

LOCK TABLES `ROLES` WRITE;
/*!40000 ALTER TABLE `ROLES` DISABLE KEYS */;
INSERT INTO `ROLES` VALUES (1,'admin'),(2,'user'),(3,'recruiter');
/*!40000 ALTER TABLE `ROLES` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SEXE`
--

DROP TABLE IF EXISTS `SEXE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `SEXE` (
  `sexe` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`sexe`),
  UNIQUE KEY `SEXE_sexe_uindex` (`sexe`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SEXE`
--

LOCK TABLES `SEXE` WRITE;
/*!40000 ALTER TABLE `SEXE` DISABLE KEYS */;
INSERT INTO `SEXE` VALUES (1,'man'),(2,'woman');
/*!40000 ALTER TABLE `SEXE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USERS`
--

DROP TABLE IF EXISTS `USERS`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `USERS` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `firstname` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` int NOT NULL,
  `sexe` int DEFAULT NULL,
  `age` int NOT NULL,
  `compagny_id` int DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_id_uindex` (`id`),
  UNIQUE KEY `USERS_email_uindex` (`email`),
  KEY `Users_roles_role_fk` (`role`),
  KEY `Users_SEXE_sexe_fk` (`sexe`),
  KEY `USERS_COMPAGNIES_id_fk` (`compagny_id`),
  CONSTRAINT `USERS_COMPAGNIES_id_fk` FOREIGN KEY (`compagny_id`) REFERENCES `COMPAGNIES` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Users_roles_role_fk` FOREIGN KEY (`role`) REFERENCES `ROLES` (`role`),
  CONSTRAINT `Users_SEXE_sexe_fk` FOREIGN KEY (`sexe`) REFERENCES `SEXE` (`sexe`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='users tables';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USERS`
--

LOCK TABLES `USERS` WRITE;
/*!40000 ALTER TABLE `USERS` DISABLE KEYS */;
INSERT INTO `USERS` VALUES (2,'thomas.terosiet@epitech.eu','1234','Gohu','Hugo','123445678',2,1,24,NULL,'2021-10-03 00:38:16',NULL,1),(3,'tterosiet@gmail.com','$2b$10$MqwDXgm6LCMtGCjazRs/JeRKFXxKAzolNe4X/rgKXsxlcZ5cvUbZC','Pedro','Gohu','12345678',2,1,18,NULL,'2021-10-04 13:52:23',NULL,1),(4,'tterosiet+1@gmail.com','$2b$10$5LjwPe/YgMMoDmi4EiM78esDbK2fs8ejuwVUHvOhl1.NTj8ICgFhW','Larose','Theo','0638395199',2,2,24,NULL,'2021-10-04 13:52:23',NULL,1),(9,'tterosiet@protonmail.com','$2b$10$MaCMKfNOzyKXcUg4bozEA.UjksqKHnRJk3wPEpkCPPTuXEWmyORoe','Ravens','Boby','0638395199',1,2,25,NULL,'2021-10-04 13:52:23',NULL,1),(10,'tterosiet+2@gmail.com','$2b$10$Crz8/iXy4aFq.HxOYzbcQug75pf6ItFbZeM4Z1H/zC84WX0W7ic7y','CreateByAdmin','Thomas','0638395199',3,2,25,NULL,'2021-10-04 13:52:23',NULL,0),(12,'Axel@gmail.com','$2b$10$MXqwFI7qFgVt/inyLe2p7uefyLHWZGot1QTgvZweqjvim0sG1LpAy','Axel','Axel','1223444444',2,2,24,NULL,'2021-10-04 13:52:23',NULL,1);
/*!40000 ALTER TABLE `USERS` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-10-15  8:42:05
