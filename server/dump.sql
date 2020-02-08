-- MySQL dump 10.13  Distrib 8.0.19, for Linux (x86_64)
--
-- Host: localhost    Database: test
-- ------------------------------------------------------
-- Server version	8.0.19

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
-- Table structure for table `chapters`
--

DROP TABLE IF EXISTS `chapters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `chapters` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(128) DEFAULT NULL,
  `curriculum_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `removed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_index` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chapters`
--

LOCK TABLES `chapters` WRITE;
/*!40000 ALTER TABLE `chapters` DISABLE KEYS */;
INSERT INTO `chapters` VALUES (14,'c01',5,'chapter 05','2020-02-06 11:29:36',NULL,NULL),(15,'c01',5,'chapter 05','2020-02-06 11:32:30',NULL,NULL),(16,'c01',5,'chapter 05','2020-02-06 11:37:22',NULL,NULL);
/*!40000 ALTER TABLE `chapters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curriculums`
--

DROP TABLE IF EXISTS `curriculums`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `curriculums` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(128) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `removed_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_index` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curriculums`
--

LOCK TABLES `curriculums` WRITE;
/*!40000 ALTER TABLE `curriculums` DISABLE KEYS */;
INSERT INTO `curriculums` VALUES (5,'c1','더하기뺴기','2020-02-06 11:05:11',NULL,NULL),(6,'c2','나누기더하기','2020-02-08 13:05:51',NULL,NULL),(7,'c3','곱하기','2020-02-08 13:13:41',NULL,NULL);
/*!40000 ALTER TABLE `curriculums` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lessons`
--

DROP TABLE IF EXISTS `lessons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lessons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(128) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `chapter_id` int DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `removed_at` timestamp NULL DEFAULT NULL,
  `type` enum('LESSON') DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `uid_index` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lessons`
--

LOCK TABLES `lessons` WRITE;
/*!40000 ALTER TABLE `lessons` DISABLE KEYS */;
INSERT INTO `lessons` VALUES (74,'L01',14,'lesson 01','2020-02-06 11:34:32','2020-02-07 06:58:53',NULL,'LESSON'),(75,'L02',14,'lesson 02','2020-02-06 11:35:17','2020-02-07 06:58:53',NULL,'LESSON'),(76,'L02',15,'lesson 01','2020-02-07 05:15:20','2020-02-07 06:58:53',NULL,'LESSON'),(77,'L02',15,'lesson 02','2020-02-07 05:15:23','2020-02-07 06:58:53',NULL,'LESSON'),(78,'L02',15,'lesson 03','2020-02-07 05:15:25','2020-02-07 06:58:53',NULL,'LESSON'),(79,'L02',16,'lesson 01','2020-02-07 05:15:34','2020-02-07 06:58:53',NULL,'LESSON'),(80,'L02',16,'lesson 02','2020-02-07 05:15:37','2020-02-07 06:58:53',NULL,'LESSON'),(81,'L02',16,'lesson 03','2020-02-07 05:15:39','2020-02-07 06:58:53',NULL,'LESSON');
/*!40000 ALTER TABLE `lessons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `problems`
--

DROP TABLE IF EXISTS `problems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `problems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(45) NOT NULL,
  `uid` varchar(45) NOT NULL,
  `title` varchar(25) DEFAULT NULL,
  `question` mediumtext,
  `solution` mediumtext NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `problems`
--

LOCK TABLES `problems` WRITE;
/*!40000 ALTER TABLE `problems` DISABLE KEYS */;
INSERT INTO `problems` VALUES (9,'Problem','P01','problem 01','q','s'),(10,'Problem','P02','problem 02','q','s'),(11,'Problem','P03','problem 03','q','s');
/*!40000 ALTER TABLE `problems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staple_problem_relation`
--

DROP TABLE IF EXISTS `staple_problem_relation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staple_problem_relation` (
  `id` int NOT NULL AUTO_INCREMENT,
  `staple_id` varchar(45) NOT NULL,
  `problem_id` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staple_problem_relation`
--

LOCK TABLES `staple_problem_relation` WRITE;
/*!40000 ALTER TABLE `staple_problem_relation` DISABLE KEYS */;
INSERT INTO `staple_problem_relation` VALUES (3,'27','9'),(4,'27','10'),(5,'27','11'),(6,'28','9'),(7,'28','10'),(8,'28','11');
/*!40000 ALTER TABLE `staple_problem_relation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staples`
--

DROP TABLE IF EXISTS `staples`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staples` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` text,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified_at` timestamp NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `removed_at` timestamp NULL DEFAULT NULL,
  `parent_id` varchar(45) NOT NULL,
  `parent_type` enum('LESSON','CHAPTER') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staples`
--

LOCK TABLES `staples` WRITE;
/*!40000 ALTER TABLE `staples` DISABLE KEYS */;
INSERT INTO `staples` VALUES (24,'staple01','2020-02-07 06:32:41',NULL,NULL,'74','LESSON'),(25,'staple01','2020-02-07 06:33:18',NULL,NULL,'74','LESSON'),(26,'staple01','2020-02-07 06:38:37',NULL,NULL,'74','LESSON'),(27,'staple01','2020-02-07 06:39:00',NULL,NULL,'74','LESSON'),(28,'staple01','2020-02-07 06:39:02',NULL,NULL,'74','LESSON');
/*!40000 ALTER TABLE `staples` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-02-08 17:38:26
