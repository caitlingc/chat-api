-- to reset db
-- DROP DATABASE IF EXISTS chat_db; 

CREATE DATABASE IF NOT EXISTS chat_db; 
USE chat_db;

-- users table
CREATE TABLE users (
	user_id INT AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    first_name VARCHAR(20), 
    last_name VARCHAR(20), 
    date_registered DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- messages table
CREATE TABLE messages (
	msg_id INT AUTO_INCREMENT PRIMARY KEY, 
    content TEXT NOT NULL, 
    time_sent TIMESTAMP DEFAULT CURRENT_TIMESTAMP, 
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL, 
    FOREIGN KEY(sender_id) REFERENCES Users(user_id), 
    FOREIGN KEY(receiver_id) REFERENCES Users(user_id)
);