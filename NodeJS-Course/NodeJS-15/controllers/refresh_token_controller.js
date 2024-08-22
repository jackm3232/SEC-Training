const User = require("../model/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handle_refresh_token = async (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(401);
  const refresh_token = cookies.jwt;

  const found_user = await User.findOne({ refresh_token }).exec();
  if (!found_user) return response.sendStatus(403);

  jwt.verify(
    refresh_token,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err || found_user.username !== decoded.username) return response.sendStatus(403);
      const roles = Object.values(found_user.roles);
      const access_token = jwt.sign(
        { 
          "UserInfo": {
            "username": decoded.username,
            "roles": roles
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "30s" }
      );
      response.json({ access_token });
    }
  );
};

module.exports = { handle_refresh_token };
