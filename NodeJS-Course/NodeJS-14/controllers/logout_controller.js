const user_database = {
  users: require("../model/users.json"),
  set_users: function (data) { this.users = data }
};

const fs_promises = require("fs").promises;
const path = require("path");

const handle_logout = async (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);
  const refresh_token = cookies.jwt;
  const found_user = user_database.users.find(person => person.refresh_token === refresh_token);
  if (!found_user) {
    response.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return response.sendStatus(204);
  }
  
  const other_users = user_database.users.filter(person => person.refresh_token !== found_user.refresh_token);
  const current_user = { ...found_user, refresh_token: '' };
  user_database.set_users([...other_users, current_user]);
  await fs_promises.writeFile(
      path.join(__dirname, "..", "model", "users.json"),
      JSON.stringify(user_database.users)
  );

  //Include "secure: true" as a parameter in production
  response.clearCookie("jwt", { httpOnly: true, sameSite: "None"});
  response.sendStatus(204);
};

module.exports = { handle_logout };
