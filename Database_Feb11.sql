-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 11, 2019 at 05:34 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `goldstar`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAllStudents` (INOUT `type` INT(1))  NO SQL
SELECT * FROM user WHERE user.type_code = type$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `course_id` varchar(12) NOT NULL,
  `course_name` varchar(140) NOT NULL,
  `dept_id` int(6) NOT NULL,
  `credits` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`course_id`, `course_name`, `dept_id`, `credits`) VALUES
('CIS-1111', 'Introduction to Web Developement', 2, 3),
('CIS-1112', 'Introduction to Object-Oriented', 2, 3),
('CIS-1113', 'Info Security 101', 2, 3),
('CIS-1114', 'Security 102', 2, 3),
('CIS-1115', 'Database Management', 2, 3),
('CIS-1116', 'Programming Logic', 2, 3),
('CIS-1117', 'Intermediate Object-Oriented', 2, 3),
('CIS-1118', 'Intermediate Web Development', 2, 3),
('CIS-1119', 'Intermediate Programming Logic', 2, 3),
('CIS-1120', 'Intermediate Security Concepts', 2, 3),
('NET-1211', 'Intro to Networking ', 3, 3),
('NET-1212', 'Intermediate Networking', 3, 3),
('NET-1213', 'Advanced Networking', 3, 2),
('NET-1214', 'Sysco 101', 3, 3),
('NET-1215', 'Intro to Linux', 3, 3),
('NET-1216', 'Intro to Programming', 3, 3),
('NET-1217', 'Networking Concepts', 3, 3),
('NET-1218', 'Network Analysis', 3, 3),
('NET-1219', 'Intro to Network Security ', 3, 3),
('NET-1220', 'Secure Network Concepts', 3, 3),
('NET-1221', 'Intranet 101', 3, 3),
('NET-1222', 'Sysco 202', 3, 3);

-- --------------------------------------------------------

--
-- Table structure for table `department`
--

CREATE TABLE `department` (
  `dept_id` int(6) NOT NULL,
  `dept_name` varchar(140) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `department`
--

INSERT INTO `department` (`dept_id`, `dept_name`) VALUES
(1, 'Administration'),
(2, 'Computer Information and Systems'),
(3, 'Computer Networking');

-- --------------------------------------------------------

--
-- Table structure for table `enrollment`
--

CREATE TABLE `enrollment` (
  `enrollment_id` int(6) NOT NULL,
  `student_id` int(6) NOT NULL,
  `section_id` int(6) NOT NULL,
  `course_status` varchar(20) NOT NULL,
  `grade` double(5,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `enrollment`
--
DELIMITER $$
CREATE TRIGGER `update_vacancy` AFTER INSERT ON `enrollment` FOR EACH ROW UPDATE section
SET section.vacancy = section.vacancy - 1
WHERE section.section_id = new.section_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `faculty_id` int(6) NOT NULL,
  `faculty_status` varchar(20) NOT NULL,
  `user_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`faculty_id`, `faculty_status`, `user_id`) VALUES
(1, 'Full Time', 10),
(2, 'Full Time', 11),
(3, 'Full Time', 12),
(4, 'Full Time', 13),
(5, 'Full Time', 16);

-- --------------------------------------------------------

--
-- Table structure for table `section`
--

CREATE TABLE `section` (
  `section_id` int(6) NOT NULL,
  `faculty_id` int(6) NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `designation` char(1) NOT NULL,
  `semester` varchar(10) NOT NULL,
  `vacancy` int(3) NOT NULL,
  `course_id` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `section`
--

INSERT INTO `section` (`section_id`, `faculty_id`, `start_date`, `end_date`, `designation`, `semester`, `vacancy`, `course_id`) VALUES
(1, 1, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'CIS-1111'),
(2, 2, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'CIS-1111'),
(25, 1, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'CIS-1112'),
(26, 2, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'CIS-1112'),
(27, 1, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'CIS-1113'),
(28, 2, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'CIS-1113'),
(29, 1, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'CIS-1114'),
(30, 2, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'CIS-1114'),
(31, 1, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'CIS-1115'),
(32, 2, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'CIS-1115'),
(33, 3, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'NET-1211'),
(34, 4, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'NET-1211'),
(35, 3, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'NET-1212'),
(36, 4, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'NET-1212'),
(37, 3, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'NET-1213'),
(38, 4, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'NET-1213'),
(39, 3, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'NET-1214'),
(40, 4, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'NET-1214'),
(41, 3, '2019-01-07', '2019-04-18', 'A', 'Summer', 30, 'NET-1215'),
(42, 4, '2019-01-07', '2019-04-18', 'B', 'Summer', 30, 'NET-1215');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(6) NOT NULL,
  `student_status` varchar(20) NOT NULL,
  `gpa` double(5,2) NOT NULL,
  `user_id` int(6) NOT NULL,
  `amount_owing` double(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `student_status`, `gpa`, `user_id`, `amount_owing`) VALUES
(190572, 'Enrolled', 0.00, 8, 0.00),
(191234, 'Enrolled', 0.00, 15, 0.00),
(192389, 'Enrolled', 0.00, 3, 0.00),
(192551, 'Enrolled', 0.00, 9, 0.00),
(193778, 'Enrolled', 0.00, 6, 0.00),
(194158, 'Enrolled', 0.00, 5, 0.00),
(194773, 'Enrolled', 0.00, 4, 0.00),
(196943, 'Enrolled', 0.00, 2, 0.00),
(199289, 'Enrolled', 0.00, 7, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `trans_id` int(10) NOT NULL,
  `trans_amount` double(8,2) NOT NULL,
  `trans_date` date NOT NULL,
  `student_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Triggers `transaction`
--
DELIMITER $$
CREATE TRIGGER `update_amount_owing` AFTER INSERT ON `transaction` FOR EACH ROW UPDATE student
SET student.amount_owing = student.amount_owing - new.trans_amount
WHERE student.student_id = new.student_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(6) NOT NULL,
  `first_name` varchar(30) NOT NULL,
  `last_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `birth_date` date NOT NULL,
  `start_date` date NOT NULL,
  `type_code` int(1) NOT NULL,
  `address` varchar(140) NOT NULL,
  `dept_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `birth_date`, `start_date`, `type_code`, `address`, `dept_id`) VALUES
(1, 'Darcy', 'Brown', 'dbrown32066@hollandcollege.com', '2019-03-18', '2019-01-01', 1, '8 Bonnie Blink dr.', 1),
(2, 'David', 'Hawkings', 'dhawkings@happycollege.com', '1989-02-15', '2019-02-11', 3, '123 Main St. ', 2),
(3, 'Carl', 'Johnston', 'cjohnston', '1991-02-13', '2019-02-11', 3, '236 Sparrow Ln.', 2),
(4, 'Janette', 'Arsenault', 'jarsenault@happycollege.com', '1994-02-09', '2019-02-11', 3, '4214 Lake View Cres.', 2),
(5, 'Leanne', 'Gaudet', 'lgaudet@happycollege.com', '1993-02-10', '1991-06-15', 3, '135 Park Side Ln.', 2),
(6, 'Jason', 'Thomas', 'jthomas@happycollege.com', '1989-08-17', '2019-02-14', 3, '5332 Gibson St.', 3),
(7, 'Kyle', 'Arthur', 'karthur@happycollege.com', '1992-02-12', '2019-02-23', 3, '199 Sicamore Cres.', 3),
(8, 'Jane', 'Sweenie', 'jsweenie@happycollege.com', '1993-07-16', '2019-02-11', 3, '3544 Hallow ln.', 3),
(9, 'Kaylee', 'Little', 'klittle@happycollege.com', '1992-10-15', '2019-02-11', 3, '424 Pine St.', 3),
(10, 'Deloris', 'Perry', 'dperry@happycollege.com', '1971-06-10', '2017-11-15', 2, '2334 Sea Point.', 2),
(11, 'Johnathan', 'Cambell', 'jcambell@happycollege.com', '1983-04-19', '2018-12-19', 2, '975 Tortoise Ln.', 2),
(12, 'Trudy', 'Raymond', 'traymond@happycollege.com', '1984-05-25', '2018-09-19', 2, '143 Kissle Ave.', 3),
(13, 'Justin', 'Tissle', 'jtissle@happycollege.com', '1987-10-23', '2019-01-16', 2, '265 Sparrow Ln.', 3),
(14, 'Test', 'Admin', 'testadmin@happycollege.com', '2019-02-20', '2019-02-14', 1, '123 Test Admin Ln.', 1),
(15, 'Test', 'Student', 'teststudent@happycollege.com', '2019-02-20', '2019-02-15', 3, '123 Test Student Ln.', 2),
(16, 'Test', 'Faculty', 'testfaculty@happycollege.com', '2019-02-27', '2019-02-13', 2, '123 Text Faculty ln.', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `username` varchar(12) NOT NULL,
  `password` varchar(50) NOT NULL,
  `active` tinyint(1) NOT NULL DEFAULT '0',
  `user_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`username`, `password`, `active`, `user_id`) VALUES
('cjohns0333', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 3),
('dbrown32066', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 1),
('dhawki9319', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 2),
('dperry5384', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 10),
('jarsen2278', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 4),
('jcambe6778', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 11),
('jsween9567', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 8),
('jthomas475', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 6),
('jtissle093', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 13),
('karthur189', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 7),
('klittle615', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 9),
('lgaudet952', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 5),
('testadmin', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 14),
('testfaculty', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 16),
('teststudent', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 15),
('traymo8595', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 12);

-- --------------------------------------------------------

--
-- Table structure for table `user_type_code`
--

CREATE TABLE `user_type_code` (
  `type_code` int(1) NOT NULL,
  `user_description` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type_code`
--

INSERT INTO `user_type_code` (`type_code`, `user_description`) VALUES
(1, 'Admin'),
(2, 'Faculty'),
(3, 'Student');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`course_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `department`
--
ALTER TABLE `department`
  ADD PRIMARY KEY (`dept_id`);

--
-- Indexes for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD PRIMARY KEY (`enrollment_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `section_id` (`section_id`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`faculty_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `section`
--
ALTER TABLE `section`
  ADD PRIMARY KEY (`section_id`),
  ADD KEY `faculty_id` (`faculty_id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`trans_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD KEY `type_code` (`type_code`),
  ADD KEY `dept_id` (`dept_id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`username`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user_type_code`
--
ALTER TABLE `user_type_code`
  ADD PRIMARY KEY (`type_code`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `department`
--
ALTER TABLE `department`
  MODIFY `dept_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `enrollment`
--
ALTER TABLE `enrollment`
  MODIFY `enrollment_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `faculty_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`);

--
-- Constraints for table `enrollment`
--
ALTER TABLE `enrollment`
  ADD CONSTRAINT `enrollment_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`),
  ADD CONSTRAINT `enrollment_ibfk_2` FOREIGN KEY (`section_id`) REFERENCES `section` (`section_id`);

--
-- Constraints for table `faculty`
--
ALTER TABLE `faculty`
  ADD CONSTRAINT `faculty_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `section`
--
ALTER TABLE `section`
  ADD CONSTRAINT `section_ibfk_1` FOREIGN KEY (`faculty_id`) REFERENCES `faculty` (`faculty_id`),
  ADD CONSTRAINT `section_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `course` (`course_id`);

--
-- Constraints for table `student`
--
ALTER TABLE `student`
  ADD CONSTRAINT `student_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
