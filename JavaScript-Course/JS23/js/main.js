const obj = {
  name: "Jack",
  hobbies: ["run", "sleep", "work out"]
};

sessionStorage.setItem("session_stor", JSON.stringify(obj));
const session_data = JSON.parse(sessionStorage.getItem("session_stor"));
console.log(session_data);

sessionStorage.clear();
