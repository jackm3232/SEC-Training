const user_database = {
  users: require("../model/users.json"),
  set_users: function (data) { this.users = data }
};

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
require("dotenv").config();
const fs_promises = require("fs").promises;
const path = require("path");

const handle_login = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ "message": "Username and password are required." });

  const found_user = user_database.users.find(person => person.username === user);
  if (!found_user) return response.sendStatus(401);

  const match = await bcrypt.compare(pwd, found_user.password);
  if (match) {
    const access_token = jwt.sign(
      { "username": found_user.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refresh_token = jwt.sign(
        { "username": found_user.username },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
    );

    const other_users = user_database.users.filter(person => person.username !== found_user.username);
    const current_user = { ...found_user, refresh_token };
    user_database.set_users([...other_users, current_user]);
    await fs_promises.writeFile(
        path.join(__dirname, "..", "model", "users.json"),
        JSON.stringify(user_database.users)
    );
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
