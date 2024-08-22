const fs_promises = require("fs").promises;
const path = require("path");

const file_ops = async () => {
  try {
    const data = await fs_promises.readFile(path.join(__dirname, "files",
    "starter.txt"), "utf8");
    await fs_promises.writeFile(path.join(__dirname, "files", "new_starter.txt"),
    data);
  }
  catch (err) {
    console.error(err);
  }
}

file_ops();
