const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { sendMessage, getMessageHistory } = require('../controllers/messageController');

router.get('/view_messages/:user_id/:receiver_id', auth, getMessageHistory);
router.post('/send_message', auth, sendMessage);

module.exports = router;