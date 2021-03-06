const jwt = require('jsonwebtoken');

function auth(req, res, next) {

    const token = req.header('x-auth-token');

    if(!token)
    return res.status(401).json({ success: false, message: "Authentication error. Token is absent." });

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;
        next();

    } catch {

        res.status(400).json({ success: false, message: "Token is not valid!" });

    }

};

module.exports = auth;