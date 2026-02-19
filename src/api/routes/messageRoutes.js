const express = require('express');
const router = express.Router();
const { sendMessage, getMessages } = require('../controllers/messageController');

router.get('/view_messages', getMessages);
router.post('/send_message', sendMessage);

module.exports = router;