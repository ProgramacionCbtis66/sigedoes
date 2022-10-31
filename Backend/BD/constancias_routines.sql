-- Active: 1656829751915@@127.0.0.1@3306@alumno
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
-- Temporary view structure for view `forgotpassword`
--

DROP TABLE IF EXISTS `forgotpassword`;
/*!50001 DROP VIEW IF EXISTS `forgotpassword`*/;
SET @saved_cs_client     = @@character_set_client;
 SET character_set_client = utf8mb4 ;
CREATE VIEW `forgotpassword` AS SELECT 
 1 AS `nombre`,
 1 AS `numControl`,
 1 AS `password`,
 1 AS `correo`;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `pdf`
--

DROP TABLE IF EXISTS `pdf`;
/*!50001 DROP VIEW IF EXISTS `pdf`*/;
SET @saved_cs_client     = @@character_set_client;
 SET character_set_client = utf8mb4 ;
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
 1 AS `descripcion`,
 1 AS `CURP`,
 1 AS `correo`;
SET character_set_client = @saved_cs_client;

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
/*!50001 VIEW `pdf` AS select `alumno`.`numControl` AS `numControl`,`alumno`.`nombre` AS `nombre`,`alumno`.`direccion` AS `direccion`,`alumno`.`especialidad` AS `especialidad`,`alumno`.`area` AS `area`,`alumno`.`grado` AS `grado`,`alumno`.`grupo` AS `grupo`,`alumno`.`turno` AS `turno`,`alumno`.`horario` AS `horario`,`alumno`.`CTO` AS `CTO`,`escuela`.`Esc_nombre` AS `Esc_nombre`,`escuela`.`Esc_direccion` AS `Esc_direccion`,`escuela`.`Esc_correo` AS `Esc_correo`,`escuela`.`Esc_Director` AS `Esc_Director`,`escuela`.`Esc_telefono` AS `Esc_telefono`,`solicitud`.`descripcion` AS `descripcion`,`alumno`.`CURP` AS `CURP`,`alumno`.`correo` AS `correo` from ((`escuela` join `alumno` on((`escuela`.`CTO` = `alumno`.`CTO`))) join `solicitud` on((`alumno`.`numControl` = `solicitud`.`numControl`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Dumping events for database 'constancias'
--

--
-- Dumping routines for database 'constancias'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-10-31 15:44:56
