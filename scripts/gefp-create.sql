USE gefp;

#CREATE TABLES

#ADD IN USERS
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('administrator', 'cysun', 'abcd', 1, 1, NOW(), NOW());
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('advisor', 'tfox', 'abcd', 1, 1, NOW(), NOW());
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('student', 'jdoe1', 'abcd', 1, 3, NOW(), NOW());
INSERT INTO users (type, username, password, department, flightplan, createdAt, updatedAt) VALUES ('student', 'jdoe2', 'abcd', 2, 4, NOW(), NOW());

#ADD IN DEPARTMENTS
INSERT INTO departments (name, flightplan, createdAt, updatedAt) VALUES ('Computer Science', 1, NOW(), NOW());
INSERT INTO departments (name, flightplan, createdAt, updatedAt) VALUES ('Electrical Engineering', 1, NOW(), NOW());

#ADD FLIGHT PLAN
#Department
INSERT INTO flightplans (revision, department, user, createdAt, updatedAt) VALUES (1, 1, '', NOW(), NOW());
INSERT INTO flightplans (revision, department, user, createdAt, updatedAt) VALUES (1, 2, '', NOW(), NOW());

#Users
INSERT INTO flightplans (revision, department, user, createdAt, updatedAt) VALUES (1, 1, 3, NOW(), NOW());
INSERT INTO flightplans (revision, department, user, createdAt, updatedAt) VALUES (1, 1, 4, NOW(), NOW());


#ADD CHECKPOINTS FOR USERS
#jdoe1 - single checked.
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 3, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Take a personal assessment', 2, 2, '', '', 4, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 3, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 3, 'unchecked', NOW(), NOW());

#jdoe2 - all checked.
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 4, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 4, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 4, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 4, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Take a personal assessment', 2, 2, '', '', 4, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 4, 'checked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 4, 'checked', NOW(), NOW());


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
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Algebra (before Yr1)', 1, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Pre-calculus (before Yr1)', 1, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Math 206 (Calc I)', 1, 2, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Apply for financial aid and scholarships', 2, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Take a personal assessment', 2, 2, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Make a list of questions to ask during orientation and ask them!', 3, 1, '', '', 1, 'unchecked', NOW(), NOW());
INSERT INTO checkpoints (name, runway, stage, content, contentType, flightplan, status, createdAt, updatedAt) VALUES ('Find out about ECST student organizations at ECST week ', 3, 2, '', '', 1, 'unchecked', NOW(), NOW());


#ADD RUNWAY
#Flightplan 1
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Academics', 1, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Career Preparation', 1, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Leadership & Community Engagement', 1, NOW(), NOW());

#Flightplan 2
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Academics', 2, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Career Preparation', 2, NOW(), NOW());
INSERT INTO runways (name, flightplan, createdAt, updatedAt) VALUES ('Leadership & Community Engagement', 2, NOW(), NOW());


#ADD STAGE                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
#Flightplan 1
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Pre-College (pre-flight checklist)', 1, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Freshman (take-off)', 1, NOW(), NOW());

#Flightplan 2
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Pre-College (pre-flight checklist)', 2, NOW(), NOW());
INSERT INTO stages (name, flightplan, createdAt, updatedAt) VALUES ('Freshman (take-off)', 2, NOW(), NOW());
