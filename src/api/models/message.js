const db = require('../../config/db');

function findMessageHistory(sender_id, receiver_id, callback) {
    const query = `SELECT * FROM messages WHERE sender_id = ? AND receiver_id = ? 
                   ORDER BY date_created DESC`;
    db.query(query, [sender_id, receiver_id], (err, results) => {
        if (err) return callback(err);
        callback(null, results); 
    });
}

function insertMessage(messageData, callback) {
    const {content, sender_id, receiver_id} = messageData;
    const query = 'INSERT INTO messages (content, sender_id, receiver_id) VALUES (?, ?, ?)';
    db.query(query, [content, sender_id, receiver_id], (err, result) => {
        if (err) return callback(err);
        callback(null, result); 
    })
}; 

module.exports = {
    findMessageHistory,
    insertMessage
};