CREATE DATABASE  IF NOT EXISTS `constancias` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `constancias`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: constancias
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `solicitud`
--

DROP TABLE IF EXISTS `solicitud`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitud` (
  `idSolicitud` int NOT NULL AUTO_INCREMENT,
  `numControl` varchar(14) NOT NULL,
  `codigoPago` varchar(15) NOT NULL,
  `fechaSolicitud` date NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `aportacion` decimal(10,0) NOT NULL,
  `emitio` varchar(45) NOT NULL,
  `activo` int NOT NULL,
  PRIMARY KEY (`idSolicitud`),
  UNIQUE KEY `codigoPago_UNIQUE` (`codigoPago`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES (15,'admin',' dinKek98vF28','2022-11-02','a',90,'JORGE CORTES DOMINGUEZ',0),(16,'1400025G87',' 3tYZfwHc&AVl','2022-11-02','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',90,'JORGE CORTES DOMINGUEZ',0),(17,'721205',' gFn1KNmbeJuB','2022-11-02','zsDSADASDASDASDASD',95,'JORGE CORTES DOMINGUEZ',0),(18,'1400025G87','xHFQKVJHt5IW','2022-11-03','mucho descripcion',60,'JORGE CORTES DOMINGUEZ',0),(19,'1400025G87','0Z43mY7roF@K','2022-11-03','cccccccccccccccccccccccccccccc',90,'JORGE CORTES DOMINGUEZ',1);
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-11-03 17:07:27
