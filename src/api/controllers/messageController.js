require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findMessageHistory, insertMessage } = require('../models/message');

function getMessageHistory(req, res) {

    const user_id = parseInt(req.params.user_id);
    const receiver_id = parseInt(req.params.receiver_id);

    // authorization check
    if (user_id !== req.user.user_id) {
        return res.status(403).json({
            error_code: 403,
            error_title: 'forbidden',
            error_message: 'you are not authorized to see messages for this user'
        });
    }

    findMessageHistory(user_id, receiver_id, (err, messages) => {
        if (err) { 
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
    const content = req.body.content;
    let user_id = parseInt(req.body.sender_id);
    const receiver_id = parseInt(req.body.receiver_id);
    if (!content || !user_id || !receiver_id) {
        return res.status(400).json({
            error_code: 400,
            error_title: 'message sending error',
            error_message: 'missing required fields'
        });
    };

    // authorization check
    if (parseInt(user_id) !== req.user.user_id) {
        return res.status(403).json({
            error_code: 403,
            error_title: 'forbidden',
            error_message: 'you are not authorized to send messages on behalf of this user'
        });
    }

    insertMessage(req.body, (err, messageData) => {
        if (err) { 
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

module.exports = {
    getMessageHistory,
    sendMessage
}