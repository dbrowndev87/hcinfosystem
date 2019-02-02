-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 02, 2019 at 08:19 PM
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
('CIS-2001', 'Advanced Java', 2, 3),
('CIS-2002', 'Advanced C #', 2, 3),
('CIS-2003', 'Advanced Security', 2, 3),
('CIS-2004', 'Advanced Angular', 2, 3),
('CIS-2005', 'Advanced Info-Systems', 2, 3),
('CIS-2006', 'Android Development', 2, 3),
('CIS-2007', 'IOS Developement', 2, 3),
('CIS-2008', 'Advanced Web Developement', 2, 3);

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
(3, 'Computer Networking'),
(4, 'Database Administration'),
(5, 'Networking Administration');

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
(1, 'Full Time', 3),
(2, 'Full Time', 12),
(3, 'Full Time', 13),
(4, 'Full Time', 14);

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
(1, 1, '2019-01-01', '2019-04-11', 'A', 'Fall', 24, 'CIS-1111'),
(2, 1, '2019-01-01', '2019-04-19', 'B', 'Fall', 11, 'CIS-1111'),
(3, 1, '2019-01-03', '2019-04-18', 'C', 'Fall', 21, 'CIS-1111'),
(4, 1, '2019-09-04', '2019-12-04', 'A', 'Fall', 30, 'CIS-1112'),
(5, 1, '2019-09-04', '2019-12-07', 'B', 'Fall', 30, 'CIS-1112'),
(6, 1, '2020-05-14', '2020-09-04', 'L', 'Summer', 20, 'CIS-1112'),
(7, 1, '2020-01-04', '2020-04-29', 'A', 'Spring', 23, 'CIS-1113'),
(8, 1, '2020-05-04', '2020-08-29', 'L', 'Summer', 25, 'CIS-1113'),
(9, 1, '2019-02-21', '2019-02-13', 'A', 'Spring', 22, 'CIS-1114'),
(10, 1, '2020-02-14', '2020-05-16', 'B', 'Spring', 23, 'CIS-1115'),
(11, 1, '2020-09-18', '2019-12-30', 'C', 'Fall', 28, 'CIS-1116'),
(12, 1, '2019-05-04', '2019-09-27', 'B', 'Summer', 30, 'CIS-1118'),
(13, 1, '2019-05-04', '2019-09-27', 'C', 'Summer', 30, 'CIS-1120'),
(14, 1, '2020-01-07', '2019-05-27', 'A', 'Spring', 35, 'CIS-2001'),
(15, 1, '2019-01-07', '2019-05-27', 'A', 'Spring', 29, 'CIS-2002'),
(16, 1, '2020-01-07', '2020-05-27', 'A', 'Spring', 25, 'CIS-2003'),
(17, 1, '2019-01-07', '2019-05-29', 'A', 'Spring', 30, 'CIS-2004'),
(18, 1, '2020-01-07', '2020-05-29', 'A', 'Spring', 30, 'CIS-2004'),
(19, 1, '2020-09-04', '2020-01-07', 'A', 'Fall', 30, 'CIS-2005'),
(20, 1, '2020-09-07', '2020-01-07', 'A', 'Fall', 25, 'CIS-2006'),
(21, 1, '2020-09-04', '2020-01-07', 'A', 'Fall', 25, 'CIS-2007'),
(22, 1, '2020-09-04', '2020-01-07', 'A', 'Fall', 30, 'CIS-2008');

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
(190181, 'Enrolled', 0.00, 11, 0.00),
(190370, 'Enrolled', 0.00, 6, 0.00),
(192232, 'Enrolled', 0.00, 8, 0.00),
(193081, 'Enrolled', 0.00, 10, 0.00),
(193402, 'Enrolled', 0.00, 7, 0.00),
(193820, 'Drop Out', 0.00, 2, 10000.00),
(198309, 'Enrolled', 0.00, 9, 0.00),
(198441, 'Enrolled', 0.00, 16, 0.00);

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
  `type_code` int(1) NOT NULL,
  `address` varchar(140) NOT NULL,
  `dept_id` int(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `email`, `birth_date`, `type_code`, `address`, `dept_id`) VALUES
(1, 'Darcy', 'Browns', 'dbrown32066@hollandcollege.com', '2019-03-18', 1, '8 Bonnie Blink dr.', 1),
(2, 'Test', 'Student', 'teststudent@happycollege.com', '1995-03-09', 3, '123 Student Lane.', 2),
(3, 'Tommy', 'Little', 'testfaculty@happycollege.com', '1970-03-17', 2, '145 Faculty Lane.', 3),
(4, 'Nicholas', 'Peconi', 'npeconi@hollandcollege.com', '2019-03-18', 1, '123 Peconi Lane.', 1),
(5, 'Kristen', 'Murchison', 'kmurchison@hollandcollege.com', '2019-03-18', 1, '876 Murchison Lane.', 1),
(6, 'Paul', 'Walker', 'nicholaspeconi@gmail.com', '2006-02-15', 3, '265 Beau View Lane', 3),
(7, 'Juanita', 'Smith', 'nicholaspeconi@gmail.com', '2019-02-06', 3, 'fgsdfgdfggdfg', 2),
(8, 'Betty', 'Gonazalez', 'nicholaspeconi@gmail.com', '1999-02-17', 3, '265 Beau View Lane', 2),
(9, 'veronica', 'smalls', 'nicholaspeconi@gmail.com', '2019-02-20', 3, '265 Beau View Lane', 2),
(10, 'Carlos', 'smith', 'nicholaspeconi@gmail.com', '2019-02-13', 3, '265 Beau View Lane', 2),
(11, 'steve', 'johanson', 'nicholaspeconi@gmail.com', '1999-02-17', 3, '265 Beau View Lane', 2),
(12, 'David', 'Crinshaw', 'dcrinshaw@happycollege.com', '1974-02-13', 2, '123 Park View Lane.', 3),
(13, 'Daphne', 'Gaudet', 'dgaudet@happycollege.com', '1982-06-18', 2, '45 Crescent St.', 4),
(14, 'Jake', 'Chaisson', 'jchaisson@happycollege.com', '1987-10-14', 2, '254 Cedar ln', 5),
(15, 'david', 'jeffree', 'djeffree@happycollege.com', '2019-02-15', 1, '123 Goldpark dr.', 1),
(16, 'Jammie', 'Furgason', 'jfurgeson@happycollege.com', '1988-04-14', 3, '435 Cambrige Ave', 4);

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
('BGonaz1479', '2c22412ba55b11b0e91c1d5586ea2612', 1, 8),
('Csmith9348', 'fead790cd8793e86429758988526dab5', 1, 10),
('dbrown32066', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 1),
('DCrins4798', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 12),
('DGaudet663', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 13),
('djeffr0626', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 15),
('JChais1156', '2c22412ba55b11b0e91c1d5586ea2612', 1, 14),
('JFurga7296', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 16),
('JSmith7311', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 7),
('kmerchison', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 5),
('npeconi', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 4),
('PWalker383', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 6),
('sjohan4759', 'fd2c527e73a8ded2bb986b706fa6bee9', 1, 11),
('testfaculty', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 3),
('teststudent', '5f4dcc3b5aa765d61d8327deb882cf99', 1, 2),
('vsmalls667', '68ae82181c5617be297cf9729bf71eb7', 1, 9);

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
  MODIFY `enrollment_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `faculty`
--
ALTER TABLE `faculty`
  MODIFY `faculty_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `section`
--
ALTER TABLE `section`
  MODIFY `section_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `course_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `department` (`dept_id`);

--
-- Constraints for table `department`
--
ALTER TABLE `department`
  ADD CONSTRAINT `department_ibfk_1` FOREIGN KEY (`dept_id`) REFERENCES `user` (`user_id`);

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

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`type_code`) REFERENCES `user_type_code` (`type_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
