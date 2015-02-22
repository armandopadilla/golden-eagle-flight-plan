USE gefp;

#CREATE TABLES - Schema created by ORM
DROP TABLE IF EXISTS `checkpoints`;
CREATE TABLE `checkpoints` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `runway` int(11) DEFAULT NULL,
  `stage` int(11) DEFAULT NULL,
  `content` longtext,
  `contentType` longtext,
  `flightplan` int(11) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `account_id` int(11),
  PRIMARY KEY (`id`)
);


CREATE TABLE `departments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `flightplan` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);


CREATE TABLE `flightplans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `revision` int(11) DEFAULT 1,
  `department` int(11) DEFAULT 0,
  `user` int(11) DEFAULT 0,
  `name` varchar(300) NOT NULL,
  `status` varchar(10) NOT NULL DEFAULT 'inactive',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `runways` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `flightplan` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);


CREATE TABLE `stages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(200) DEFAULT NULL,
  `flightplan` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(16) DEFAULT NULL,
  `department` int(11) DEFAULT NULL,
  `flightplan` int(11) DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
);


#ADD IN USERS
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('administrator', 'cysun', 'abcd', 1, 1, NOW(), NOW());
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('advisor', 'tfox', 'abcd', 1, 1, NOW(), NOW());
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('student', 'jdoe1', 'abcd', 1, 1, NOW(), NOW());
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('student', 'jdoe2', 'abcd', 1, 1, NOW(), NOW());

#ADD IN DEPARTMENTS
INSERT INTO departments (name, flightplan, createdAt, updatedAt) VALUES ('Computer Science', 1, NOW(), NOW());
INSERT INTO departments (name, flightplan, createdAt, updatedAt) VALUES ('Electrical Engineering', 2, NOW(), NOW());

#ADD FLIGHT PLAN
#Department
INSERT INTO flightplans (revision, department, user, name, status, createdAt, updatedAt) VALUES (1, 1, '', 'Computer Science Plan', 'active', NOW(), NOW());
INSERT INTO flightplans (revision, department, user, name, status, createdAt, updatedAt) VALUES (1, 2, '', 'Electrical Engineering Plan', 'active', NOW(), NOW());
INSERT INTO flightplans (revision, department, user, name, status, createdAt, updatedAt) VALUES (1, 1, '', 'Computer Science Plan 2', 'inactive', NOW(), NOW());

#Users
INSERT INTO flightplans (revision, department, user, createdAt, updatedAt) VALUES (1, 1, 3, NOW(), NOW());
INSERT INTO flightplans (revision, department, user, createdAt, updatedAt) VALUES (1, 1, 4, NOW(), NOW());


#ADD CHECKPOINTS FOR USERS
#jdoe1 - single checked.
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 1, 'unchecked', NOW(), NOW(), 3);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 1, 'unchecked', NOW(), NOW(), 3);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 1, 'unchecked', NOW(), NOW(), 3);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 1, 'checked', NOW(), NOW(), 3);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Take a personal assessment', 2, 2, '', '', 1, 'unchecked', NOW(), NOW(), 3);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 1, 'unchecked', NOW(), NOW(), 3);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 1, 'unchecked', NOW(), NOW(), 3);

#jdoe2 - all checked.
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 1, 'checked', NOW(), NOW(), 4);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 1, 'checked', NOW(), NOW(), 4);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 1, 'checked', NOW(), NOW(), 4);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 1, 'checked', NOW(), NOW(), 4);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Take a personal assessment', 2, 2, '', '', 1, 'checked', NOW(), NOW(), 4);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 1, 'checked', NOW(), NOW(), 4);
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt, account_id) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 1, 'unchecked', NOW(), NOW(), 4);


#ADD CHECKPOINTS FOR DEPARTMENT
#Flightplan 1
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Take a personal assessment', 2, 2, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 1, 'unchecked', NOW(), NOW());

#Flightplan 2
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Algebra (before Yr1)', 4, 3, '', '', 2, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Pre-calculus (before Yr1)', 4, 3, '', '', 2, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Math 206 (Calc I)', 5, 4, '', '', 2, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Apply for financial aid and scholarships', 6, 3, '', '', 2, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Take a personal assessment', 6, 3, '', '', 2, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Make a list of questions to ask during orientation and ask them!',6, 3, '', '', 2, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Find out about ECST student organizations at ECST week ', 6, 4, '', '', 2, 'unchecked', NOW(), NOW());

#Flightplan 3
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Take a personal assessment', 2, 2, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 3, 'unchecked', NOW(), NOW());


#ADD STAGES
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Pre-College (pre-flight checklist)', 1, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Freshman (take-off)', 1, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Pre-College (pre-flight checklist)', 2, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Freshman (take-off)', 2, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Pre-College (pre-flight checklist)', 3, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Freshman (take-off)', 3, NOW(), NOW());


#ADD RUNWAY
#Flightplan 1
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Academics', 1, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Career Preparation', 1, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Leadership & Community Engagement', 1, NOW(), NOW());

#Flightplan 2
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Academics', 2, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Career Preparation', 2, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Leadership & Community Engagement', 2, NOW(), NOW());

#Flightplan 3
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Academics 2', 3, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Career Preparation 2', 3, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Leadership & Community Engagement 2', 3, NOW(), NOW());