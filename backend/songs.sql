-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 11, 2023 at 09:47 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mobilephones`
--

-- --------------------------------------------------------

--
-- Table structure for table `phones`
--

CREATE TABLE Songs (    
     id INT AUTO_INCREMENT PRIMARY KEY,     
     title VARCHAR(255) NOT NULL,          
     genre VARCHAR(100), 
     release_date DATE, 
     rating FLOAT DEFAULT 0);


--
-- Dumping data for table `phones`
--

-- Insert multiple example records with different OS values
INSERT INTO Songs (title, genre, release_date, rating)
VALUES 
('ratata', 'hip-hop', '2020-09-30', 5.0),
('luckey hot16', 'rap', '2015-01-10', 3.8),
('pörög a show', 'pop', '2018-04-22', 4.7),
('csibész kutyák', 'hip-hop', '2011-01-29', 4.9),
('Ácsi', 'jazz', '2024-05-12', 3.6),
('Fehér éjszaka', 'rock', '2017-06-14', 4.5),
('Naplemente', 'acoustic', '2022-03-21', 4.2),
('Zúgó szél', 'folk', '2013-11-09', 1.2),
('Csigé', 'electronic', '2019-08-15', 3.9),
('Hajnali fények', 'classical', '2021-12-01', 4.8),
('Táncolj velem', 'dance', '2020-02-14', 4.6),
('Abbey Road', 'Rock', '1969-02-15', 4.8), 
('Thriller', 'Pop, R&B', '1989-10-12', 5.0), 
('The Dark Side of the Moon', 'Progresszív rock', '2020-08-10', 4.9), 
('Rumours', 'Rock, Pop rock', '1977-04-21', 4.5), 
('Back to Black', 'Soul, R&B', '2006-03-1', 4.6), 
('Lemonade', 'Pop, R&B, Hip-hop', '2016-10-28', 4.9)

--
-- Indexes for dumped tables
--
--
-- Indexes for table `phones`
--
ALTER TABLE `songs`
  ADD PRIMARY KEY (`Id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `phones`
--
ALTER TABLE `songs`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
