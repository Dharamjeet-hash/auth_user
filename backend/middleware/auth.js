// authMiddleware.js
const jwt = require('jsonwebtoken');

// Middleware function to verify JWT token
const authMiddleware = (req, res, next) => {
    // Get the token from the request header
    var token = (req.headers.authorization.split(' ')[1])?.trim();

    

    // Check if token is present
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    try {
        // Verify token
        let salt = process.env.JWT_SALT || 'auth_user'
        const decoded = jwt.verify(token, salt); // Replace 'your_secret_key' with your actual secret key

        // Attach the decoded user data to the request object
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.log(error)
        // Token is invalid
        return res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;
