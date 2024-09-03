CREATE DATABASE mall - insights;

USE mall - insights;

CREATE TABLE
    recipes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        ingredients TEXT NOT NULL,
        instructions TEXT NOT NULL,
        caloriesPerServing INT NOT NULL,
        servings INT NOT NULL
    )
CREATE TABLE
    users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    )
CREATE TABLE
    accounts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255),
        isActive BOOLEAN,
        accountType VARCHAR(50) NOT NULL DEFAULT 'Individual',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );

CREATE TABLE
    shops (
        id INT AUTO_INCREMENT PRIMARY KEY,
        accountId INT,
        name VARCHAR(255) NOT NULL,
        businessName VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        businessAddress VARCHAR(255),
        internalAddress VARCHAR(255),
        taxInformation VARCHAR(255),
        industry VARCHAR(100) NOT NULL,
        isActive BOOLEAN,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (accountId) REFERENCES accounts (id)
    );