const obj = {
  name: "Jack",
  hobbies: ["run", "sleep"],
  hello: function () {
    console.log("Hello");
  }
}

console.log(obj);
console.log(typeof obj);

const send_JSON = JSON.stringify(obj);
console.log(send_JSON);
console.log(typeof send_JSON);

const receive_JSON = JSON.parse(send_JSON);
console.log(receive_JSON);
console.log(typeof receive_JSON);
