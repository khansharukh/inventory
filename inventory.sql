-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 11, 2020 at 07:45 AM
-- Server version: 10.4.8-MariaDB
-- PHP Version: 7.3.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `uid` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `in_stock` enum('yes','no') NOT NULL DEFAULT 'yes',
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `uid`, `name`, `description`, `in_stock`, `created_at`) VALUES
(1, 1, 'Cream Of Tomato Soup', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'yes', '2020-01-09 07:17:22'),
(3, 1, 'Fruit Chat Salad', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'yes', '2020-01-08 07:17:22'),
(4, 1, 'Butter Naan', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'yes', '2020-01-07 07:17:22'),
(6, 1, 'Butter Naan with butter chicken', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', 'no', '2020-01-08 07:17:22'),
(9, 1, 'New product', 'Out of stock', 'no', '2020-01-10 13:10:52'),
(10, 1, 'New product', 'Out of stock', 'no', '2020-01-10 13:11:16'),
(15, 1, 'Add 2', '09876tfvbnm,law4 asdfasdfaasdfarqw34rq2rq r afqwef q3f q3q3 4', 'yes', '2020-01-10 16:10:59'),
(17, 2, 'Admin 2', 'Dsesesdfsf', 'yes', '2020-01-10 19:54:32'),
(18, 2, 'New Admin 2', 'This is a', 'yes', '2020-01-10 19:59:55');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `created_at`) VALUES
(1, 'Admin', 'admin@gmail.com', '1234', '2020-01-09 06:11:00'),
(2, 'Khan Sharukh', 'k@gmail.com', '1234', '2020-01-09 06:11:00');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
