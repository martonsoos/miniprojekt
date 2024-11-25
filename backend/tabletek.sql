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
     artist_id INT,     
     album_id INT,     
     genre VARCHAR(100), 
     release_date DATE, 
     rating FLOAT DEFAULT 0,);
 

--
-- Dumping data for table `phones`
--

-- Insert multiple example records with different OS values
INSERT INTO ipad_specs (
    os, processor_speed, processor_cores, display_size, display_resolution, ram_size, description, price
) VALUES 
    (
        'Apple iPadOS 16', 
        3.0, 
        6, 
        10.9, 
        '2360 x 1640', 
        4, 
        'Bemutatkozik az áttervezett iPad. A vadonatúj iPadet alapjaitól terveztük újra, és négy gyönyörű színben választhatod.', 
        152990
    ),
    (
        'Apple iPadOS 15', 
        3.2, 
        8, 
        12.9, 
        '2732 x 2048', 
        6, 
        'A nagyméretű kijelzővel és még erősebb processzorral az új iPad tökéletes a kreatív feladatokhoz.', 
        299990
    ),
    (
        'Apple iPadOS 14', 
        2.8, 
        4, 
        10.2, 
        '2160 x 1620', 
        3, 
        'Ez az iPad ideális társ a mindennapi feladatokhoz, könnyen hordozható és megfizethető.', 
        124990
    ),
    (
        'Apple iPadOS 13', 
        3.1, 
        6, 
        11.0, 
        '2388 x 1668', 
        4, 
        'Az iPad Pro a legújabb technológiát és kivételes teljesítményt kínálja, hogy minden feladathoz tökéletesen használható legyen.', 
        249990
    ),
    (
        'Apple iPadOS 12', 
        2.9, 
        8, 
        10.9, 
        '2360 x 1640', 
        4, 
        'Kiváló középkategóriás iPad, amely minden szükséges funkciót biztosít a mindennapi használathoz.', 
        199990
    ),
    (
        'Apple iPadOS 11', 
        3.5, 
        10, 
        13.0, 
        '2800 x 2100', 
        8, 
        'A legerősebb iPad, amelyet a legigényesebb felhasználóknak fejlesztettünk ki, nagy kijelzővel és csúcstechnológiával.', 
        399990
    );


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
