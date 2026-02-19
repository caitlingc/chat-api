const { findMessageHistory, insertMessage } = require('../models/messageModel');

function getMessageHistory(req, res) {
    const { user_id, receiver_id } = req.params;
    findMessageHistory(user_id, receiver_id, (err, messages) => {
        if (err) {
            console.error("error retrieving message history:", err);
            return res.status(500).json({
                error_code: 500,
                error_title: 'message history retrieval failure',
                error_message: 'an error occurred while retrieving message history'
            });
        }
        
        res.status(200).json(messages); // successful retrieval
    });
};

function sendMessage(req, res) {
    const { content, senderId, recipientId } = req.body;
    if (!content || !senderId || !recipientId) {
        return res.status(400).json({
            error_code: 400,
            error_title: 'message sending error',
            error_message: 'missing required fields'
        });
    };

    insertMessage(req.body, (err, messageData) => {
        if (err) {
            console.error("error inserting message:", err);
            return res.status(500).json({
                error_code: 500,
                error_title: 'message sending failure',
                error_message: 'an error occurred while sending the message'
            });
        }
        res.status(201).json({
            successs_code: 201,
            success_title: 'message sent',
            success_message: 'message sent successfully',
            message: messageData
        }); // message sent
    });
}; 