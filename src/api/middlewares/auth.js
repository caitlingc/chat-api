const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ 
            error_code: 401, 
            error_title: 'unauthorized', 
            error_message: 'missing or invalid authorization header' 
        });
    }
    
    const token = authHeader.split(' ')[1]; // extract token from "Bearer <token>"

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ 
                    error_code: 403, 
                    error_title: 'forbidden', 
                    error_message: 'invalid or expired token' 
                });
            }
            req.user = user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ 
            error_code: 500, 
            error_title: 'internal server error', 
            error_message: 'an error occurred while verifying the token' 
        });
    }
}; 

module.exports = authenticateToken; 