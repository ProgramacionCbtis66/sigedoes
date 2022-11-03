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
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `numControl` varchar(14) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `especialidad` varchar(45) NOT NULL,
  `area` varchar(45) NOT NULL,
  `grado` varchar(45) NOT NULL,
  `grupo` varchar(45) NOT NULL,
  `turno` varchar(45) NOT NULL,
  `horario` varchar(45) NOT NULL,
  `CTO` varchar(100) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `alta` int NOT NULL,
  `CURP` varchar(20) NOT NULL,
  PRIMARY KEY (`numControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES ('1400025G87','LIZ CASTRO LUNA','SSSSSSSSSSSSSSSSSSSSSS','ELECTRICIDAD','FISICO-MATEMATICO','Quinto','E','MATUTINO','07:00 a 15:00 hrs','30DCT0236O','jorge@cbtis66.edu.mx',1,'CODJ721205HVZRMR05'),('721205','Jorge Cortés Domínguez','16 de Septiembre 1605','Programacion','a','5','G','Matutino','si','30DCT0236O','jorge@cbtis66.edu.mx',1,'CODJ721205HVZRMR05'),('admin','JORGE CORTES DOMINGUEZ','16 DE SEPTIEMPRE 1605','PROGRAMACION','FISICO-MATEMATICO','Tercer','G','MATUTINO','07:00 a 15:00 hrs','30DCT0236O','jorge@cbtis66.edu.mx',1,'CODJ721205HVZRMR05');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
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
