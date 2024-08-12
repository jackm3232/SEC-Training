document.addEventListener("readystatechange", (event) => {
  if (event.target.readyState === "complete") {
    init_app();
  }
});

function init_app() {
  const h1_element = document.querySelector("body main h1");

  h1_element.addEventListener("click", (event) => {
    const text = event.target.textContent;
    text === "Not Clicked" 
      ? event.target.textContent = "Clicked"
      : event.target.textContent = "Not Clicked";
  });
}
