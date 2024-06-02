/* Create the database */
CREATE DATABASE  IF NOT EXISTS photogaphDB;

use photogaphDB;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS requests;
/* Create the tables */

CREATE TABLE users (
  userID int(9) AUTO_INCREMENT,
  userName varchar(50) NOT NULL,
  email varchar(30) DEFAULT NULL,
  phone varchar(100) DEFAULT NULL,
  addressID int DEFAULT NULL,
  passwordID int DEFAULT NULL,
  roleID int NOT NULL,
  PRIMARY KEY (userID),
  FOREIGN KEY (passwordID) REFERENCES passwords (passwordID),
    FOREIGN KEY (roleID) REFERENCES roles (roleID)
);


CREATE TABLE orders (
    orderID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    photographerID INT NOT NULL,
    confirmed BOOLEAN NOT NULL,
    statusID INT NOT NULL,
    categoryID INT NOT NULL,
    photoDate DATE NOT NULL,
    beginningTime TIME NOT NULL,
    durationTimePhotography double DEFAULT NULL, 
    location VARCHAR(80) DEFAULT NULL,
    payment double DEFAULT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (userID)
        REFERENCES users (userID),
    FOREIGN KEY (photographerID)
        REFERENCES users (userID),
    FOREIGN KEY (categoryID)
        REFERENCES category (categoryID),
    FOREIGN KEY (statusID)
        REFERENCES statuses (statusID)
);

CREATE TABLE passwords (
    passwordID INT AUTO_INCREMENT,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (passwordID)
);

CREATE TABLE category (
    categoryID INT AUTO_INCREMENT,
    photographerID INT NOT NULL,
    categoryName VARCHAR(50) NOT NULL,
    payPerHour DOUBLE NOT NULL,
    numOfEditPictures INT DEFAULT NULL,
    PRIMARY KEY (categoryID),
    FOREIGN KEY (photographerID)
        REFERENCES users (userID)
);

CREATE TABLE roles (
roleID INT AUTO_INCREMENT,
roleName VARCHAR(50) NOT NULL,
    PRIMARY KEY (roleID)
);

CREATE TABLE statuses (
statusID INT AUTO_INCREMENT,
statusName VARCHAR (50) NOT NULL,
    PRIMARY KEY (statusID) 
);

CREATE TABLE requests (
requestID  INT AUTO_INCREMENT,
photographerID INT NOT NULL,
request varchar(100) NOT NULL,
 PRIMARY KEY (requestID),
    FOREIGN KEY (photographerID)
        REFERENCES users (userID)
);
INSERT INTO users (userName, email, phone, addressID, passwordID, roleID) 
VALUES ('JohnDoe', 'john@example.com', '123-456-7890', 1, 1, 1),
       ('JaneDoe', 'jane@example.com', '987-654-3210', 2, 2, 2);

INSERT INTO orders (userID, photographerID, confirmed, statusID, categoryID, photoDate, beginningTime, durationTimePhotography, location, payment) 
VALUES (1, 2, TRUE, 1, 1, '2024-06-02', '12:00:00', 2.5, 'Central Park', 150.00),
       (2, 1, TRUE, 2, 2, '2024-06-03', '14:00:00', 3.0, 'Times Square', 200.00);
       
INSERT INTO passwords (password) 
VALUES ('password123'),
       ('pass456');

INSERT INTO category (photographerID, categoryName, payPerHour, numOfEditPictures) 
VALUES (2, '3YearsOld', 250.00, 15),
       (1, 'Portrait', 180.00, 10);

INSERT INTO roles (roleName) 
VALUES ('Manager'),
	   ('Photographer'),
       ('Waiting'),
       ('Client');

INSERT INTO statuses (statusName) 
VALUES ('Sent'),
       ('Confirmed'),
       ('SentForChange '),
       ('Updated '),
       ('Cancelled');

INSERT INTO requests (photographerID, request) 
VALUES (2, 'I need a photographer for my engagement party on July 15th, 2024.'),
       (1, 'Looking for a portrait photographer for family photoshoot next weekend.');

