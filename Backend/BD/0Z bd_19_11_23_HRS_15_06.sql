CREATE DATABASE  IF NOT EXISTS `sigedoes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sigedoes`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: sigedoes.cbtis66.edu.mx    Database: sigedoes
-- ------------------------------------------------------
-- Server version	8.0.35

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
-- Table structure for table `acreditadoglobales`
--

DROP TABLE IF EXISTS `acreditadoglobales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acreditadoglobales` (
  `idacreditadoGlobal` int NOT NULL AUTO_INCREMENT,
  `idglobales` int NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `idSolicitud` int NOT NULL,
  `acreditado` tinyint NOT NULL,
  `calificacion` decimal(10,2) NOT NULL,
  `idasiglobd` int NOT NULL,
  PRIMARY KEY (`idacreditadoGlobal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acreditadoglobales`
--

LOCK TABLES `acreditadoglobales` WRITE;
/*!40000 ALTER TABLE `acreditadoglobales` DISABLE KEYS */;
/*!40000 ALTER TABLE `acreditadoglobales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `acreditadorecursa`
--

DROP TABLE IF EXISTS `acreditadorecursa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acreditadorecursa` (
  `idacreditadoRecursa` int NOT NULL,
  `idrecursa` int NOT NULL,
  `numControl` varchar(14) NOT NULL,
  `idperiodoEscolar` varchar(30) NOT NULL,
  PRIMARY KEY (`idacreditadoRecursa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acreditadorecursa`
--

LOCK TABLES `acreditadorecursa` WRITE;
/*!40000 ALTER TABLE `acreditadorecursa` DISABLE KEYS */;
/*!40000 ALTER TABLE `acreditadorecursa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `administrativo`
--

DROP TABLE IF EXISTS `administrativo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrativo` (
  `numControl` varchar(44) NOT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(10) NOT NULL,
  `departamento` varchar(45) NOT NULL,
  `turno` varchar(45) NOT NULL,
  `CURP` varchar(20) NOT NULL,
  `nivelOperativo` varchar(45) DEFAULT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `twitter` varchar(45) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`numControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrativo`
--

LOCK TABLES `administrativo` WRITE;
/*!40000 ALTER TABLE `administrativo` DISABLE KEYS */;
INSERT INTO `administrativo` VALUES ('admin','CBTIS 66','2747431019','Control Escolar','Matutino','X',NULL,NULL,NULL,NULL),('admin@cbtis66.edu.mx','calle 16 de Septiembre  # 1605','2741145286','Control Escolar','Matutino','CODJ721205HVZRMR05','9',NULL,NULL,NULL);
/*!40000 ALTER TABLE `administrativo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alumno` (
  `numControl` varchar(44) NOT NULL,
  `fechaNac` varchar(45) DEFAULT NULL,
  `direccion` varchar(150) NOT NULL,
  `telefono` varchar(10) DEFAULT NULL,
  `especialidad` varchar(45) NOT NULL,
  `area` varchar(45) NOT NULL,
  `grado` varchar(45) NOT NULL,
  `grupo` varchar(45) NOT NULL,
  `turno` varchar(45) NOT NULL,
  `CTO` varchar(100) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `CURP` varchar(20) NOT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `twitter` varchar(45) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  `horario` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`numControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES ('1400025G87',NULL,'SSSSSSSSSSSSSSSSSSSSSS','','ELECTRICIDAD','FISICO-MATEMATICO','5','E','MATUTINO','30DCT0236O','jorge@cbtis66.edu.mx','CODJ721205HVZRMR05','lisaSimsomp','','',NULL),('21330050660276','2006-09-17','Landero y coss','2741154955','Programación','Físico Matemático','5','G','Matutino','30DCT0236O','almn.alexaacevedo@cbtis66.edu.mx','aepa060917mvzcvla9','','','','1'),('2133005660294','2006-06-21','Adolfo Lopez Mateos #310 ','2747416548','Programación','Físico Matemático','5','G','Matutino','30DCT0236O','almn.ingridduarte@cbtis66.edu.mx','DUGI060621MVRLNA1','Ingrid Duarte Gil','','Celeste Duarte Gil','1'),('22330050660315','2007-07-10','16 de Septiembre 1605','2741156348','Programación','Físico Matemático','5','G','Matutino','30DCT0236O','almn.silviacortes@cbtis66.edu.mx','COTS070710MVZRRLA5','','','','1');
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asiglobalum`
--

DROP TABLE IF EXISTS `asiglobalum`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asiglobalum` (
  `idasigloba` int NOT NULL,
  `numControl` varchar(14) NOT NULL,
  `materia` varchar(30) NOT NULL,
  `idperiodoEscolar` varchar(30) NOT NULL,
  PRIMARY KEY (`idasigloba`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiglobalum`
--

LOCK TABLES `asiglobalum` WRITE;
/*!40000 ALTER TABLE `asiglobalum` DISABLE KEYS */;
/*!40000 ALTER TABLE `asiglobalum` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asiglobd`
--

DROP TABLE IF EXISTS `asiglobd`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asiglobd` (
  `idasiglobd` int NOT NULL,
  `materia` varchar(45) NOT NULL,
  `idperiodoEscolar` varchar(30) NOT NULL,
  `lugar` varchar(10) NOT NULL,
  `hora` date NOT NULL,
  `docente` varchar(30) NOT NULL,
  PRIMARY KEY (`idasiglobd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asiglobd`
--

LOCK TABLES `asiglobd` WRITE;
/*!40000 ALTER TABLE `asiglobd` DISABLE KEYS */;
/*!40000 ALTER TABLE `asiglobd` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignaglobal`
--

DROP TABLE IF EXISTS `asignaglobal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignaglobal` (
  `idasiglobd` int NOT NULL AUTO_INCREMENT,
  `lugar` varchar(10) NOT NULL,
  `hora` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `idglobales` int NOT NULL,
  `status` int NOT NULL,
  `docenteDni` varchar(45) NOT NULL,
  PRIMARY KEY (`idasiglobd`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaglobal`
--

LOCK TABLES `asignaglobal` WRITE;
/*!40000 ALTER TABLE `asignaglobal` DISABLE KEYS */;
INSERT INTO `asignaglobal` VALUES (1,'D5','07:00 - 11:00','11-11-2023',2,0,'jorge@cbtis66.edu.mx');
/*!40000 ALTER TABLE `asignaglobal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignarecursa`
--

DROP TABLE IF EXISTS `asignarecursa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignarecursa` (
  `idasigrecursa` int NOT NULL AUTO_INCREMENT,
  `Lugar` varchar(45) NOT NULL,
  `hora` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `docenteDni` varchar(30) NOT NULL,
  `status` int NOT NULL,
  `idrecursa` int NOT NULL,
  PRIMARY KEY (`idasigrecursa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignarecursa`
--

LOCK TABLES `asignarecursa` WRITE;
/*!40000 ALTER TABLE `asignarecursa` DISABLE KEYS */;
/*!40000 ALTER TABLE `asignarecursa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asigrecuralumno`
--

DROP TABLE IF EXISTS `asigrecuralumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asigrecuralumno` (
  `idasigrecuralumno` int NOT NULL,
  `numControl` varchar(14) NOT NULL,
  `materia` varchar(30) NOT NULL,
  `idperiodoEscolar` varchar(30) NOT NULL,
  PRIMARY KEY (`idasigrecuralumno`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asigrecuralumno`
--

LOCK TABLES `asigrecuralumno` WRITE;
/*!40000 ALTER TABLE `asigrecuralumno` DISABLE KEYS */;
/*!40000 ALTER TABLE `asigrecuralumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asigrecurdoc`
--

DROP TABLE IF EXISTS `asigrecurdoc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asigrecurdoc` (
  `idasigrecurdoc` int NOT NULL,
  `materiadoc` varchar(45) NOT NULL,
  `idperiodoEscolar` varchar(30) NOT NULL,
  `Lugar` varchar(10) NOT NULL,
  `Hora` date NOT NULL,
  `Docente` varchar(30) NOT NULL,
  PRIMARY KEY (`idasigrecurdoc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asigrecurdoc`
--

LOCK TABLES `asigrecurdoc` WRITE;
/*!40000 ALTER TABLE `asigrecurdoc` DISABLE KEYS */;
/*!40000 ALTER TABLE `asigrecurdoc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docente`
--

DROP TABLE IF EXISTS `docente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docente` (
  `numControl` varchar(45) NOT NULL,
  `direccion` varchar(45) DEFAULT NULL,
  `gradoAcademico` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `RFC` varchar(45) NOT NULL,
  `CURP` varchar(45) NOT NULL,
  `CEDULA` varchar(45) NOT NULL,
  `facebook` varchar(45) DEFAULT NULL,
  `instagram` varchar(45) DEFAULT NULL,
  `twitter` varchar(45) DEFAULT NULL,
  `fechaNac` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`numControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente`
--

LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
INSERT INTO `docente` VALUES ('721205','','MSC SISTEMAS COMPUTACIONALES','2741145286','CODJ721205FC3','X','X','jorgecortes2','721205','',NULL),('jorge@cbtis66.edu.mx','calle 16 de Septiembre  # 1605','MSC SISTEMAS COMPUTACIONALES','2741145286','CODJ721205FC3','CODJ721205HVZRMR05','23131231232','','','','1972-12-05'),('jorgecd@cbtis66.edu.mx','calle 16 de Septiembre  # 1605','MSC SISTEMAS COMPUTACIONALES','+522741145286','CODJ721205FC3','CODJ721205HVZRMR05','23131231232','','','','2023-10-02');
/*!40000 ALTER TABLE `docente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `escuela`
--

DROP TABLE IF EXISTS `escuela`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `escuela` (
  `CTO` varchar(15) NOT NULL,
  `Esc_nombre` varchar(150) NOT NULL,
  `Esc_direccion` varchar(150) NOT NULL,
  `Esc_correo` varchar(45) NOT NULL,
  `Esc_telefono` varchar(12) NOT NULL,
  `Esc_Director` varchar(45) NOT NULL,
  `Esc_Periodo` varchar(45) NOT NULL,
  PRIMARY KEY (`CTO`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `escuela`
--

LOCK TABLES `escuela` WRITE;
/*!40000 ALTER TABLE `escuela` DISABLE KEYS */;
INSERT INTO `escuela` VALUES ('30DCT0236O','Centro de Bachillerato Tecnológico Industrial y de Servicios No. 066 “Agustín de Iturbide”','XXXX','XXXXX','XXXXX','MC DANIEL SERRA BERNAL','29 de Agosto al 13 de Diciembre del 2022');
/*!40000 ALTER TABLE `escuela` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especialidad`
--

DROP TABLE IF EXISTS `especialidad`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especialidad` (
  `idEspecialidad` int NOT NULL AUTO_INCREMENT,
  `Especailidad` varchar(45) NOT NULL,
  `clave` varchar(45) NOT NULL,
  `CTO` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idEspecialidad`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especialidad`
--

LOCK TABLES `especialidad` WRITE;
/*!40000 ALTER TABLE `especialidad` DISABLE KEYS */;
INSERT INTO `especialidad` VALUES (1,'Electriicidad','352100002-16','30DCT0236O'),(2,'Programación','352100002-16','30DCT0236O'),(3,'Soporte y Mantenimiento a Equipos de Cómputo','352100002-16','30DCT0236O'),(4,'Conservación de Alimentos','352100002-16','30DCT0236O'),(5,'Contabilidad','352100002-16','30DCT0236O');
/*!40000 ALTER TABLE `especialidad` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `forgotpassword`
--

DROP TABLE IF EXISTS `forgotpassword`;
/*!50001 DROP VIEW IF EXISTS `forgotpassword`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `forgotpassword` AS SELECT 
 1 AS `nombre`,
 1 AS `apellidoP`,
 1 AS `apellidoM`,
 1 AS `numControl`,
 1 AS `password`,
 1 AS `correo`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `globales`
--

DROP TABLE IF EXISTS `globales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `globales` (
  `idglobales` int NOT NULL AUTO_INCREMENT,
  `alumnoNumControl` varchar(45) NOT NULL,
  `docenteDni` varchar(45) NOT NULL,
  `idMateria` varchar(45) NOT NULL,
  `idperiodoescolar` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `estado` int NOT NULL,
  `calificacion` int DEFAULT NULL,
  `fechaCalificacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idglobales`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globales`
--

LOCK TABLES `globales` WRITE;
/*!40000 ALTER TABLE `globales` DISABLE KEYS */;
INSERT INTO `globales` VALUES (2,'1400025G87','721205','9','1','05/11/2023',0,0,NULL),(3,'1400025G87','721205','73','1','19/11/2023',0,NULL,NULL),(4,'21330050660276','721205','73','1','19/11/2023',0,NULL,NULL),(5,'2133005660294','721205','73','1','19/11/2023',0,NULL,NULL);
/*!40000 ALTER TABLE `globales` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `justificante`
--

DROP TABLE IF EXISTS `justificante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `justificante` (
  `idjustificante` int NOT NULL AUTO_INCREMENT,
  `numcontrol` varchar(45) NOT NULL,
  `motivo` varchar(300) NOT NULL,
  `periodo` varchar(50) NOT NULL,
  `inetutor` blob NOT NULL,
  `cartatutor` blob NOT NULL,
  `documentoreferencia` blob NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `estado` int NOT NULL DEFAULT '0',
  `correoTutor` varchar(45) NOT NULL,
  `nombreTutor` varchar(60) NOT NULL,
  `observaciones` varchar(400) DEFAULT NULL,
  `fechaEstado` varchar(45) DEFAULT NULL,
  `horas1` varchar(45) DEFAULT NULL,
  `horas2` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idjustificante`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justificante`
--

LOCK TABLES `justificante` WRITE;
/*!40000 ALTER TABLE `justificante` DISABLE KEYS */;
INSERT INTO `justificante` VALUES (0,'1400025G87','No se','10 al 13 de noviembre de 2023',_binary 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCACWAJYDASIAAhEBAxEB/8QAHQAAAAcBAQEAAAAAAAAAAAAAAAIDBAUGBwEICf/EADoQAAIBAwMCBAMHAgYCAwEAAAECAwQFEQAGEiExBxNBURQiYQgVIzJxgaFCkQkzUmKxwRZyJCVT0f/EABoBAAIDAQEAAAAAAAAAAAAAAAIEAAEDBQb/xAArEQACAgEDAgUDBQEAAAAAAAAAAQIRAwQSITFBBRMiUWEycYFSkbHB0fD/2gAMAwEAAhEDEQA/APfCdBpUY1wLjXQPQa8+z0lgIzroUnRgvTRwoxqAtnFU6OB6aA0ooGrQITidGC50YkDXOQxnRFpNhXwo5HtpCoiFXTyRejqRrzZ9sP7UtN4CbXuFomm+GvlfAk1mkAJMyedGkrAdBlBJ06nJVsgADN08GftB2jxe21SXy0xrGZIKaetd3zT0cs6hlphJhfMdSwQ4Ay3Tv0MhbW6uCSjXHcsk9KYpWjPdTj+2kTCR66atu2yXDcdVYaa5Q1Fwp2PxEVOfMMB5MMScc+X1VhhsHIOpEqca36GVIQCH21wqBpYropHrqrKaoQKasWz+k08eepUNjUEFz6anNqqRcDgd4zn+40LBiuS2gZ0GTRwMaBHtoTZCTLoaUK6GqsjQyAz10bHXRQ2hnQ7Q2xVRo2m8lTFEB5kqJntlgNLRurosiMGVh0YHIOrSXQBsUAxqE3xvjavhvtW4b03nd4rZZ7ZH5lRUSAnGSAAAOrMSQAoGSSANTLTRxrmRwv1J18lP8Qr7Slw8VPEyo8Mtu3Rm2rtWpalEUWVWprlys0rdBy4tyjXORxUlcc2JuEN8tpUntjuJz7Sf+IfvvxSuC7Z8Da657TsECZnqkcR11a/LvzTrEgGPlRsnrkkdB5Qj8ZfFWyXeuvNBv7cEFyuUqy1tStwmEtQ6jCmRuWXIHQZzjU9tDw8qb3ZK66W6nlea2SQfKEJHBuWTkdz0H6DOoC9eHu5UllqpbZMkY6kle2e2f/7ppeVB7bK25pR3JEL4heIe9vEgU8m8NwXW6yUq8YGra2Wo4DuQvmMcAkk9MamfD3xq3vtmqtNouO67zFt+3zB/gKKoaGMgk8/lQqCWy2T3bkck5OqpWWesppCJlIx/qI0jR0kE04iqcgYPUHr9NMxcdu3sKOE999z7JfZ/8WPCvcm27bZrDCbDdmhhWW31tte3yTO0YaNkDZSQvHxdQkjngQe2tmZcjtryF/hsbxum8PC/cnh9uaqhr6XZsqS0Aq40doKScMXjVj14Bo2JHoGUdsAewBFJhY6eMPj5QqkKf2Bxn9BrnZMkVJqxqVqhHyz7aI6479NOEKSJzRsjJU+hBBwQR6EEEEHqCCNGkip46aKpqqrylmlMKYhkkJYAnsinHRT1PTpoXJJWwHJsbKvtqw7Yh4zGX/UhH8jUFVGlpoZpkqjIIomkH4ZUMQCePXBHb21YaKKSiqreoOPMUlv3B6am5MkeSwE66O3bTeoqUpsyyzRCGMcpye8SnOHPf5ehyT0HU5wDpwwKkjHUaqE45E3HsHbQUnOhpvbJnrKm4I/QUk6wKPf8JHz+v4mP2GhqlkjJWg9rKb/5VUnGIE/vox3TU4JMKagSvp20APqdaSXBg5seUN8eWWee4U3OoeVgOTHiIwTw4jt+XBPrkn6DTuC+XCluKzU3lLRtA6yxYyxl5IUYH2A8zPvyHt0hYYY62nSpp5WRZBy+YdQfUEHqCOxHodJVVRJQV1ugCPIK6oenkI/KuIZZQ5746x8e4/N1zgaUitkkmvyHvbR3xg8Vn8PfC7c+9nCCS022aenyoINRxxECD0wZCo/fXyA8K/DHcHirulqgI85kmM1TKT25NklmPr39zr6OfbdqZaf7Mu72jLDmaBGK+gNbBn19e3r3/cZz9ljYNHt3w8t1Z5KfFXRBUyP64bqB/Y6ZlPyYOS6vg30sFmntl0RY/DnwbsO0LA9q+AhlM2PMPDuR2PXqdSd38L9rXCmaOqssDEJwDcBnHsT6/vrZaTbJip0kl4jkMgeuiVu34FpXdcE/QaQnik/UzuRzRXpj0Pnj45+A67cEt6sNKj0YOZI2TJT9CPTXlW/xNQ3Ey8EUDsqnX1m8QNoU93tc9FURjjIpXtr5uePfhJethXuWrlAmttQ58mZQenqVP103os3q2TZz/EcXo82C+567/wALO21klk8Sd2TMBTtQJboVH9cmGdyevTiPK/Xn9NfQAVJrRTxeWMo4bkvfGvnz/hbX9rfsnxHt0dSIpw0c8BxyZD5ZBfDArgHjnPuMg692TRzXBYxXVEsqxEkKD5StkEEOsfFXGD2YEZwe4GqyJ+dkS+P4OUpOUE2I2+aSqqrpcFqVlo6ytaWi49lhEaISPQhpEkkBHQiQH109q2X7voFephiBr3/zM5Y+TL0XAPXueuOgP6Evl8QFRQFUYAA6AaVnt1ZWUFvNLT+YIq5pZGyBwTyZVz1PXqyjp76DLHbCK9mid7Inz2/8hqKFZ0lgjoKWoXiOzvLUK3fr2iXofrq0NfIpXgmeEBoO2oGT7uoZmmrq+20cjKFZpqqJGKgkgd84HJun1PvpKmqFraeKqhkV0mjWRGXsysAQR+x1tBr6btkTrkll3GYdzVdRHCCZLZSNj3xNUj/r+dSq3+K3pDIIWejn/wAsg58pv/z+g/0+np0+UGnFoWukcsUySFqT4eRY2DGN0kdwHA/JkOcZxnGpCnki8uahrlZ6SpUpKqkgj/cpByD9R1HQjqNLqDj64dQ93uT1DuOCjr7svlNh6tHBHrmmh0NQDvAaypMLs6F0AZhgtiJFz6Z7fxoa0xY1sVhPIRrIfTRkj5HHppRUz30oqAaaFqGzU00fWlmVCxy3NOQP9iOv1Oddp6DyqhqueZ55SpRC4X8NSckLgDAPTPqeK5zjTrGjYyNZ+WrsLcZT9qLY9Rv/AMBN5beos/E/dzVkKDP4j05Eyp09SYwB6ZI1nX2c53rfCjbVTN8jihjQgnHVfl/5GvTRUFSrAEEYIOvHNXTbMtjbkte5btW0Ns2re66iMKzeRHxeQ1CkccEqI5kQf+mhzRuNMd0MqyM9OU9yikgWKKoV2UduWdVze/iLV7SoDHRWeW6VlR8sVOh45+pY9hrBfC/few6rd9RY9hzXdJaR+My1CTBCepwfMUYJHYdev7a37d9lhu9spGopfKnqISVkP9LY6fp10rLdHhqvudmDxypp2vgyW6y3+829btvrfP3LJK3y0VuYKkBPUK7nPI4x31mvjdss7s8La5aGU3Cpov8A5EMzAZl455dhj8pbt6jV2l+yJa9xblo9xbjNxrpY4DFU/GSq1PIxzl0jyeHQgBV6DHoeutJ3PtS2WOxraqKkijpYoRCkSrhQoGMAe2NDkjsanF9Coy81PHJUmee/sE7bprLX+dc4acPU1LEZAaOSKaEIEGfUSInT/cde/IYkhVYURURRhVUYAHsNeU/s82WSNbDQQ00apQ1pZ+gUtxm5M5P0SNQPfLfTXq9CWJOttLN5HOT9xHxXHHF5UY/p/t/6Bh7abmipXlMxpovMPd+A5H9++nfHPfXeAxnGmnyceht5IUdNEcdfbTrj6HXDGpPbVJUShqAT113j76XaMD00QjB7aKqLXAiy9cDQ0dlz6aGhLEOGNDXSc6500YJ1Rk6VA6aTXvnSq6jTKBwB1j2+/B3bt93Bc7jeqKGsivUkM6pLEv4E8KBA6nvkgA59xrYhqvbsc+Snl4Lwt5mP+f4zrOabjRvp5bcqZVLL4YUO0rXU3ZXLySryZvfAAySepOAB1OkrnPURWOjuMKMyRylenbv2/nVguG4oaqxpSVUvCM/JnOM51md/mttrWqh3Nv23W2hdhLFGjmKoWPHzEfPnJx3UDHp10pN2qR6PDDdKu/sl/hq9hu1BcLdG0jyI/ZlPodVHxE4MCkQypyBrM6fxu2jW1lJtDw5NyvNymlVPiArCKIE9ZJZX68QMnsScdAdXLc12jREirZl85Uy2OxPuNZTm9lM1lpp4Jrcmr7MZeE6rta92T4sI9Ne2rEgOBmF1kkMnryOfwsYHQFySANehY4gp15OvV+vMOz9jXSx3mOhCXyaSpcuVEtN8dEpTkFJUFX5kjGFVvqNetVdHCyRnKsOQP0OmNKkocHC8RlKeW5fb9jvEe2u4H01xWzoFsfXTVCFnGXRQMHtrjuc64H1aXJVnXGdJMo7aUJznRGxonySwvH1Oho2fpoatJIljDXQProY0YDVIECrpRRgaKBpQDOiKYNVW7tJUVE6xycGOVVsZwcYzjVqxqrXKNkqpQ39RJ0BadGd/APc7PaxeXPk1KCeKaF2TOQeOT0IbiQT9c47axnfX2fK+S8zXezR1F1M5OFqZ2cqc5B+YNy/uDr0wlDTtbYbX8PGKeGMRBVXiCB6gen7dtV2PcotNyq7Tl2FFIqB3GeQKK3ce3LH7aRyReNWel8L8XzabK5Yqv2atNGceFXg7cdnfEbm3DDFBVTg4jT+kHqfUk9e5JJPTTHfVze9Xj7oonPmTqVYqf8uIH5m/nA+pH11ZPEfxWqkaOyWizV9dXTgeXxiKQgH+oyHpgfT+NQe2bBNQ0klbdJVmudcedQ6jCrjPGNfZVyf3JPrpLLK+EP5NRl1OR6jUdX/3HwXvwQitM9BV7draWOVLbcY6qFWH+VzjAXBHYfI4IHcMwPQkHe8/h82OBn115i8P9yU+zd+PLWtDFT3GL4YzSwvKsT5Uo3BPmbqCvoBzySANb9ekuN4sckrG5SwtQzGWnW3CngqTwPyvHMROn6c1B7E40zi1ChBKjzviEH5t9nyTysoYfOvzdvmHXRiBkjPUAEj2z2/71BxJsbKV9yodrLVTxrIZJ1hWR8jvlsN+50LHWQy3e8Vds41EXk00jTUNKaqBhylURiRcu7jHzRrkIrIwA5nOi1fPKENpNOp0mAcY0wuN4nWakho4qZpWdviOM6vG0YQ/5eMNz5mMYYAYLfTSlBeKWuXHLy3AyVfpjt0IOCp69mAPQ4BAzpjHqITKaHmiN1Ojse40nrawQNoa7oaKyhmBjR1Gi40oo6Z1ERgxjSiDXFUtqas+16y6/NK7UsGPzgAux/2g9vXqR7dDnUSc3SBlJQVsiW4LjmyqD2ycagtwUpV1lUYB6HWwWvbFlt5SZbdHPMg4+bUL5r/XBbtn1xgai97bBtu5KHyqWpq7VKpLF6EIC/QgKyupGMkH5SjdB82M61lpppWmZLUwumYLfNzW3b8XCaQTVUhWOGnQks0jMFQMQDwBZlGT/ODqJprPHVyy1NdErVEjFnYZHU+n6alqLwo3hdN7XKms8FGln2/U0kMdZWyvA9dUMiyzELGspCosiJ82MtyPoMaNb/Bq9vIzVd4tcYc5JiaVz/YouubkwZ8r+ng6mDU6bCr3cme0lqp1iCLAnH1HHvqPuW3LaCBT0qxsfROn8a2pvBsrCywbtiSTHyl7cWX+wlGoK/8AhxLt+KrvVbf7WLZQU8lTNPO7QmOJFLOzAggAAE/m7DWMtDnStxGF4hgb4n/J5T8arHdLXtSuuFkss10qiqxClj/MQ7BOXQHoOQJ6dtbTsnxAg3q0Fl3nQ0MV5DxvT/HxyVME0iEcZIleTjDLxyCBjLYYE54Klt+013idY7Zvjbtvm+4LrTtJF8XUQ0skvGVgD5Ujq3A8FZSe/QgYCse13hBfb4TSwWtWDHi2JEcAe+UJH9zoY6bJGlsZU9Tgzr1TXxyv3/P9F2k2VNJIC+8NyQcURCkVWiqeKgZI4dSSCSfUk+mBqRtNiFojmRbpXVbzSmYzVMv4qtwVcBk44ACj699c2bs7xGsdDJb923air40I+FmBeWdEwBwckLz7dycjJyW6YTqrzc7RU+XfLRJHTEErVQBnVev9aY5IPYnv7adWltco5zyQ3bU7Faq21tzqG+8KgzwNA0XBvKYqHxyUM0f4igIoAfH5nyT8vGubho56CsWSQ5ESnmypICIAVDgsCXiBZhyyZE4KJVYcTxucFRBUxLNTzJLG35XRgyn9xppd7bHcKZkKguqMsYZmC9SpIIHcEqAfcZHYnS+XSqNOBcXZF26+SzzwRTwMEuFQ60WVcMsaoOXmsw4A+aJEGGIPKDGeeRNwNHURLJEwZWUMCPUHVFkMzVUkE8woDSz08d2qI6cTLGJ2Ip4wAhBkBSjDsvELGS2UIVhKeZf6qShuMU5glr5RV09LIrCOjgKR+fTnBzy81WyWTKmoAUHysaHHnknUi3EsjAg9BoaSt9dTXekSvoXLwyFgDj1DFSP2II9umhp1O+gAmo0oBooGNHXRdymTW0qSludxkpKjiVA4HPoWU4/61eLZZvhJQkErPGpIGTnscazTw+uCpuioid+sj8lH0j5A/wDI1sdsiMdIS2DyklZT7guT/wB6dwRVCGofJ14RHptUSwU0MlRUSpHFGpd3dsKqgZJJPYDS03Js4b11D7vpLXVbVu1Jfgj2+qopqepR3KCRJEKFOQIIJ5Y6EHr0I0w32FqsifD6azXra1NuyyPTzQbk/wDtjUwR8BU+YAEc9ASfLWNRy6gIoPbU+0fl+mm21bNRbb2vaNvW6jjpKW2UMFJDTxklIkRAoQE9wMY08lcE41UehbvuJEO/RRquXy0Q3qrO3ajyZI5o/MrIZAjiWmJKtG6HJKv1U9h36nqpsslRDRQS1lQSscKGRsKWOAM9AOpPsB1OqP4UWG/2iz3W/bm3JcLtX7ouc14RatWT7vpZMfD0aRkny1jjxlfR2k75zqSV8EtotdLY7RTIipQU6IgCqqRgBVHQAD0GNOpJ4IozHCuOntpCSRsHqdRzmWQlVbRJUUpWztXNTjJmkb9jqBuV5paSCaWipjI6qSTjqdTH3DLUnlOxKnr112eyUlNCkSQrznYIvTvoJU0bJ0Y5LHP94LcNqFqarlYF6IL+DUd+hHofT0H1HraLVdFu1L55gkp5ozwngk/NG/qPqPY+urDf0tGy6eWuo6VDXVX4UEecnkenTVDu9PXbe8Q7TRLOWFwos1insX4Mc/qGQfz76VywVWOYZvoxxfKagjuVJLUzVcUUgkz5T58slVDSqG5DoyU7FAvAGNpGB+bKUsNRJUQUz1aQV9xiaSacVAEESzxlGRAHDxkVAiYFSGYn5Wzy4zdyt63Kjald1AbvyiSRWX+pGVwQysMqw78WOCDgis1FqrttW+ipKSorJaeBkaWYTGV6qViI1haKQ8Uj5eS5ZXBAR8YLFm42fE024obT4HmwKuwtPc7LZTUO1OKetqGlphCoaoVsIvEBCFEePlyAABk40NH2/WxWyW43O7GKFJZUgkmDh25JyWNCQecihEKrIV+bg5ODgaGjw5KgkyNWyVx010YA10DOk6qT4ekmqcZ8qNnx+gJ07Zi0Q+0LnHRX2kuNUD5ZqSZcf6WJJ/nGt3tVzjnNLb0OWSjikY/VlB15uonZDGABk9Vz79Mf8a0HZG7fJuNRPVB8QRw06qMlmCxhVx9Txz+509jaXAhni3ya+6jkSRrOfGSv3hWW/b9g2HZaa5m47it0N4NQVEdNbUkM08nzEBjiIIAMn8TIGQNXmCvkqR51ZTLCHGREWyw/9vTUDXXS21W97ZYKWtgWspqKouMtMsiiXyeSRqxTuULMevT5kHsRrd+6MPgmgs6oA4C8QAMHSWT3J04I641HXy509htNRdZoJpxAvywwoXklckBURR1ZiSAAPfU6IrlsqM297XuzxAuPhjQUss527BS116qGRWp1abLQ0hHLJdlHmHKlQoHqwIurSZPzdtVxaSos1MyyVrVNTNI0s9U6Krysei8uIAPFQqD/AGoo9NRlVe6WIA1L1FSR3WN+OqXuX8FzZ4Md1H76iLhdaahy4AJA9NVttybWb5VS4wMR/Xkj/nUdcLlQVK4pqhn/APbOcaByDUDS4bhFNboKsdBKAAPqemkaieMVcdROQEpoZJST/T0xn+xOqnarv5kNotinJ+JXl+mempDedY8FvakgVnqa1lp0Re5GQT/JA/voJS4DS5IqzU7bs3G9/r8mktzFaeMjIL+g/bWa+K+4Gi8S4amGUotr8nzGHsOrD9CCRj9dbpbrbT2O109AhH4KEu3+pz1Zv+deZdyS/e9xvl2C5EtUwQ5z8uTjQtemjfE/VZs5Hf6aTlTzI2Tp1Gmm2qoV+3rZVlw7S0kRcg5+fiOQ/Y5Gml93NbbKGWaYPIBkIh65+ukn8jbt9Cn0NHbi88W8K9Yq544Y6yt4R1MaPEZCkaRyZYRvJPWFG4d4ZV5YCDQ1iPjBvi5XTc5o5zRU1vmQVIgeASPLIqhFbJ6KqgydARkyucEknQ1x574ScbHYY1KNtHqtB103u54WyoPvGR/fp/3oaGuyvqEJdCqxUoms6zDHOKUoSfUempnYsqvuqjWoTkXAfp6lSBk/XqdDQ09FCUujN3mhGeWdUiy2SxVPi1fd2JTzC8UtlobM8rP+H8P5s84Cr7lpOpP+kYA6kjQ1sK0n1LwEBPXVJrNr3K6+JsO7qvcM/wB12K3vRUdnROEfxkxDS1UjA/iERcI0Uj5cyEfmOhoatPkur6k9W0q1MRUn06az+51P3fJJEIUYg9DoaGqn0Jj5ZHU98HnhKmkSRG9h106rKOlnQVFOpjyM4OhoaXHEhvbKhqW6Ukw6mKZGx79dWusqTUblWcLgwfLFk/lYj839yf40NDVR5YMug83VVSUG37pVBmZqakKjJ6lm+XP86wUUKLtCWpY5eWVmJ/TQ0NHIvCTdpvE1k8MKOpgUGVjLEp9FzK/XVCq5ZZp3mnkaR3OSzHJOhoaQyfUdTGlVmSeN1orblT2/7vqoqeQSNzZ05cgB0H8nQ0NDXKz8TY1Dof/Z','','','dias','16/11/2023',1,'lamassabrosa@gmail.com','Yolanda Martinez Rosas','l,akjhd,ajkhgdljkadlkjabdlkajhsdlkajhsdlkajshhdlkjahshdlkjashdkluajhs',NULL,'alumno.horas1','alumno.horas2'),(1,'2133005660294','0','12:00 a 15:00','','','','horas','16/11/2023',2,'elaragannuevacharga@gmail.com','Elfo Lopez Luna','asss',NULL,'alumno.horas1','alumno.horas2'),(3,'21330050660276','0','13 de noviembre de 2023','','','','dias','17/11/2023',1,'elmasterco@gmail.com','Pedro Lopez Lopez','',NULL,NULL,NULL);
/*!40000 ALTER TABLE `justificante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `listausernoreg`
--

DROP TABLE IF EXISTS `listausernoreg`;
/*!50001 DROP VIEW IF EXISTS `listausernoreg`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listausernoreg` AS SELECT 
 1 AS `password`,
 1 AS `nombre`,
 1 AS `apellidoP`,
 1 AS `numControl`,
 1 AS `apellidoM`,
 1 AS `correo`,
 1 AS `grado`,
 1 AS `grupo`,
 1 AS `turno`,
 1 AS `especialidad`,
 1 AS `rol`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `mantenimiento`
--

DROP TABLE IF EXISTS `mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mantenimiento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fecha_ini` date NOT NULL,
  `fecha_fin` date NOT NULL,
  `idUser` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mantenimiento`
--

LOCK TABLES `mantenimiento` WRITE;
/*!40000 ALTER TABLE `mantenimiento` DISABLE KEYS */;
/*!40000 ALTER TABLE `mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materias`
--

DROP TABLE IF EXISTS `materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materias` (
  `idMateria` int NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(250) NOT NULL,
  `semestre` varchar(45) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `especialidad` varchar(100) DEFAULT NULL,
  `modulo` varchar(145) DEFAULT NULL,
  `periodo` varchar(45) NOT NULL,
  PRIMARY KEY (`idMateria`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materias`
--

LOCK TABLES `materias` WRITE;
/*!40000 ALTER TABLE `materias` DISABLE KEYS */;
INSERT INTO `materias` VALUES (1,'Geometría y Trigonometría','2','BASICA','','','2'),(2,'Inglés II','2','BASICA','','','2'),(3,'Química II','2','BASICA','','','2'),(4,'Lectura, Expresión Oral y Escrita II','2','BASICA','','','2'),(5,'S2 Aplica estructuras de control con un lenguaje de programación','2','PROFESIONAL','PROGRAMACION','1','2'),(6,'S3 Aplica estructuras de datos con un lenguaje de programación','2','PROFESIONAL','PROGRAMACION','1','2'),(9,'Geometría Analítica','3','BASICA',NULL,NULL,'1'),(10,'Inglés III','3','BASICA',NULL,NULL,'1'),(11,'Biología','3','BASICA',NULL,NULL,'1'),(12,'Ética','3','BASICA',NULL,NULL,'1'),(13,'S1 Aplica la metodología espiral con programación orientada a objetos','3','PROFESIONAL','PROGRAMACION','2','1'),(14,'S2 Aplica la metodología de desarrollo rápido de aplicaciones con programación orientada a eventos','3','PROFESIONAL','PROGRAMACION','2','1'),(65,'Cálculo Diferencial','4','BASICA',NULL,NULL,'2'),(66,'Inglés IV','4','BASICA',NULL,NULL,'2'),(67,'Física I','4','BASICA',NULL,NULL,'2'),(68,'Ecología','4','BASICA',NULL,NULL,'2'),(69,'S1 - Construye páginas Web','4','PROFESIONAL','PROGRAMACION','3','2'),(70,'S2 - Desarrolla aplicaciones que se ejecutan en el cliente','4','PROFESIONAL','PROGRAMACION','3','2'),(71,'S3 - Desarrolla aplicaciones que se ejecutan en el servidor','4','PROFESIONAL','PROGRAMACION','3','2'),(72,'S1 Construye algoritmos para la solución de problemas','2','PROFESIONAL','PROGRAMACION','1','2'),(73,'Cálculo Integral','5','BASICA',NULL,NULL,'1'),(74,'Inglés V','5','BASICA',NULL,NULL,'1'),(75,'Física II','5','BASICA',NULL,NULL,'1'),(76,'Ciencia, Tecnología, Sociedad y Valores','5','BASICA',NULL,NULL,'1'),(77,'S1 Construye bases de datos para aplicaciones Web','5','PROFESIONAL','PROGRAMACION','4','1'),(78,'S2 Desarrolla aplicaciones Web con conexión a bases de datos','5','PROFESIONAL','PROGRAMACION','4','1'),(79,'Probabilidad y Estadística','6','BASICA',NULL,NULL,'2'),(80,'Temas de Filosofía','6','BASICA',NULL,NULL,'2'),(81,'Temas de Física','6','PROPEDEUTICA',NULL,NULL,'2'),(82,'Dibujo Técnico','6','PROPEDEUTICA',NULL,NULL,'2'),(83,'Matemáticas Aplicadas','6','PROPEDEUTICA',NULL,NULL,'2'),(84,'Temas de Administración','6','PROPEDEUTICA',NULL,NULL,'2'),(85,'Introducción a la Economía','6','PROPEDEUTICA',NULL,NULL,'2'),(86,'Introducción al Derecho','6','PROPEDEUTICA',NULL,NULL,'2'),(87,'Introducción a la Bioquímica','6','PROPEDEUTICA',NULL,NULL,'2'),(88,'Temas de Biología Contemporánea','6','PROPEDEUTICA',NULL,NULL,'2'),(89,'Temas de Ciencias de la Salud','6','PROPEDEUTICA',NULL,NULL,'2'),(90,'Temas de Ciencias Sociales','6','PROPEDEUTICA',NULL,NULL,'2'),(91,'Literatura','6','PROPEDEUTICA',NULL,NULL,'2'),(92,'Historia','6','PROPEDEUTICA',NULL,NULL,'2'),(93,'S1 Desarrolla aplicaciones móviles para Android','6','PROFESIONAL','PROGRAMACION','5','2'),(94,'S2 - Desarrolla aplicaciones móviles para IOS','6','PROFESIONAL','PROGRAMACION','5','2');
/*!40000 ALTER TABLE `materias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mercadopago`
--

DROP TABLE IF EXISTS `mercadopago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mercadopago` (
  `id` int NOT NULL,
  `status` varchar(45) DEFAULT NULL,
  `detalleStatus` varchar(45) DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `monto` decimal(10,2) DEFAULT NULL,
  `comisionMercadoPago` decimal(10,2) DEFAULT NULL,
  `total` decimal(10,2) DEFAULT NULL,
  `correo` varchar(45) DEFAULT NULL,
  `urlNotificacion` varchar(245) DEFAULT NULL,
  `fecha_aprobacion` varchar(45) DEFAULT NULL,
  `payment_type` varchar(45) DEFAULT NULL,
  `merchant_order_id` varchar(45) DEFAULT NULL,
  `numControl` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mercadopago`
--

LOCK TABLES `mercadopago` WRITE;
/*!40000 ALTER TABLE `mercadopago` DISABLE KEYS */;
INSERT INTO `mercadopago` VALUES (1315885810,'approved','accredited','Pago Constancia',80.00,7.88,72.12,'test_user_80507629@testuser.com','https://backendsigedoes.onrender.com/pagos/webhook-constancias','2023-11-12T18:44:04.573-04:00','account_money','13263950400','21330050660276'),(1319476649,'approved','accredited','Pago Constancia',80.00,7.88,72.12,'test_user_80507629@testuser.com','https://e6c0-177-247-65-134.ngrok.io/pagos/webhook-constancias','2023-11-10T21:15:26.729-04:00','account_money','13215142871','1400025G87'),(1319486735,'approved','accredited','Pago Constancia',80.00,7.88,72.12,'test_user_80507629@testuser.com','https://backendsigedoes.onrender.com/pagos/webhook-constancias','2023-11-12T17:50:28.649-04:00','account_money','13259559795',NULL),(1319487359,'approved','accredited','Pago Constancia',80.00,7.88,72.12,'test_user_80507629@testuser.com','https://backendsigedoes.onrender.com/pagos/webhook-constancias','2023-11-12T19:38:07.384-04:00','account_money','13261859531','22330050660315');
/*!40000 ALTER TABLE `mercadopago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `pdf`
--

DROP TABLE IF EXISTS `pdf`;
/*!50001 DROP VIEW IF EXISTS `pdf`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pdf` AS SELECT 
 1 AS `numControl`,
 1 AS `nombre`,
 1 AS `apellidoP`,
 1 AS `apellidoM`,
 1 AS `direccion`,
 1 AS `especialidad`,
 1 AS `area`,
 1 AS `grado`,
 1 AS `grupo`,
 1 AS `turno`,
 1 AS `horario`,
 1 AS `CTO`,
 1 AS `Esc_nombre`,
 1 AS `Esc_direccion`,
 1 AS `Esc_correo`,
 1 AS `Esc_Director`,
 1 AS `Esc_telefono`,
 1 AS `Esc_Periodo`,
 1 AS `clave`,
 1 AS `CURP`,
 1 AS `correo`,
 1 AS `foto`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `periodoescolar`
--

DROP TABLE IF EXISTS `periodoescolar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `periodoescolar` (
  `idperiodoescolar` int NOT NULL AUTO_INCREMENT,
  `periodoescolar` varchar(45) NOT NULL,
  `anio` varchar(45) NOT NULL,
  `periodo` int NOT NULL,
  PRIMARY KEY (`idperiodoescolar`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `periodoescolar`
--

LOCK TABLES `periodoescolar` WRITE;
/*!40000 ALTER TABLE `periodoescolar` DISABLE KEYS */;
INSERT INTO `periodoescolar` VALUES (1,'SEMESTRAL 1 - 2023','2023',1),(2,'SEMESTRAL 2 - 2023','2023',2),(3,'SEMESTRAL 1 - 2022','2022',1),(4,'SEMESTRAL 2 - 2022','2022',2),(5,'SEMESTRAL 1 - 2021','2021',1),(6,'SEMESTRAL 2 - 2021','2021',2),(7,'SEMESTRAL 1 - 2020','2020',1),(8,'SEMESTRAL 2 - 2020','2020',2),(9,'SEMESTRAL 1 - 2019','2019',1),(10,'SEMESTRAL 2 - 2019','2019',2),(11,'SEMESTRAL 1 - 2018','2018',1),(12,'SEMESTRAL 2 - 2018','2018',2),(13,'SEMESTRAL 1 - 2017','2017',1),(14,'SEMESTRAL 2 - 2017','2017',2);
/*!40000 ALTER TABLE `periodoescolar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `querydocente`
--

DROP TABLE IF EXISTS `querydocente`;
/*!50001 DROP VIEW IF EXISTS `querydocente`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `querydocente` AS SELECT 
 1 AS `nombre`,
 1 AS `apellidoP`,
 1 AS `apellidoM`,
 1 AS `numControl`,
 1 AS `gradoAcademico`,
 1 AS `telefono`,
 1 AS `RFC`,
 1 AS `CURP`,
 1 AS `CEDULA`,
 1 AS `correo`,
 1 AS `foto`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `recursa`
--

DROP TABLE IF EXISTS `recursa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recursa` (
  `idrecursa` int NOT NULL,
  `numControl` varchar(14) NOT NULL,
  `materia` varchar(100) NOT NULL,
  `idperiodoEscolar` varchar(30) NOT NULL,
  PRIMARY KEY (`idrecursa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recursa`
--

LOCK TABLES `recursa` WRITE;
/*!40000 ALTER TABLE `recursa` DISABLE KEYS */;
/*!40000 ALTER TABLE `recursa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recursas`
--

DROP TABLE IF EXISTS `recursas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recursas` (
  `idrecursa` int NOT NULL AUTO_INCREMENT,
  `alumnoNumControl` varchar(45) NOT NULL,
  `idMateria` varchar(100) NOT NULL,
  `idperiodoescolar` varchar(45) NOT NULL,
  `docenteDni` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `estado` int NOT NULL,
  PRIMARY KEY (`idrecursa`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recursas`
--

LOCK TABLES `recursas` WRITE;
/*!40000 ALTER TABLE `recursas` DISABLE KEYS */;
/*!40000 ALTER TABLE `recursas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `registro`
--

DROP TABLE IF EXISTS `registro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `registro` (
  `idregistro` int NOT NULL AUTO_INCREMENT,
  `numControl` varchar(14) NOT NULL,
  `admin` varchar(14) NOT NULL,
  `fecha_registro` date NOT NULL,
  PRIMARY KEY (`idregistro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `registro`
--

LOCK TABLES `registro` WRITE;
/*!40000 ALTER TABLE `registro` DISABLE KEYS */;
/*!40000 ALTER TABLE `registro` ENABLE KEYS */;
UNLOCK TABLES;

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
  `idglobales` int DEFAULT NULL,
  `idrecursa` int DEFAULT NULL,
  PRIMARY KEY (`idSolicitud`),
  UNIQUE KEY `codigoPago_UNIQUE` (`codigoPago`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitud`
--

LOCK TABLES `solicitud` WRITE;
/*!40000 ALTER TABLE `solicitud` DISABLE KEYS */;
INSERT INTO `solicitud` VALUES (15,'admin',' dinKek98vF28','2022-11-02','a',90,'JORGE CORTES DOMINGUEZ',0,0,NULL),(16,'1400025G87',' 3tYZfwHc&AVl','2022-11-02','aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',90,'JORGE CORTES DOMINGUEZ',0,0,NULL),(17,'721205',' gFn1KNmbeJuB','2022-11-02','zsDSADASDASDASDASD',95,'JORGE CORTES DOMINGUEZ',0,0,NULL),(18,'1400025G87','xHFQKVJHt5IW','2022-11-03','mucho descripcion',60,'JORGE CORTES DOMINGUEZ',0,0,NULL),(19,'1400025G87','0Z43mY7roF@K','2022-11-03','cccccccccccccccccccccccccccccc',90,'JORGE CORTES DOMINGUEZ',1,0,NULL),(20,'1400025G87','0Z43mY7roF@p','2023-11-06','global de ',220,'JORGE CORTES DOMINGUEZ',0,2,NULL),(23,'1400025G87','1319476649','2023-11-11','Pago de constancia de estudios',80,'MERCADO PAGO',1,0,0),(24,'21330050660276','1315885810','2023-11-12','Pago de constancia de estudios',80,'MERCADO PAGO',0,0,0),(25,'22330050660315','1319487359','2023-11-12','Pago de constancia de estudios',80,'MERCADO PAGO',1,0,0);
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUser` int DEFAULT NULL,
  `userName` varchar(45) NOT NULL,
  `numControl` varchar(45) NOT NULL,
  `password` varchar(14) NOT NULL,
  `rol` varchar(14) NOT NULL,
  `nombre` varchar(75) NOT NULL,
  `apellidoP` varchar(45) NOT NULL,
  `apellidoM` varchar(45) NOT NULL,
  `foto` blob,
  `alta` int DEFAULT '0',
  `correo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`numControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (2,'1400025G87','1400025G87','12345678','AL','LIZ','CASTRO','LUNA',_binary 'data:image/jpeg;base64,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',1,'jorge@cbtis66.edu.mx'),(4,'guille','170606','Hola1234','OE','GUILLERMO','LOPEZ','PEREZ',NULL,1,'guille@gmail.com'),(NULL,'21330050660276','21330050660276','123456789','AL','Alexa','Acevedo','Pavón',_binary 'data:image/jpeg;base64,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',1,'almn.alexaacevedo@cbtis66.edu.mx'),(NULL,'2133005660294','2133005660294','12345','AL','Ingrid Samanta','Duarte','Gil',_binary '.././assets/img/tufoto.png',1,'almn.ingridduarte@cbtis66.edu.mx'),(NULL,'22330050660315','22330050660315','E1f2g3h4','AL','SILVIA EDITR','CORTES','TORALES',_binary 'data:image/jpeg;base64,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',1,'almn.silviacortes@cbtis66.edu.mx'),(3,'721205','721205','1205','DO','JORGE','CORTES','DOMINGUEZ',_binary 'data:image/jpeg;base64,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',1,NULL),(1,'admin','admin','1205','CE','JORGE','CORTES','DOMINGUEZ',_binary 'data:image/jpeg;base64,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',1,NULL),(NULL,'admin@cbtis66.edu.mx','admin@cbtis66.edu.mx','E1f2g3h4','CE','JORGE','cortes','DOMINGUEZ',_binary 'data:image/jpeg;base64,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',1,'admin@cbtis66.edu.mx'),(NULL,'jorge@cbtis66.edu.mx','jorge@cbtis66.edu.mx','E1f2g3h4','DO','JORGE','CORTES','DOMINGUEZ',_binary 'data:image/jpeg;base64,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',1,'jorge@cbtis66.edu.mx'),(NULL,'jorgecd@cbtis66.edu.mx','jorgecd@cbtis66.edu.mx','123','DO','JORGE','XXXXXX','CORTES DOMINGUEZ',_binary 'data:image/jpeg;base64,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',1,'jorgecd@cbtis66.edu.mx');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'sigedoes'
--

--
-- Dumping routines for database 'sigedoes'
--
/*!50003 DROP PROCEDURE IF EXISTS `login` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`sigedoes`@`%` PROCEDURE `login`(IN `dato1` varchar(44), IN `dato2` varchar(44))
BEGIN
select usuario.nombre as nombre,usuario.apellidoP as apellidoP, usuario.apellidoM as apellidoM, usuario.rol as rol, usuario.numControl as numControl 
from usuario  
where usuario.numControl = dato1 and usuario.password = dato2 and usuario.alta = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `forgotpassword`
--

/*!50001 DROP VIEW IF EXISTS `forgotpassword`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sigedoes`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `forgotpassword` AS select `usuario`.`nombre` AS `nombre`,`usuario`.`apellidoP` AS `apellidoP`,`usuario`.`apellidoM` AS `apellidoM`,`usuario`.`numControl` AS `numControl`,`usuario`.`password` AS `password`,`usuario`.`correo` AS `correo` from `usuario` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `listausernoreg`
--

/*!50001 DROP VIEW IF EXISTS `listausernoreg`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sigedoes`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `listausernoreg` AS select `usuario`.`password` AS `password`,`usuario`.`nombre` AS `nombre`,`usuario`.`apellidoP` AS `apellidoP`,`usuario`.`numControl` AS `numControl`,`usuario`.`apellidoM` AS `apellidoM`,`usuario`.`correo` AS `correo`,`alumno`.`grado` AS `grado`,`alumno`.`grupo` AS `grupo`,`alumno`.`turno` AS `turno`,`alumno`.`especialidad` AS `especialidad`,`usuario`.`rol` AS `rol` from (`usuario` join `alumno` on((`alumno`.`numControl` = `usuario`.`numControl`))) where (`usuario`.`alta` = 0) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `pdf`
--

/*!50001 DROP VIEW IF EXISTS `pdf`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sigedoes`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `pdf` AS select `alumno`.`numControl` AS `numControl`,`usuario`.`nombre` AS `nombre`,`usuario`.`apellidoP` AS `apellidoP`,`usuario`.`apellidoM` AS `apellidoM`,`alumno`.`direccion` AS `direccion`,`alumno`.`especialidad` AS `especialidad`,`alumno`.`area` AS `area`,`alumno`.`grado` AS `grado`,`alumno`.`grupo` AS `grupo`,`alumno`.`turno` AS `turno`,`alumno`.`horario` AS `horario`,`alumno`.`CTO` AS `CTO`,`escuela`.`Esc_nombre` AS `Esc_nombre`,`escuela`.`Esc_direccion` AS `Esc_direccion`,`escuela`.`Esc_correo` AS `Esc_correo`,`escuela`.`Esc_Director` AS `Esc_Director`,`escuela`.`Esc_telefono` AS `Esc_telefono`,`escuela`.`Esc_Periodo` AS `Esc_Periodo`,`especialidad`.`clave` AS `clave`,`alumno`.`CURP` AS `CURP`,`usuario`.`correo` AS `correo`,`usuario`.`foto` AS `foto` from (((`alumno` join `escuela` on((`escuela`.`CTO` = `alumno`.`CTO`))) join `usuario` on((`usuario`.`numControl` = `alumno`.`numControl`))) join `especialidad` on((`especialidad`.`CTO` = `escuela`.`CTO`))) group by `alumno`.`numControl`,`especialidad`.`clave` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `querydocente`
--

/*!50001 DROP VIEW IF EXISTS `querydocente`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`sigedoes`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `querydocente` AS select `usuario`.`nombre` AS `nombre`,`usuario`.`apellidoP` AS `apellidoP`,`usuario`.`apellidoM` AS `apellidoM`,`docente`.`numControl` AS `numControl`,`docente`.`gradoAcademico` AS `gradoAcademico`,`docente`.`telefono` AS `telefono`,`docente`.`RFC` AS `RFC`,`docente`.`CURP` AS `CURP`,`docente`.`CEDULA` AS `CEDULA`,`usuario`.`correo` AS `correo`,`usuario`.`foto` AS `foto` from (`usuario` join `docente` on((`usuario`.`numControl` = `docente`.`numControl`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-19 15:08:13
