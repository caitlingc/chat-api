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
            console.error("error checking existing users:", err);
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
                console.error("error inserting new user:", err);
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
            console.error("error finding user:", err);
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

        res.status(200).json({ 
            user_id: credentials.user_id,
            email: credentials.email, 
            first_name: credentials.first_name, 
            last_name: credentials.last_name, 
            date_registered: credentials.date_registered
        }); // successful login, send back safe info credentials (no password)
    });
};

module.exports = {
    registerUser,
    loginUser
};