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
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
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
  `idMateria` int NOT NULL,
  `status` int NOT NULL,
  `docenteDni` varchar(45) NOT NULL,
  `idperiodoescolar` varchar(45) NOT NULL,
  PRIMARY KEY (`idasiglobd`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignaglobal`
--

LOCK TABLES `asignaglobal` WRITE;
/*!40000 ALTER TABLE `asignaglobal` DISABLE KEYS */;
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
  `idMateria` int NOT NULL,
  `idperiodoescolar` varchar(45) NOT NULL,
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
-- Table structure for table `ceap`
--

DROP TABLE IF EXISTS `ceap`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ceap` (
  `idceap` int NOT NULL AUTO_INCREMENT,
  `CTO` varchar(45) NOT NULL,
  `concepto` varchar(45) DEFAULT NULL,
  `costo` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`idceap`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ceap`
--

LOCK TABLES `ceap` WRITE;
/*!40000 ALTER TABLE `ceap` DISABLE KEYS */;
INSERT INTO `ceap` VALUES (1,'30DCT0236O','Constancias',40.00),(2,'30DCT0236O','Examen Global',150.00),(3,'30DCT0236O','Recursamiento',500.00);
/*!40000 ALTER TABLE `ceap` ENABLE KEYS */;
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
INSERT INTO `escuela` VALUES ('30DCT0236O','Centro de Bachillerato Tecnológico Industrial y de Servicios No. 66 “Agustín de Iturbide”','XXXX','XXXXX','XXXXX','28 de Agosto al 13 de Diciembre del 2023','MC RICARDO SERRA BERNAL');
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
  `docenteDniApli` varchar(45) DEFAULT NULL,
  `idasiglobd` int DEFAULT NULL,
  PRIMARY KEY (`idglobales`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `globales`
--

LOCK TABLES `globales` WRITE;
/*!40000 ALTER TABLE `globales` DISABLE KEYS */;
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
  `inetutor` blob NOT NULL,
  `cartatutor` blob NOT NULL,
  `documentoreferencia` blob NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `fecha` varchar(45) NOT NULL,
  `estado` int NOT NULL DEFAULT '0',
  `correoTutor` varchar(45) NOT NULL,
  `nombreTutor` varchar(60) NOT NULL,
  `observaciones` varchar(400) DEFAULT NULL,
  `fechaRespuesta` varchar(45) DEFAULT NULL,
  `horas1` varchar(45) DEFAULT NULL,
  `horas2` varchar(45) DEFAULT NULL,
  `fecha1` varchar(45) DEFAULT NULL,
  `fecha2` varchar(45) DEFAULT NULL,
  `idorientacioneducativa` varchar(45) DEFAULT NULL,
  `periodo` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idjustificante`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `justificante`
--

LOCK TABLES `justificante` WRITE;
/*!40000 ALTER TABLE `justificante` DISABLE KEYS */;
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
  `docenteDniApli` varchar(45) DEFAULT NULL,
  `idasigrecursa` int DEFAULT NULL,
  `calificacion` int DEFAULT NULL,
  `fechaCalificacion` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idrecursa`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
/*!40000 ALTER TABLE `solicitud` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudglobal`
--

DROP TABLE IF EXISTS `solicitudglobal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudglobal` (
  `idsolicitudglobal` int NOT NULL AUTO_INCREMENT,
  `numControl` varchar(15) NOT NULL,
  `idglobales` varchar(45) NOT NULL,
  `estado` int DEFAULT NULL,
  `frm5` blob,
  `ceap` blob,
  `idasiglobd` int NOT NULL,
  `fecha` varchar(45) NOT NULL,
  PRIMARY KEY (`idsolicitudglobal`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudglobal`
--

LOCK TABLES `solicitudglobal` WRITE;
/*!40000 ALTER TABLE `solicitudglobal` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitudglobal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitudrecursa`
--

DROP TABLE IF EXISTS `solicitudrecursa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitudrecursa` (
  `idsolicitudrecursa` int NOT NULL AUTO_INCREMENT,
  `numControl` varchar(15) NOT NULL,
  `idrecursas` varchar(45) NOT NULL,
  `estado` int DEFAULT NULL,
  `frm5` blob,
  `ceap` blob,
  `idasigrecursa` int DEFAULT NULL,
  `fecha` varchar(45) NOT NULL,
  PRIMARY KEY (`idsolicitudrecursa`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitudrecursa`
--

LOCK TABLES `solicitudrecursa` WRITE;
/*!40000 ALTER TABLE `solicitudrecursa` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitudrecursa` ENABLE KEYS */;
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
INSERT INTO `usuario` VALUES (1,'admin','admin','E1f2g3h4','CE','Administrador','CORTES','DOMINGUEZ',_binary 'data:image/jpeg;base64,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',1,'sigedoes@cbtis66.edu.mx');
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

-- Dump completed on 2023-11-26 10:39:56
