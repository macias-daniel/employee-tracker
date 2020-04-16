DROP DATABASE IF EXISTS employeeTracker_db;

CREATE DATABASE employeeTracker_db;

USE employeeTracker_db;

CREATE TABLE employee (
	id INTEGER NOT NULL AUTO_INCREMENT,
    
	first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER, 
    
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INTEGER NOT NULL AUTO_INCREMENT,
    
	name VARCHAR(50) NOT NULL,
    
    PRIMARY KEY (id)
);

CREATE TABLE department (
	id INTEGER NOT NULL AUTO_INCREMENT,
    
	title VARCHAR(50) NOT NULL,
    salary DECIMAL (10, 3) NOT NULL,
    
    PRIMARY KEY (id)
);
