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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-08 23:57:49
