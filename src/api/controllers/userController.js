require('dotenv').config();
const jwt = require('jsonwebtoken');
const { findOtherUsers, findUserByEmail, insertUser } = require('../models/user');

function registerUser(req, res) {
    const { email, password, first_name, last_name } = req.body;
    if (!email || !password) {
        return res.status(400).json({ 
            error_code: 400, 
            error_title: 'registration error', 
            error_message: 'email and password are required' 
        });
    }

    findUserByEmail(email, (err, existingUser) => {
        if (err) { 
            return res.status(500).json({ 
                error_code: 500, 
                error_title: 'look-up failure', 
                error_message: 'an error occurred while checking existing users' 
            });
        } 

        if (existingUser) {
            return res.status(409).json({ 
                error_code: 409, 
                error_title: 'registration error', 
                error_message: 'email already in use' 
            });
        }

        insertUser(req.body, (err, userData) => {
            if (err) { 
                return res.status(500).json({ 
                    error_code: 500, 
                    error_title: 'registration failure', 
                    error_message: 'an error occurred while registering the user' 
                });
            }

            res.status(201).json(userData); // successful registration
        });
    });
};

function loginUser(req, res) {
    const { email, password } = req.body; 
    if (!email || !password) {
        return res.status(400).json({ 
            error_code: 400, 
            error_title: 'login error', 
            error_message: 'invalid credentials' 
        });
    }

    findUserByEmail(email, (err, credentials) => {
        if (err) {
            return res.status(500).json({ 
                error_code: 500, 
                error_title: 'look-up failure', 
                error_message: 'an error occurred while looking up the user' 
            });
        }

        if (!credentials || credentials.password !== password) {
            return res.status(401).json({ 
                error_code: 401, 
                error_title: 'login error', 
                error_message: 'invalid email or password' 
            });
        }

        // generate JWT token
        const token = jwt.sign(
            { user_id: credentials.user_id }, // only includes user_id in token payload
            process.env.JWT_SECRET, 
            { expiresIn: '1h' }
        );

        res.status(200).json({ 
            user_id: credentials.user_id,
            email: credentials.email, 
            first_name: credentials.first_name, 
            last_name: credentials.last_name, 
            date_registered: credentials.date_registered, 
            token: token
        }); // successful login, send back safe info credentials (no password) + new JWT token
    });
};

function findAllUsers(req, res) {
    const user_id = req.params.user_id;

    // authorization check
    if (parseInt(user_id) !== req.user.user_id) {
        return res.status(403).json({
            error_code: 403,
            error_title: 'forbidden',
            error_message: 'you are not authorized to see users for this user_id'
        });
    }

    findOtherUsers(user_id, (err, users) => {
        if (err) {
            return res.status(500).json({ 
                error_code: 500, 
                error_title: 'error fetching users', 
                error_message: 'an error occurred while fetching users' 
            });
        }
    
        res.status(200).json(users); // successful fetch of other users
    });
};


module.exports = {
    registerUser,
    loginUser, 
    findAllUsers
};