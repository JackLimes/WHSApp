-- MySQL dump 10.13  Distrib 5.7.21, for Win64 (x86_64)
--
-- Host: localhost    Database: test_ann
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `announcement`
--

DROP TABLE IF EXISTS `announcement`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `announcement` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(1000) DEFAULT NULL,
  `club` varchar(1000) DEFAULT NULL,
  `description` varchar(4000) DEFAULT NULL,
  `birth` date DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  `clubid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `announcement`
--

LOCK TABLES `announcement` WRITE;
/*!40000 ALTER TABLE `announcement` DISABLE KEYS */;
INSERT INTO `announcement` VALUES (16,'First anime club!','Anime Club','Is this colored','2018-02-11','#37D1B9',1),(17,'We are all a bunch of NERDS','D&D Club','My little brother chose that title! I am so proud of him!','2018-02-09','#30DCE4',40),(18,'Evangelion Critical Analysis Meating','Anime Club','There\'s so much symbolism!','2018-02-09','#37D1B9',1),(19,'First to kill the king wins!','Chess Club','Checkmate.','2018-02-09','#24AF27',4),(20,'Solve Integrals','Math Club','Come on and join us in match club!','2018-02-10','#037C25',21),(21,'This text would be hard to read','Health Occupation Students of America (HOSA)','I hope it isn\'t that hard to read.','2018-02-10','#2B3C95',17),(22,'Ratatatat','Drumline','badum badum badum badum \');','2018-02-10','#972B8D',10),(23,'Kamen Rider counts too!','Anime Club','Finally! A real life anime!','2018-02-10','#37D1B9',1),(24,'This still works!','Computer Club','My app stopped building right. I\'m clud I uploaded this to github.','2018-02-10','#1B5A8E',6),(25,'I\'m tired','SADD/Trend','because I\'m SADD!  HAHAHAHAHA','2018-02-12','#3801BA',26),(26,'I must make this title really uber long or else I will Die!','Family, Career, and Community Leaders of America (FCCLA)','Bu the question is... Will this still look good?','2018-02-10','#2CA31E',14),(27,'What do we do with our hands!?','Art Club','We got like... TWO OF THEM!','2018-02-13','#4A67B4',2),(29,'No more breathing allowed!','Anime Club','Y\'all arent allowed to live','2018-02-13','#37D1B9',1),(30,'Testing 123','Gaming Club','yeet','2018-02-13','#7640B4',16),(31,'STATE BOIIS','Future Business Leaders of America (FBLA)','only for the best','2018-04-08','#620C8E',12),(32,'Welcome to FZ West board','Announcements','You can subscribe and unsubscribe in the browse clubs section.','2018-02-14','#3A068F',41),(33,'New logo!!','Announcements','Yeppers','2018-02-14','#3A068F',41);
/*!40000 ALTER TABLE `announcement` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clubs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL,
  `Description` varchar(5000) DEFAULT NULL,
  `color` varchar(7) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES (1,'Anime Club',NULL,'#37D1B9'),(2,'Art Club',NULL,'#4A67B4'),(3,'Band',NULL,'#33FADA'),(4,'Chess Club',NULL,'#24AF27'),(5,'Choir',NULL,'#1B7B33'),(6,'Computer Club',NULL,'#1B5A8E'),(7,'Cultures in Action (CIA)',NULL,'#36532A'),(8,'DECA',NULL,'#24F9A9'),(9,'Drama Club',NULL,'#15E6CE'),(10,'Drumline',NULL,'#972B8D'),(11,'Educators Rising',NULL,'#4FCB57'),(12,'Future Business Leaders of America (FBLA)',NULL,'#620C8E'),(13,'Flag Corps',NULL,'#624642'),(14,'Family, Career, and Community Leaders of America (FCCLA)',NULL,'#2CA31E'),(15,'Future Medical Students',NULL,'#50F34F'),(16,'Gaming Club',NULL,'#7640B4'),(17,'Health Occupation Students of America (HOSA)',NULL,'#2B3C95'),(18,'Jazz Band',NULL,'#0E034D'),(19,'Junior Class',NULL,'#5CF141'),(20,'Key Club',NULL,'#757F62'),(21,'Math Club',NULL,'#037C25'),(22,'National Honor Society (NHS)',NULL,'#7AB215'),(23,'Newspaper',NULL,'#91427B'),(24,'Orchestra',NULL,'#350928'),(25,'Recreation Activity Club',NULL,'#869357'),(26,'SADD/Trend',NULL,'#3801BA'),(27,'Science Club',NULL,'#1CE520'),(28,'Senior Class',NULL,'#810AEF'),(29,'Sign Language Club',NULL,'#64C3CD'),(30,'Speech & Debate',NULL,'#74B234'),(31,'STARS Dance Team',NULL,'#80991C'),(32,'Student Council',NULL,'#8C5073'),(33,'Table Tennis',NULL,'#0A99EA'),(34,'Technology Students of America (TSA)',NULL,'#59D3BB'),(35,'Winter Guard',NULL,'#7027E8'),(36,'World Language Club',NULL,'#8AB5D9'),(37,'Writers Club',NULL,'#33E883'),(38,'Yearbook',NULL,'#949607'),(39,'Youth in Government',NULL,'#817118'),(40,'D&D Club',NULL,'#30DCE4'),(41,'Announcements','The morning and afternoon announcements.','#3A068F');
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `UID` varchar(48) DEFAULT NULL,
  `Subscriptions` json DEFAULT NULL,
  UNIQUE KEY `UID` (`UID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('bXn4qvtgVFMbzR1aYEinTP4zdUw1','[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 41, 1]'),('29VoATH9X0XUGfB28tyuiRvB5SI2','[41, 1]'),('zVtcuE5nYjWp5iM4nxaN1KNF0cI3','[41, 1]');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-14 22:42:35
