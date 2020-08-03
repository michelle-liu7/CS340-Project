-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jul 27, 2020 at 05:32 AM
-- Server version: 10.4.13-MariaDB-log
-- PHP Version: 7.4.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_coppan`
--

-- --------------------------------------------------------

--
-- Table structure for table `Authors`
--

CREATE TABLE `Authors` (
  `authorID` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Authors`
--

INSERT INTO `Authors` (`authorID`, `fname`, `lname`) VALUES
(1, 'Brian', 'Bendis'),
(2, 'Michael', 'Gaydos'),
(3, 'Skottie', 'Young'),
(4, 'Jason', 'Aaron'),
(5, 'Robbie', 'Thompson'),
(6, 'Neil', 'Gaiman');

-- --------------------------------------------------------

--
-- Table structure for table `Books`
--

CREATE TABLE `Books` (
  `bookID` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `issue` int(11) NOT NULL,
  `upc` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `publisher` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Books`
--

INSERT INTO `Books` (`bookID`, `title`, `issue`, `upc`, `price`, `owner`, `publisher`) VALUES
(1, 'Star Wars', 1, '759606081134', '4.99', 1, 1),
(2, 'Spider-Man vs. Deadpool', 31, '759606082544', '3.99', 1, 1),
(3, 'Deadpool', 2, '759606090358', '3.99', 2, 1),
(4, 'Jessica Jones', 12, '759606086160', '3.99', 2, 1),
(5, 'American Gods', 1, '761568001303', '3.99', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Books_Authors`
--

CREATE TABLE `Books_Authors` (
  `bid` int(11) NOT NULL,
  `aid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Books_Authors`
--

INSERT INTO `Books_Authors` (`bid`, `aid`) VALUES
(1, 4),
(2, 5),
(3, 3),
(4, 1),
(4, 2),
(5, 6);

-- --------------------------------------------------------

--
-- Table structure for table `Books_Genres`
--

CREATE TABLE `Books_Genres` (
  `bid` int(11) NOT NULL,
  `gid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Books_Genres`
--

INSERT INTO `Books_Genres` (`bid`, `gid`) VALUES
(1, 4),
(2, 1),
(2, 5),
(3, 1),
(3, 2),
(3, 5),
(4, 1),
(4, 6),
(5, 3);

-- --------------------------------------------------------

--
-- Table structure for table `Collectors`
--

CREATE TABLE `Collectors` (
  `userID` int(11) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `birthdate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Collectors`
--

INSERT INTO `Collectors` (`userID`, `fname`, `lname`, `birthdate`) VALUES
(1, 'Bruce', 'Wayne', '1978-04-17'),
(2, 'Clark', 'Kent', '1978-06-18');

-- --------------------------------------------------------

--
-- Table structure for table `Genres`
--

CREATE TABLE `Genres` (
  `genreID` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Genres`
--

INSERT INTO `Genres` (`genreID`, `type`) VALUES
(1, 'Superhero'),
(2, 'Humor'),
(3, 'Horror'),
(4, 'Sci-Fi'),
(5, 'Action'),
(6, 'Mystery');

-- --------------------------------------------------------

--
-- Table structure for table `Publishers`
--

CREATE TABLE `Publishers` (
  `pubID` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `Publishers`
--

INSERT INTO `Publishers` (`pubID`, `name`) VALUES
(1, 'Marvel'),
(2, 'DC'),
(3, 'Dark Horse');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Authors`
--
ALTER TABLE `Authors`
  ADD PRIMARY KEY (`authorID`),
  ADD UNIQUE KEY `authorID` (`authorID`);

--
-- Indexes for table `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`bookID`),
  ADD UNIQUE KEY `bookID` (`bookID`),
  ADD UNIQUE KEY `upc` (`upc`),
  ADD KEY `owner` (`owner`),
  ADD KEY `publisher` (`publisher`);

--
-- Indexes for table `Books_Authors`
--
ALTER TABLE `Books_Authors`
  ADD PRIMARY KEY (`bid`,`aid`),
  ADD KEY `aid` (`aid`);

--
-- Indexes for table `Books_Genres`
--
ALTER TABLE `Books_Genres`
  ADD PRIMARY KEY (`bid`,`gid`),
  ADD KEY `gid` (`gid`);

--
-- Indexes for table `Collectors`
--
ALTER TABLE `Collectors`
  ADD PRIMARY KEY (`userID`),
  ADD UNIQUE KEY `userID` (`userID`);

--
-- Indexes for table `Genres`
--
ALTER TABLE `Genres`
  ADD PRIMARY KEY (`genreID`),
  ADD UNIQUE KEY `genreID` (`genreID`);

--
-- Indexes for table `Publishers`
--
ALTER TABLE `Publishers`
  ADD PRIMARY KEY (`pubID`),
  ADD UNIQUE KEY `pubID` (`pubID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Authors`
--
ALTER TABLE `Authors`
  MODIFY `authorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Books`
--
ALTER TABLE `Books`
  MODIFY `bookID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `Collectors`
--
ALTER TABLE `Collectors`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Genres`
--
ALTER TABLE `Genres`
  MODIFY `genreID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `Publishers`
--
ALTER TABLE `Publishers`
  MODIFY `pubID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Books`
--
ALTER TABLE `Books`
  ADD CONSTRAINT `Books_ibfk_1` FOREIGN KEY (`owner`) REFERENCES `Collectors` (`userID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `Books_ibfk_2` FOREIGN KEY (`publisher`) REFERENCES `Publishers` (`pubID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `Books_Authors`
--
ALTER TABLE `Books_Authors`
  ADD CONSTRAINT `Books_Authors_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `Books` (`bookID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Books_Authors_ibfk_2` FOREIGN KEY (`aid`) REFERENCES `Authors` (`authorID`) ON UPDATE CASCADE;

--
-- Constraints for table `Books_Genres`
--
ALTER TABLE `Books_Genres`
  ADD CONSTRAINT `Books_Genres_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `Books` (`bookID`) ON UPDATE CASCADE,
  ADD CONSTRAINT `Books_Genres_ibfk_2` FOREIGN KEY (`gid`) REFERENCES `Genres` (`genreID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
