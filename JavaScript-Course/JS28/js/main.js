document.getElementById("phone_num").addEventListener("input", (event) => {
  const regex = /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/g;
  const input = document.getElementById("phone_num");
  const format = document.querySelector(".phone_form");
  const phone_num = input.value;
  const found = regex.test(phone_num);
  if (!found && phone_num.length) {
    input.classList.add("invalid");
  }
  else {
    input.classList.remove("invalid");
  }
});

document.getElementById("phone_form").addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.getElementById("phone_num");
  console.log(input.value);
  const regex = /[()-. ]/g;
  const cleaned_phone_num = input.value.replaceAll(regex, "").trim();
  console.log(cleaned_phone_num);
  const encoded_text = encodeURI(cleaned_phone_num);
  console.log(encoded_text);
});
