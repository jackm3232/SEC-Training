const user_database = {
  users: require("../model/users.json"),
  set_users: function (data) { this.users = data }
};

const fs_promises = require("fs").promises;
const path = require("path");
const bcrypt = require("bcrypt");

const handle_new_user = async (request, response) => {
    const { user, pwd } = request.body;
    if (!user || !pwd) return response.status(400).json({ "message": "Username and password are required." });

    const duplicate = user_database.users.find(person => person.username === user);
    if (duplicate) return response.sendStatus(409);

    try {
        const hashed_pwd = await bcrypt.hash(pwd, 10);
        const new_user = { "username": user, "password": hashed_pwd };
        user_database.set_users([...user_database.users, new_user]);
        await fs_promises.writeFile(
            path.join(__dirname, "..", "model", "users.json"),
            JSON.stringify(user_database.users)
        );
        console.log(user_database.users);
        response.status(201).json({ "success": `New user ${user} created!` });
    } 
    catch (err) {
      response.status(500).json({ "message": err.message });
    }
};

module.exports = { handle_new_user };
