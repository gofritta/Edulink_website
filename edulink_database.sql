CREATE DATABASE  IF NOT EXISTS `edulink` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `edulink`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: edulink
-- ------------------------------------------------------
-- Server version	8.0.36

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
  `id_s` int NOT NULL,
  `id_t` int NOT NULL,
  `rating_t` tinyint unsigned NOT NULL,
  PRIMARY KEY (`id_s`,`id_t`),
  KEY `id_t_idx` (`id_t`),
  CONSTRAINT `id_s2` FOREIGN KEY (`id_s`) REFERENCES `student` (`id_s`),
  CONSTRAINT `id_t1` FOREIGN KEY (`id_t`) REFERENCES `teacher` (`id_t`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `id_s` int NOT NULL,
  `id_sch` int NOT NULL,
  `comment` longtext,
  `rating_sch` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id_s`,`id_sch`),
  UNIQUE KEY `reviewcol_UNIQUE` (`rating_sch`),
  KEY `id_sch_idx` (`id_sch`),
  CONSTRAINT `id_s1` FOREIGN KEY (`id_s`) REFERENCES `student` (`id_s`),
  CONSTRAINT `id_sch1` FOREIGN KEY (`id_sch`) REFERENCES `school` (`id_sch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='relation between school and student\n';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `school`
--

DROP TABLE IF EXISTS `school`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `school` (
  `id_sch` int NOT NULL AUTO_INCREMENT,
  `name_sch` varchar(45) NOT NULL,
  `email_sch` varchar(60) NOT NULL,
  `password_sch` varchar(45) NOT NULL,
  `state_sch` varchar(45) NOT NULL,
  `adress_sch` varchar(45) NOT NULL,
  `number_sch` varchar(45) NOT NULL,
  PRIMARY KEY (`id_sch`),
  UNIQUE KEY `id_sch_UNIQUE` (`id_sch`),
  UNIQUE KEY `email_sch_UNIQUE` (`email_sch`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `student`
--

DROP TABLE IF EXISTS `student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `student` (
  `id_s` int NOT NULL AUTO_INCREMENT,
  `name_s` varchar(45) NOT NULL,
  `gender_s` varchar(6) DEFAULT NULL,
  `birthdate_s` date DEFAULT NULL,
  `email_s` varchar(45) DEFAULT NULL,
  `password_s` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id_s`),
  UNIQUE KEY `email_s_UNIQUE` (`email_s`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `teacher`
--

DROP TABLE IF EXISTS `teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teacher` (
  `id_t` int NOT NULL AUTO_INCREMENT,
  `name_t` varchar(45) NOT NULL,
  `gender_t` varchar(6) NOT NULL,
  `birthdate_t` date NOT NULL,
  `employment_t` int NOT NULL,
  `speciality` varchar(45) NOT NULL,
  PRIMARY KEY (`id_t`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `work for`
--

DROP TABLE IF EXISTS `work for`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `work for` (
  `id_sch` int NOT NULL,
  `id_t` int NOT NULL,
  PRIMARY KEY (`id_sch`,`id_t`),
  KEY `id_t2_idx` (`id_t`),
  CONSTRAINT `id_sch2` FOREIGN KEY (`id_sch`) REFERENCES `school` (`id_sch`),
  CONSTRAINT `id_t2` FOREIGN KEY (`id_t`) REFERENCES `teacher` (`id_t`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-26  3:16:49
