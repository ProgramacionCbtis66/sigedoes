CREATE DATABASE  IF NOT EXISTS `constancias` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `constancias`;
-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: constancias
-- ------------------------------------------------------
-- Server version	8.0.30

 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
 SET TIME_ZONE='+00:00' */;
 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `pdf`
--

DROP TABLE IF EXISTS `pdf`;
 DROP VIEW IF EXISTS `pdf`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
 CREATE VIEW `pdf` AS SELECT 
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
 1 AS `correo`;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `forgotpassword`
--

DROP TABLE IF EXISTS `forgotpassword`;
 DROP VIEW IF EXISTS `forgotpassword`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
 CREATE VIEW `forgotpassword` AS SELECT 
 1 AS `nombre`,
 1 AS `numControl`,
 1 AS `password`,
 1 AS `correo`;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `pdf`
--

 DROP VIEW IF EXISTS `pdf`;
 SET @saved_cs_client          = @@character_set_client ;
 SET @saved_cs_results         = @@character_set_results ;
 SET @saved_col_connection     = @@collation_connection ;
 SET character_set_client      = utf8mb4 ;
 SET character_set_results     = utf8mb4 ;
 SET collation_connection      = utf8mb4_0900_ai_ci ;
 CREATE ALGORITHM=UNDEFINED 
 DEFINER=`root`@`%` SQL SECURITY DEFINER 
 VIEW `pdf` AS select `alumno`.`numControl` AS `numControl`,`alumno`.`nombre` AS `nombre`,`alumno`.`direccion` AS `direccion`,`alumno`.`especialidad` AS `especialidad`,`alumno`.`area` AS `area`,`alumno`.`grado` AS `grado`,`alumno`.`grupo` AS `grupo`,`alumno`.`turno` AS `turno`,`alumno`.`horario` AS `horario`,`alumno`.`CTO` AS `CTO`,`escuela`.`Esc_nombre` AS `Esc_nombre`,`escuela`.`Esc_direccion` AS `Esc_direccion`,`escuela`.`Esc_correo` AS `Esc_correo`,`escuela`.`Esc_Director` AS `Esc_Director`,`escuela`.`Esc_telefono` AS `Esc_telefono`,`alumno`.`CURP` AS `CURP`,`alumno`.`correo` AS `correo` from (`escuela` join `alumno` on((`escuela`.`CTO` = `alumno`.`CTO`))) ;
 SET character_set_client      = @saved_cs_client ;
 SET character_set_results     = @saved_cs_results ;
 SET collation_connection      = @saved_col_connection ;

--
-- Final view structure for view `forgotpassword`
--

 DROP VIEW IF EXISTS `forgotpassword`;
 SET @saved_cs_client          = @@character_set_client ;
 SET @saved_cs_results         = @@character_set_results ;
 SET @saved_col_connection     = @@collation_connection ;
 SET character_set_client      = utf8mb4 ;
 SET character_set_results     = utf8mb4 ;
 SET collation_connection      = utf8mb4_0900_ai_ci ;
 CREATE ALGORITHM=UNDEFINED 
 DEFINER=`root`@`%` SQL SECURITY DEFINER 
 VIEW `forgotpassword` AS select `alumno`.`nombre` AS `nombre`,`alumno`.`numControl` AS `numControl`,`usuario`.`password` AS `password`,`alumno`.`correo` AS `correo` from (`usuario` join `alumno` on((`usuario`.`numControl` like `alumno`.`numControl`))) ;
 SET character_set_client      = @saved_cs_client ;
 SET character_set_results     = @saved_cs_results ;
 SET collation_connection      = @saved_col_connection ;

--
-- Dumping events for database 'constancias'
--

--
-- Dumping routines for database 'constancias'
--
 SET TIME_ZONE=@OLD_TIME_ZONE ;

 SET SQL_MODE=@OLD_SQL_MODE ;
 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS ;
 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS ;
 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT ;
 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS ;
 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION ;
 SET SQL_NOTES=@OLD_SQL_NOTES ;

-- Dump completed on 2022-11-03 17:07:28
