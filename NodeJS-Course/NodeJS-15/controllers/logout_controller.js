const User = require("../model/User");

const handle_logout = async (request, response) => {
  const cookies = request.cookies;
  if (!cookies?.jwt) return response.sendStatus(204);
  const refresh_token = cookies.jwt;
  const found_user = await User.findOne({ refresh_token }).exec();
  if (!found_user) {
    response.clearCookie("jwt", { httpOnly: true, sameSite: "None" });
    return response.sendStatus(204);
  }
  
  found_user.refresh_token = "";
  const result = await found_user.save();

  //Include "secure: true" as a parameter in production
  response.clearCookie("jwt", { httpOnly: true, sameSite: "None"});
  response.sendStatus(204);
};

module.exports = { handle_logout };
