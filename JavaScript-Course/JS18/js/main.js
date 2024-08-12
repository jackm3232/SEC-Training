class Pizza {
  crust = "original";
  #sauce = "traditional";
  #size;
  constructor(pizza_size) {
    this.#size = pizza_size;
  }
  print_details() {
    console.log(`Here's your ${this.crust} ${this.#sauce} ${this.#size} pizza.`);
  }
}

const pizza_obj = new Pizza("large");
pizza_obj.print_details();
