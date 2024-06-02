/* Create the database */ CREATE DATABASE IF NOT EXISTS photogaphDB;

use photogaphDB;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS orders;

DROP TABLE IF EXISTS passwords;

DROP TABLE IF EXISTS category;

DROP TABLE IF EXISTS roles;

DROP TABLE IF EXISTS statuses;

DROP TABLE IF EXISTS requests;

/* Create the tables */
CREATE TABLE
    users (
        userID int (9) AUTO_INCREMENT,
        userName varchar(50) NOT NULL,
        email varchar(30) DEFAULT NULL,
        phone varchar(100) DEFAULT NULL,
        passwordID int DEFAULT NULL,
        roleID int NOT NULL,
        PRIMARY KEY (userID),
        FOREIGN KEY (passwordID) REFERENCES passwords (passwordID),
        FOREIGN KEY (roleID) REFERENCES roles (roleID)
    );

CREATE TABLE
    orders (
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
        FOREIGN KEY (userID) REFERENCES users (userID),
        FOREIGN KEY (photographerID) REFERENCES users (userID),
        FOREIGN KEY (categoryID) REFERENCES category (categoryID),
        FOREIGN KEY (statusID) REFERENCES statuses (statusID)
    );

CREATE TABLE
    passwords (
        passwordID INT AUTO_INCREMENT,
        password VARCHAR(255) NOT NULL,
        PRIMARY KEY (passwordID)
    );

CREATE TABLE
    category (
        categoryID INT AUTO_INCREMENT,
        photographerID INT NOT NULL,
        categoryName VARCHAR(50) NOT NULL,
        payPerHour DOUBLE NOT NULL,
        numOfEditPictures INT DEFAULT NULL,
        PRIMARY KEY (categoryID),
        FOREIGN KEY (photographerID) REFERENCES users (userID)
    );

CREATE TABLE
    roles (
        roleID INT AUTO_INCREMENT,
        roleName VARCHAR(50) NOT NULL,
        PRIMARY KEY (roleID)
    );

CREATE TABLE
    statuses (
        statusID INT AUTO_INCREMENT,
        statusName VARCHAR(50) NOT NULL,
        PRIMARY KEY (statusID)
    );

CREATE TABLE
    requests (
        requestID INT AUTO_INCREMENT,
        photographerID INT NOT NULL,
        request varchar(100) NOT NULL,
        statusID INT NOT NULL,
        PRIMARY KEY (requestID),
        FOREIGN KEY (photographerID) REFERENCES users (userID) FOREIGN KEY (statusID) REFERENCES statuses (statusID)
    );

INSERT INTO
    users (userName, email, phone, passwordID, roleID)
VALUES
    ( 'Yael','yaelr5754@gmail.com','058-3235754',1,1),
    ('שושי', 'Shosh@gmail.com', '058-3285654', 2, 3),
    ('אסנת שחור','osnaty16@gmail.com','055-6777410', 3, 2 ),
    ('אלישבע', 'Eli@gmail.com', '055-6712410', 4, 3);

INSERT INTO
    orders ( userID, photographerID, confirmed, statusID, categoryID, photoDate, beginningTime, durationTimePhotography,location, payment )
VALUES
    (
        2, 3, TRUE, 1,  1, '2024-06-02', '12:00:00', 2.5, 'גן הוורדים', 650.00
    ),
    (
        2, 3, TRUE, 2, 2,'2024-06-03','14:00:00', 3.0, 'מתחם התחנה', 540.00
    );

INSERT INTO
    passwords (password)
VALUES
    ('managerPass'),
    ('pasrd1234'),
    ('password123'),
    ('pass456');

INSERT INTO
    category (photographerID, categoryName, payPerHour, numOfEditPictures )
VALUES
    (3, 'New-Born', 300.00, 8),
    (3, 'חלאקה', 250.00, 8),
    (3, 'משפחה', 300.00, 12),
    (3, 'בת מצווה', 200.00, 8),
    (3, 'אירוע', 200.00, 0),
    (3, 'חתונה', 1000.00, 15),
    (3, 'פרוטריט', 180.00, 10);

INSERT INTO
    roles (roleName)
VALUES
    ('Manager'),
    ('Photographer'),
    ('Client'),
    ('Waiting');

INSERT INTO
    statuses (statusName)
VALUES
    ('Sent'),
    ('Confirmed'),
    ('SentForChange '),
    ('Updated '),
    ('Cancelled');

INSERT INTO
    requests (photographerID, request, statusID)
VALUES
    ( 3,'I need a photographer for my engagement party on July 15th, 2024.',1),
    ( 3,'I want to open a website for myself. I have been shooting for 3 years',2),
    ( 3,'Looking for a portrait photographer for family photoshoot next weekend.' 5);