export default class User {
  constructor(name, email) {
    this._name = name;
    this._email = email;
  }

  get_info() {
    return `Name: ${this._name}\nEmail: ${this._email}`;
  }
};
