const User = require("../model/User");
const bcrypt = require("bcrypt");

const handle_new_user = async (request, response) => {
    const { user, pwd } = request.body;
    if (!user || !pwd) return response.status(400).json({ "message": "Username and password are required." });

    const duplicate = await User.findOne({ username: user }).exec();
    if (duplicate) return response.sendStatus(409);

    try {
      const hashed_pwd = await bcrypt.hash(pwd, 10);
      const result = await User.create({ 
        "username": user, 
        "password": hashed_pwd 
      });
      console.log(result);
      
      response.status(201).json({ "success": `New user ${user} created!` });
    } 
    catch (err) {
      response.status(500).json({ "message": err.message });
    }
};

module.exports = { handle_new_user };
