/* Create the database */
CREATE DATABASE IF NOT EXISTS photogaphDB;

USE photogaphDB;

/* Drop existing tables if they exist */
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS requests;
DROP TABLE IF EXISTS relations;
DROP TABLE IF EXISTS photo_upload;
DROP TABLE IF EXISTS photographers;
DROP TABLE IF EXISTS passwords;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS statuses;
DROP TABLE IF EXISTS roles;

/* Create the tables */

CREATE TABLE statuses (
    statusID INT AUTO_INCREMENT,
    statusName VARCHAR(50) NOT NULL,
    PRIMARY KEY (statusID)
);

CREATE TABLE roles (
    roleID INT AUTO_INCREMENT,
    roleName VARCHAR(50) NOT NULL,
    PRIMARY KEY (roleID)
);

CREATE TABLE users (
    userID INT AUTO_INCREMENT,
    userName VARCHAR(50) NOT NULL,
    email VARCHAR(30) DEFAULT NULL,
    phone VARCHAR(100) DEFAULT NULL,
    roleID INT NOT NULL,
    PRIMARY KEY (userID),
    FOREIGN KEY (roleID)
        REFERENCES roles (roleID)
);

CREATE TABLE passwords (
    passwordID INT AUTO_INCREMENT,
    userID INT NOT NULL,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (passwordID),
    FOREIGN KEY (userID)
        REFERENCES users (userID)
);

CREATE TABLE photographers (
    photographerID INT AUTO_INCREMENT,
    aboutMe VARCHAR(500) DEFAULT NULL,
    isActive BOOLEAN NOT NULL,
    PRIMARY KEY (photographerID),
    FOREIGN KEY (photographerID)
        REFERENCES users (userID)
);

CREATE TABLE relations (
    relationID INT AUTO_INCREMENT,
    photographerID INT NOT NULL,
    clientID INT NOT NULL,
    PRIMARY KEY (relationID),
    FOREIGN KEY (photographerID)
        REFERENCES users (userID),
    FOREIGN KEY (clientID)
        REFERENCES users (userID)
);

CREATE TABLE category (
    categoryID INT AUTO_INCREMENT,
    photographerID INT NOT NULL,
    categoryName VARCHAR(50) NOT NULL,
    payPerHour DOUBLE NOT NULL,
    numOfEditPictures INT DEFAULT NULL,
    PRIMARY KEY (categoryID),
    FOREIGN KEY (photographerID)
        REFERENCES photographers (photographerID)
);

CREATE TABLE requests (
    requestID INT AUTO_INCREMENT,
    photographerID INT NOT NULL,
    request VARCHAR(100) NOT NULL,
    statusID INT NOT NULL,
    PRIMARY KEY (requestID),
    FOREIGN KEY (photographerID)
        REFERENCES users (userID),
    FOREIGN KEY (statusID)
        REFERENCES statuses (statusID)
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
    durationTimePhotography DOUBLE DEFAULT NULL,
    location VARCHAR(80) DEFAULT NULL,
    payment DOUBLE DEFAULT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (userID)
        REFERENCES users (userID),
    FOREIGN KEY (photographerID)
        REFERENCES photographers (photographerID),
    FOREIGN KEY (categoryID)
        REFERENCES category (categoryID),
    FOREIGN KEY (statusID)
        REFERENCES statuses (statusID)
);

CREATE TABLE photo_upload (
    photoID INT AUTO_INCREMENT PRIMARY KEY,
    photographerID INT NOT NULL,
    url_photo VARCHAR(255) NOT NULL,
    date DATETIME NOT NULL,
    FOREIGN KEY (photographerID) REFERENCES photographers(photographerID)
);

/* Insert initial data */



INSERT INTO roles (roleName) VALUES
('Manager'),
('Photographer'),
('Client'),
('Waiting');

INSERT INTO statuses (statusName) VALUES
('Sent'),
('SentForChange'),
('Updated'),
('Confirmed'),
('Cancelled'),
('Completed'),
('ClientCancelled');

INSERT INTO users (userName, email, phone, roleID) VALUES 
('Osnat Shachor', 'osnaty16@gmail.com', '0556777410',  1),
('Yael Korenfeld', 'yaelr5754@gmail.com', '050-456-7890',  2),
('Chaya Smith', 'chayaosn@g.jct.ac.il', '987-654-3210', 2),
('Ariel Kramer', 'torasolider@gmail.com', '555-123-4567', 2),
('Ayala Herz', 'ayala369h@gmail.com', '444-555-6666', 2),
('Mosh Davis', 'osnaty999@gmail.com', '052-444-5555', 2);

INSERT INTO passwords (userID, password) VALUES
(1, '$2b$10$fVihzL0ZBuFBFR4Y3maUFOjfLJ2qwiqGlQid6Hjz7XevP8z/1tc9O'),
(2, '$2b$10$865KDpY0T1FvHQPhYwaOUemV4nogoDBd9S8vitegl/.moVyvzOmkC'),
(3, 'password123'),
(4, '$2b$10$JK1ZKM2H1UxEctmFHb6bKetvHDELNCBAK/KmhjMmRNdJr5ndjSHha'),
(5, 'pass456'),
(6, '$2b$10$p3.mZIYNAT9hvTGaSwzYCe9Gt3HHZjroW2ELhscqvvewwHQ3h6l1e');

INSERT INTO photographers (photographerID, aboutMe, isActive) VALUES 
(2, 'Nature and landscape photographer with 10 years of experience.', TRUE),
(3, 'Fashion photographer based in New York.', FALSE),
(4, 'Freelance photographer working on travel and adventure photography.', TRUE),
(5, 'Experienced in food photography for restaurants and cookbooks.', FALSE),
(6, 'I am a professional photographer specializing in weddings and portraits.', TRUE);


INSERT INTO category (photographerID, categoryName, payPerHour, numOfEditPictures) VALUES
(2, 'New-Born', 300.00, 8),
(2, 'חלאקה', 250.00, 8),
(2, 'משפחה', 300.00, 12),
(6, 'בת מצווה', 200.00, 8),
(6, 'אירוע', 200.00, 0),
(4, 'חתונה', 1000.00, 15),
(4, 'פרוטריט', 180.00, 10);

INSERT INTO photo_upload (photographerID, url_photo, date) VALUES
    (4, 'uploads\\4\\photo_1720428842342.jpg', '2024-07-08 11:54:02'),
    (4, 'uploads\\4\\photo_1720428862606.jpg', '2024-07-08 11:54:23'),
    (4, 'uploads\\4\\photo_1720428880143.jpg', '2024-07-08 11:54:40'),
    (4, 'uploads\\4\\photo_1720428896370.jpg', '2024-07-08 11:54:56'),
    (4, 'uploads\\4\\photo_1720428910607.jpg', '2024-07-08 11:55:11'),
    (4, 'uploads\\4\\photo_1720428932466.jpg', '2024-07-08 11:55:32'),
    (4, 'uploads\\4\\photo_1720436850379.jpg', '2024-07-08 11:55:32'),
    (2, 'uploads\\2\\photo_1720433608763.JPG', '2024-07-08 11:54:02'),
    (2, 'uploads\\2\\photo_1720433618551.JPG', '2024-07-08 11:54:23'),
    (2, 'uploads\\2\\photo_1720434157303.JPG', '2024-07-08 11:54:40'),
    (2, 'uploads\\2\\photo_1720434191688.JPG', '2024-07-08 12:55:11'),
    (2, 'uploads\\2\\photo_1720434174936.JPG', '2024-07-08 11:54:56'),
    (2, 'uploads\\2\\photo_1720434241224.JPG', '2024-07-08 11:55:32'),
    (2, 'uploads\\2\\photo_1720434527373.jpg', '2024-07-08 11:54:56'),
    (2, 'uploads\\2\\photo_1720434563336.jpg', '2024-07-08 12:55:11'),
    (2, 'uploads\\2\\photo_1720434587630.jpg', '2024-07-08 12:55:32');


INSERT INTO orders (userID, photographerID, confirmed, statusID, categoryID, photoDate, beginningTime, durationTimePhotography, location, payment) VALUES
(1, 2, TRUE, 1, 1, '2024-06-02', '12:00:00', 2.5, 'גן הוורדים', 650.00),
(3, 3, TRUE, 2, 2, '2024-06-03', '14:00:00', 3.0, 'מתחם התחנה', 540.00);

INSERT INTO requests (photographerID, request, statusID) VALUES
(1, 'I need a photographer for my engagement party on July 15th, 2024.', 4),
(5, 'I want to open a website for myself. I have been shooting for 3 years', 1),
(3, 'Looking for a portrait photographer for family photoshoot next weekend.', 3);
