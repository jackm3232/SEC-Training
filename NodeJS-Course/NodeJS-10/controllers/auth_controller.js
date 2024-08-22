const user_database = {
  users: require("../model/users.json"),
  set_users: function (data) { this.users = data }
};

const bcrypt = require("bcrypt");

const handle_login = async (request, response) => {
  const { user, pwd } = request.body;
  if (!user || !pwd) return response.status(400).json({ "message": "Username and password are required." });

  const found_user = user_database.users.find(person => person.username === user);
  if (!found_user) return response.sendStatus(401);

  const match = await bcrypt.compare(pwd, found_user.password);
  if (match) {
    response.json({ "success": `User ${user} is logged in!` });
  }
  else {
    response.sendStatus(401);
  }
};

module.exports = { handle_login };
