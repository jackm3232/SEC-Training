const create_div = (parent_element, custom_text) => {
  const new_div = document.createElement("div");
  new_div.textContent = custom_text;
  new_div.style.color = "blue";
  parent_element.append(new_div);
};

const main_elem = document.querySelector("body main");
create_div(main_elem, "New Div");
