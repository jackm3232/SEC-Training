function get_username_from_email (email) {
  return email.slice(0, email.indexOf("@"));
}

console.log(get_username_from_email("user@gmail.com"));
