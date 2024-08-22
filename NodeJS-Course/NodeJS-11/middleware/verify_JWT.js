const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify_JWT = (request, response, next) => {
    const auth_header = request.headers["authorization"];
    if (!auth_header) return response.sendStatus(401);
    console.log(auth_header); //Bearer | token
    const token = auth_header.split(" ")[1];
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) return response.sendStatus(403); //Invalid token
            request.user = decoded.username;
            next();
        }
    );
};

module.exports = verify_JWT;
