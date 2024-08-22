const user_database = {
  users: require("../model/users.json"),
  set_users: function (data) { this.users = data }
};

const jwt = require("jsonwebtoken");
require("dotenv").config();

const handle_refresh_token = (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(401);
  const refresh_token = cookies.jwt;
  const found_user = user_database.users.find(person => person.refresh_token === refresh_token);
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
