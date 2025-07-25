CREATE DATABASE car_service_db;
USE car_service_db;


CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE accessories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  description TEXT,
  image_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  companyName VARCHAR(100),
  color VARCHAR(50),
  kilometersDriven INT,
  lastServicedKm INT,
  model VARCHAR(50),
  variant VARCHAR(50),
  fuelType VARCHAR(50),
  bookingSlot DATETIME,
  status ENUM('booked', 'completed', 'cancelled') DEFAULT 'booked',
  FOREIGN KEY (user_id) REFERENCES users(id)
);

select * from appointments;

