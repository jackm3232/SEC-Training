const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify_JWT = (request, response, next) => {
    const auth_header = request.headers.authorization || request.headers.Authorization;
    if (!auth_header?.startsWith("Bearer ")) return response.sendStatus(401);
    const token = auth_header.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return response.sendStatus(403); //Invalid token
            request.user = decoded.UserInfo.username;
            request.roles = decoded.UserInfo.roles;
            next();
        }
    );
};

module.exports = verify_JWT;
