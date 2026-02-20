const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const { registerUser, loginUser, findAllUsers } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/list_all_users/:user_id', auth, findAllUsers);

module.exports = router;