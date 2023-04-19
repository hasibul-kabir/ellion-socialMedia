const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).json({ message: "Access denied!" })
        }

        if (token.startWith("Bearer")) {
            token = token.slice(7, token.length).trimStart();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verified;

        next();
    } catch (error) {
        res.status(500).json({ errorMessage: error.message })
    }
}

module.exports = verifyToken;