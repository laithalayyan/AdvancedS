-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2024 at 06:40 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `craft`
--

-- --------------------------------------------------------

--
-- Table structure for table `cities`
--

CREATE TABLE `cities` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `cities`
--

INSERT INTO `cities` (`id`, `name`) VALUES
(3, 'bethlehem'),
(6, 'gaza City'),
(4, 'hebron'),
(1, 'jerusalem'),
(5, 'nablus'),
(2, 'ramallah');

-- --------------------------------------------------------

--
-- Table structure for table `countries`
--

CREATE TABLE `countries` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `countries`
--

INSERT INTO `countries` (`id`, `name`) VALUES
(1, 'palestine');

-- --------------------------------------------------------
--admin
 -- Create the admin table
CREATE TABLE admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- Insert a record into the admin table
INSERT INTO admin (username, password, email) 
VALUES ('demma', '12345678', 'demm@gmail.com');
---------------------------------------
--------
--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `PaymentID` int(11) NOT NULL,
  `RequestingUserID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `PaymentAmount` decimal(10,0) NOT NULL,
  `PaymentMethod` varchar(100) NOT NULL,
  `RequestDate` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`PaymentID`, `RequestingUserID`, `ProjectID`, `PaymentAmount`, `PaymentMethod`, `RequestDate`, `Status`) VALUES
(1, 1, 1, 100, 'Visa', '2024-03-18 05:27:18', 'completed'),
(2, 1, 1, 100, 'Visa', '2024-03-18 05:27:20', 'completed'),
(4, 1, 1, 100, 'Visa', '2024-03-18 05:27:08', 'completed'),
(5, 1, 1, 900, 'Credit Card', '2024-03-18 03:55:53', 'Pending'),
(6, 1, 1, 900, 'Credit Card', '2024-03-18 03:55:56', 'Pending'),
(7, 1, 1, 900, 'Credit Card', '2024-03-18 04:03:37', 'pending'),
(8, 1, 1, 200, 'Credit Card', '2024-03-18 04:03:51', 'pending'),
(9, 1, 24, 900, 'Credit Card', '2024-03-18 04:10:01', 'Completed'),
(10, 1, 24, 900, 'Credit Card', '2024-03-18 04:10:04', 'Completed'),
(11, 1, 24, 200, 'Credit Card', '2024-03-18 04:11:13', 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `creatorUserID` int(11) NOT NULL,
  `project_name` varchar(100) NOT NULL,
  `description` varchar(150) NOT NULL,
  `project_materials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`project_materials`)),
  `project_tools` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`project_tools`)),
  `estimated_duration_in_days` decimal(5,2) NOT NULL,
  `creation_date` date NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `status` set('published','in progress') NOT NULL DEFAULT 'in progress',
  `price` int(11) NOT NULL,
  `remaining_price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `creatorUserID`, `project_name`, `description`, `project_materials`, `project_tools`, `estimated_duration_in_days`, `creation_date`, `image_url`, `status`, `price`, `remaining_price`) VALUES
(1, 1, 'New Project Name', 'New Project Description', '[{\"name\": \"New Material Name\", \"unit\": \"kg\", \"quantity\": 20}, {\"name\": \"Material 2\", \"unit\": \"meters\", \"quantity\": 5}]', '[\"New Tool 1\", \"New Tool 2\"]', 2.50, '2024-03-09', 'http://example.com/image', 'in progress', 0, 2000),
(24, 1, 'New Project Name', 'New Project Description', '[{\"name\": \"New Material Name\", \"unit\": \"kg\", \"quantity\": 20}, {\"name\": \"Material 2\", \"unit\": \"meters\", \"quantity\": 5}]', '[\"New Tool 1\", \"New Tool 2\"]', 2.50, '2024-03-09', 'http://example.com/image', 'in progress', 2000, 0),
(25, 1, 'project three', 'this is a description', '[{\"name\": \"Wood\", \"unit\": \"board feet\", \"quantity\": 20}, {\"name\": \"Metal\", \"unit\": \"kilograms\", \"quantity\": 15}, {\"name\": \"Fabric\", \"unit\": \"meters\", \"quantity\": 30}, {\"name\": \"Clay\", \"unit\": \"kilograms\", \"quantity\": 25}]', '[\"Hammer\", \"Screwdriver\", \"Pliers\"]', 2.50, '2024-09-03', 'https://example.com/images/project_1.jpg', 'in progress', 2000, 2000);

-- --------------------------------------------------------

--
-- Table structure for table `projects_invitations`
--

CREATE TABLE `projects_invitations` (
  `invitation_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` set('collaborator') NOT NULL DEFAULT 'collaborator',
  `status` set('pending') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects_invitations`
--

INSERT INTO `projects_invitations` (`invitation_id`, `project_id`, `user_id`, `role`, `status`) VALUES
(14, 1, 1, 'collaborator', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `projects_participants`
--

CREATE TABLE `projects_participants` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `role` set('collaborator','creator') NOT NULL,
  `joined_Date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `projects_participants`
--

INSERT INTO `projects_participants` (`id`, `project_id`, `user_id`, `role`, `joined_Date`) VALUES
(3, 24, 1, 'creator', '2024-03-17'),
(4, 25, 1, 'creator', '2024-03-17'),
(5, 1, 2, 'creator', '2024-03-17'),
(6, 1, 2, 'collaborator', '2024-03-17');

-- --------------------------------------------------------

--
-- Table structure for table `rent`
--

CREATE TABLE `rent` (
  `rent_id` int(11) NOT NULL,
  `tool_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `start_date` varchar(100) NOT NULL,
  `end_date` varchar(100) NOT NULL,
  `rent_status` varchar(100) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `rent`
--

INSERT INTO `rent` (`rent_id`, `tool_id`, `user_id`, `start_date`, `end_date`, `rent_status`) VALUES
(125, 111, 111, '2001-07-01', '2000-08-02', 'active'),
(126, 111, 111, '2001-07-01', '2000-08-02', 'active'),
(127, 1111, 111, '2001-07-01', '2000-08-02', 'active'),
(128, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(129, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(130, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(131, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(132, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(133, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(134, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(135, 3, 111, '2001-07-01', '2000-08-02', 'active'),
(136, 3, 111, '2001-07-01', '2000-08-02', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `resources`
--

CREATE TABLE `resources` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `available` varchar(100) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(100) NOT NULL,
  `toolstatus` enum('new','used','damaged','') NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `resources`
--

INSERT INTO `resources` (`id`, `name`, `available`, `user_id`, `description`, `toolstatus`, `price`) VALUES
(2, 'laith', 'laithnew', 0, '', '', 0),
(3, 'screwdriver', 'no', 1, 'good', 'new', 25),
(4, 'drill', 'no', 2, 'good', 'used', 600),
(5, 'screwdriverNew', 'no', 5, 'good', 'new', 25),
(6, 'aa', 'no', 55, 'good', 'new', 25),
(7, 'aa', 'no', 55, 'good', 'new', 25),
(8, 'aa', 'no', 55, 'good', 'new', 25),
(9, 'aa', 'no', 55, 'good', 'new', 25),
(10, 'laith', 'no', 55, 'good', 'new', 25),
(11, 'laith', 'laithnew', 0, '', '', 0),
(12, 'laithNewW', 'no', 55, 'good', 'new', 25),
(13, 'laithNew', 'no', 555, 'good', 'new', 25),
(14, 'DDD', 'yes', 555, 'good', 'new', 25);

-- --------------------------------------------------------

--
-- Table structure for table `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`) VALUES
(7, 'Blacksmithing'),
(9, 'Carpentry'),
(4, 'Glassblowing'),
(10, 'Jewelry Making'),
(6, 'Leatherworking'),
(2, 'Metalworking'),
(3, 'Pottery'),
(5, 'Sculpting'),
(8, 'Weaving'),
(1, 'Woodworking');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `TaskID` int(11) NOT NULL,
  `ProjectID` int(11) NOT NULL,
  `AssignedToUserID` int(11) NOT NULL,
  `task_Title` varchar(100) NOT NULL,
  `Description` varchar(100) NOT NULL,
  `DueDate` varchar(100) NOT NULL,
  `Status` varchar(100) NOT NULL DEFAULT 'in progress',
  `CreatedDate` varchar(100) NOT NULL,
  `LastUpdatedDate` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`TaskID`, `ProjectID`, `AssignedToUserID`, `task_Title`, `Description`, `DueDate`, `Status`, `CreatedDate`, `LastUpdatedDate`) VALUES
(3, 1, 1, 'New Task', 'New task forrr', '2024-03-20', 'completed', '2024-03-18', '2024-03-18'),
(4, 1, 1, 'New Task', 'This is a detailed description of the task.', '2024-03-20', 'in progress', '2024-03-18', '2024-03-18');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `first_name`, `last_name`, `email`, `password`) VALUES
(1, 'diaaSh', 'diaa', 'Sharqawi', 'diaaSh7@gmail.com', '$2b$10$52OpUsFaqt4IBeWSLjFsJurLvbc5TJ0gGFUplSVelWIryZrs0W3aK'),
(2, 'ahmadHawari', 'ahamad', 'Hawari', 'ahmadH@hotmail.com', '$2b$10$52OpUsFaqt4IBeWSLjFsJurLvbc5TJ0gGFUplSVelWIryZrs0W3aK'),
(3, 'mohammadKhaled', 'mohammad', 'khaled', 'mohammadKhaled@gmail.com', '$2b$10$52OpUsFaqt4IBeWSLjFsJurLvbc5TJ0gGFUplSVelWIryZrs0W3aK'),
(4, 'rashedSw', 'sawallha', 'rashed', 'rashSw@gmail.com', '$2b$10$52OpUsFaqt4IBeWSLjFsJurLvbc5TJ0gGFUplSVelWIryZrs0W3aK'),
(131, 'BaraSh', 'Bara', 'Sharqawi', 'baraSh2005@gmail.com', '$2b$10$9gdF45UBEPyUGg1swKH8Qenfkfe7EP5nUttHKzsWjl6uzzGjNQCjO'),
(132, 'HasanSh', 'Hasan', 'Sharqawi', 'hasanSh2005@gmail.com', '$2b$10$wbvc7uCHP92..fuwhYiE2OeeifwMnTxca5UvW03/LtLh7UhfrIlpi'),
(133, 'HassasnSh', 'Hasan', 'Sharqawi', 'hasasnSh2005@gmail.com', '$2b$10$DGYHhBpwhpYIpZiNur/H5ulZUBvf671MN32KR26AI0usJk5Weeu/O'),
(134, 'Mohammad', 'Mohammad', 'Sharqawi', 'Mohammad2005@gmail.com', '$2b$10$emzb7rr5y6riiMwXQURdGOLhCRSkbdjva4M1Xu3HsDZqaCVYUsJ9G'),
(135, 'MohammadKahled', 'Mohammad', 'Khaled', 'MohammadKhaled2005@gmail.com', '$2b$10$ILcFEw.zTONQi6gEAKsxl.N.amMpLo3JLjIQe3vhB0CFbByZrlmR6'),
(136, 'MohasmmadKahled', 'Mohammad', 'Khaled', 'MohamsmadKhaled2005@gmail.com', '$2b$10$RE0kcDIZi/8gXk0K7dGD/ee3yhCf6nJ5RxkBPguvh1DPw4w/uxW0W'),
(137, 'MohasmmasssdKahled', 'Mohammad', 'Khaled', 'MohamsmssadKhaled2005@gmail.com', '$2b$10$hKaXRAvsCNSpU9qjvxVg0.bR2ZHDpCt.swKrS5IO6yVTX1fR6iOsa'),
(138, 'MohasmmssasssdKahled', 'Mohammad', 'Khaled', 'MohamsmssssadKhaled2005@gmail.com', '$2b$10$YFv9r0J3R7YL35gR.W9CXuMApdkQfftl3Lxajm/G3f8jM2yFx0vXG'),
(139, 'aA', 'aB', 'aA', '2@gmail.com', '$2b$10$PLQcb4yu65VjQWk8GSA6te7WSRoJXlYghB9tStgXatAADRjytoCW2');

-- --------------------------------------------------------

--
-- Table structure for table `users_location`
--

CREATE TABLE `users_location` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `country_id` int(11) NOT NULL,
  `city_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_location`
--

INSERT INTO `users_location` (`id`, `user_id`, `country_id`, `city_id`) VALUES
(1, 1, 1, 1),
(2, 2, 1, 2),
(3, 3, 1, 3),
(4, 133, 1, 3),
(5, 134, 1, 3),
(6, 135, 1, 3),
(7, 136, 1, 3),
(8, 137, 1, 3),
(9, 138, 1, 3),
(10, 139, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `users_skills`
--

CREATE TABLE `users_skills` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users_skills`
--

INSERT INTO `users_skills` (`id`, `user_id`, `skill_id`) VALUES
(1, 1, 1),
(2, 2, 2),
(3, 3, 1),
(4, 132, 9),
(5, 133, 9),
(6, 134, 9),
(7, 135, 9),
(8, 136, 9),
(9, 137, 9),
(10, 138, 9),
(11, 139, 9);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cities`
--
ALTER TABLE `cities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `countries`
--
ALTER TABLE `countries`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`PaymentID`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `creatorUserID_idx` (`creatorUserID`);

--
-- Indexes for table `projects_invitations`
--
ALTER TABLE `projects_invitations`
  ADD PRIMARY KEY (`invitation_id`),
  ADD UNIQUE KEY `id_UNIQUE` (`invitation_id`),
  ADD KEY `FK_project_id` (`project_id`),
  ADD KEY `FK_user_id_idx` (`user_id`);

--
-- Indexes for table `projects_participants`
--
ALTER TABLE `projects_participants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `FK_project_id_projects_participants` (`project_id`),
  ADD KEY `FK_user_id_users` (`user_id`);

--
-- Indexes for table `rent`
--
ALTER TABLE `rent`
  ADD PRIMARY KEY (`rent_id`);

--
-- Indexes for table `resources`
--
ALTER TABLE `resources`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `name_UNIQUE` (`name`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`TaskID`),
  ADD KEY `t` (`ProjectID`),
  ADD KEY `tt` (`AssignedToUserID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD UNIQUE KEY `username_UNIQUE` (`username`),
  ADD UNIQUE KEY `email_UNIQUE` (`email`);

--
-- Indexes for table `users_location`
--
ALTER TABLE `users_location`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id_idx` (`user_id`),
  ADD KEY `cityID_idx` (`city_id`),
  ADD KEY `countryID_idx` (`country_id`);

--
-- Indexes for table `users_skills`
--
ALTER TABLE `users_skills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_UNIQUE` (`id`),
  ADD KEY `user_id_idx` (`user_id`),
  ADD KEY `skill_id_idx` (`skill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cities`
--
ALTER TABLE `cities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `countries`
--
ALTER TABLE `countries`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `payment`
--
ALTER TABLE `payment`
  MODIFY `PaymentID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `projects_invitations`
--
ALTER TABLE `projects_invitations`
  MODIFY `invitation_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `projects_participants`
--
ALTER TABLE `projects_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `rent`
--
ALTER TABLE `rent`
  MODIFY `rent_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=137;

--
-- AUTO_INCREMENT for table `resources`
--
ALTER TABLE `resources`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `TaskID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `users_location`
--
ALTER TABLE `users_location`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users_skills`
--
ALTER TABLE `users_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `ProjectID` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `RequestingUserID` FOREIGN KEY (`RequestingUserID`) REFERENCES `users` (`id`);

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `FK_creatorUserID` FOREIGN KEY (`creatorUserID`) REFERENCES `users` (`id`);

--
-- Constraints for table `projects_invitations`
--
ALTER TABLE `projects_invitations`
  ADD CONSTRAINT `FK_project_id` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `FK_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `projects_participants`
--
ALTER TABLE `projects_participants`
  ADD CONSTRAINT `FK_project_id_projects_participants` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `FK_user_id_users` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `t` FOREIGN KEY (`ProjectID`) REFERENCES `projects` (`id`),
  ADD CONSTRAINT `tt` FOREIGN KEY (`AssignedToUserID`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_location`
--
ALTER TABLE `users_location`
  ADD CONSTRAINT `cityID` FOREIGN KEY (`city_id`) REFERENCES `cities` (`id`),
  ADD CONSTRAINT `countryID` FOREIGN KEY (`country_id`) REFERENCES `countries` (`id`),
  ADD CONSTRAINT `userID` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users_skills`
--
ALTER TABLE `users_skills`
  ADD CONSTRAINT `skill_id` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
