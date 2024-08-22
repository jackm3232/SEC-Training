const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const handle_login = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ "message": "Username and password are required." });

  const found_user = await User.findOne({ username: user }).exec();
  if (!found_user) return response.sendStatus(401);

  const match = await bcrypt.compare(pwd, found_user.password);
  if (match) {
    const roles = Object.values(found_user.roles);
    const access_token = jwt.sign(
      { 
        "UserInfo": {
          "username": found_user.username,
          "roles": roles
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refresh_token = jwt.sign(
        { "username": found_user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    found_user.refresh_token = refresh_token;
    const result = await found_user.save();
    
    //Remove "secure: true" for Thunder Client testing
    response.cookie("jwt", refresh_token, { httpOnly: true, sameSite: "None", maxAge: 24 * 60 * 60 * 1000 });
    //response.cookie("jwt", refresh_token, { httpOnly: true, sameSite: "None", secure: true, maxAge: 24 * 60 * 60 * 1000 });
    response.json({ access_token });
  }
  else {
    response.sendStatus(401);
  }
};

module.exports = { handle_login };
