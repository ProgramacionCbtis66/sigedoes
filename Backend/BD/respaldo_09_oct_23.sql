CREATE DATABASE  IF NOT EXISTS `sigedoes` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `sigedoes`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: sigedoes
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
-- Table structure for table `acreditadoglobales`
--

DROP TABLE IF EXISTS `acreditadoglobales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acreditadoglobales` (
  `idacreditadoGlobal` int NOT NULL AUTO_INCREMENT,
  `idglobales` int NOT NULL,
  `fecha` date NOT NULL,
  `idSolicitud` int NOT NULL,
  `acreditado` tinyint NOT NULL,
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
  `idadministrativo` int NOT NULL AUTO_INCREMENT,
  `departamento` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `correo` varchar(45) NOT NULL,
  `foto` blob NOT NULL,
  PRIMARY KEY (`idadministrativo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrativo`
--

LOCK TABLES `administrativo` WRITE;
/*!40000 ALTER TABLE `administrativo` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrativo` ENABLE KEYS */;
UNLOCK TABLES;

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
  `foto` blob NOT NULL,
  PRIMARY KEY (`numControl`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES ('1400025G87','LIZ CASTRO LUNA','SSSSSSSSSSSSSSSSSSSSSS','ELECTRICIDAD','FISICO-MATEMATICO','Quinto','E','MATUTINO','07:00 a 15:00 hrs','30DCT0236O','jorge@cbtis66.edu.mx',1,'CODJ721205HVZRMR05',''),('721205','Jorge Cortés Domínguez','16 de Septiembre 1605','Programacion','a','5','G','Matutino','si','30DCT0236O','jorge@cbtis66.edu.mx',1,'CODJ721205HVZRMR05',''),('admin','JORGE CORTES DOMINGUEZ','16 DE SEPTIEMPRE 1605','PROGRAMACION','FISICO-MATEMATICO','Tercer','G','MATUTINO','07:00 a 15:00 hrs','30DCT0236O','jorge@cbtis66.edu.mx',1,'CODJ721205HVZRMR05','');
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
  `iddocente` int NOT NULL AUTO_INCREMENT,
  `idUser` int NOT NULL,
  `gradoAcademico` varchar(45) NOT NULL,
  `telefono` varchar(45) NOT NULL,
  `RFC` varchar(45) NOT NULL,
  `CURP` varchar(45) NOT NULL,
  `CEDULA` varchar(45) NOT NULL,
  `fechaInicio` date NOT NULL,
  `correo` varchar(45) NOT NULL,
  `foto` blob NOT NULL,
  PRIMARY KEY (`iddocente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docente`
--

LOCK TABLES `docente` WRITE;
/*!40000 ALTER TABLE `docente` DISABLE KEYS */;
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
-- Temporary view structure for view `forgotpassword`
--

DROP TABLE IF EXISTS `forgotpassword`;
/*!50001 DROP VIEW IF EXISTS `forgotpassword`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `forgotpassword` AS SELECT 
 1 AS `nombre`,
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
  `numControl` varchar(14) NOT NULL,
  `materia` varchar(45) NOT NULL,
  `idperiodoEscolar` varchar(430) NOT NULL,
  PRIMARY KEY (`idglobales`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globales`
--

LOCK TABLES `globales` WRITE;
/*!40000 ALTER TABLE `globales` DISABLE KEYS */;
/*!40000 ALTER TABLE `globales` ENABLE KEYS */;
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
 1 AS `numControl`,
 1 AS `correo`,
 1 AS `grado`,
 1 AS `grupo`,
 1 AS `turno`,
 1 AS `especialidad`*/;
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
-- Temporary view structure for view `pdf`
--

DROP TABLE IF EXISTS `pdf`;
/*!50001 DROP VIEW IF EXISTS `pdf`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `pdf` AS SELECT 
 1 AS `numControl`,
 1 AS `nombre`,
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
 1 AS `CURP`,
 1 AS `correo`*/;
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

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(45) NOT NULL,
  `numControl` varchar(14) NOT NULL,
  `password` varchar(14) NOT NULL,
  `rol` varchar(14) NOT NULL,
  `exp` int NOT NULL,
  `nombre` varchar(75) NOT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'admin','admin','1205','Admin',300,'Jorge Cortes Domínguez'),(2,'1400025G87','1400025G87','12345678','User',500,'LIZ CASTRO LUNA'),(3,'721205','721205','1205','user',300,'Jorge Cortés Domínguez');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `forgotpassword` AS select `alumno`.`nombre` AS `nombre`,`alumno`.`numControl` AS `numControl`,`usuario`.`password` AS `password`,`alumno`.`correo` AS `correo` from (`usuario` join `alumno` on((`usuario`.`numControl` like `alumno`.`numControl`))) */;
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
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `listausernoreg` AS select `usuario`.`password` AS `password`,`alumno`.`nombre` AS `nombre`,`alumno`.`numControl` AS `numControl`,`alumno`.`correo` AS `correo`,`alumno`.`grado` AS `grado`,`alumno`.`grupo` AS `grupo`,`alumno`.`turno` AS `turno`,`alumno`.`especialidad` AS `especialidad` from (`alumno` join `usuario` on((`alumno`.`numControl` = `usuario`.`numControl`))) where (`alumno`.`alta` = 0) */;
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
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `pdf` AS select `alumno`.`numControl` AS `numControl`,`alumno`.`nombre` AS `nombre`,`alumno`.`direccion` AS `direccion`,`alumno`.`especialidad` AS `especialidad`,`alumno`.`area` AS `area`,`alumno`.`grado` AS `grado`,`alumno`.`grupo` AS `grupo`,`alumno`.`turno` AS `turno`,`alumno`.`horario` AS `horario`,`alumno`.`CTO` AS `CTO`,`escuela`.`Esc_nombre` AS `Esc_nombre`,`escuela`.`Esc_direccion` AS `Esc_direccion`,`escuela`.`Esc_correo` AS `Esc_correo`,`escuela`.`Esc_Director` AS `Esc_Director`,`escuela`.`Esc_telefono` AS `Esc_telefono`,`alumno`.`CURP` AS `CURP`,`alumno`.`correo` AS `correo` from (`escuela` join `alumno` on((`escuela`.`CTO` = `alumno`.`CTO`))) */;
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

-- Dump completed on 2023-10-09 19:15:18
