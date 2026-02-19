const db = require('../../config/db');

// used to find all users except one
function findOtherUsers(user_id, callback) {
    const query = 'SELECT user_id, email, first_name, last_name, date_registered FROM users WHERE user_id != ?';
    db.query(query, [user_id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    })
};

// used to verify for registration/login
function findUserByEmail(email, callback) {
    const query = 'SELECT * FROM users WHERE email = ?'; 
    db.query(query, [email], (err, results) => {
        if (err) return callback(err); 
        callback(null, results[0]); 
    })
};

function insertUser(userData, callback) {
    const query = 'INSERT INTO users (email, password, first_name, last_name) VALUES (?, ?, ?, ?)';
    const { email, password, first_name, last_name } = userData;
    db.query(query, [email, password, first_name, last_name], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    })
};

module.exports = {
    findOtherUsers,
    findUserByEmail, 
    insertUser
};