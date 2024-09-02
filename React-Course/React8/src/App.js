import Header from "./Header";
import Content from "./Content"
import Footer from "./Footer";
import { useState } from "react";

function App() {
  const [items, setItems] = useState([
    {
      id: 1,
      checked: true,
      item: "One half pound bag of Cocoa Covered Almonds Unsalted"
    },
    {
      id: 2,
      checked: false,
      item: "Item 2"
    },
    {
      id: 3,
      checked: false,
      item: "Item 3"
    }
  ]);

  const handle_check = (id) => {
    const list_items = items.map((item) => (item.id) === id ? { ...item, checked: !item.checked } : item);
    setItems(list_items);
    localStorage.setItem("shopping_list", JSON.stringify(list_items));
  };

  const handle_delete = (id) => {
    const list_items = items.filter((item) => item.id !== id);
    setItems(list_items);
    localStorage.setItem("shopping_list", JSON.stringify(list_items));
  };

  return (
    <div className="App">
      <Header title="Grocery List"/>
      <Content 
        items={items}
        handle_check={handle_check}
        handle_delete={handle_delete}
      />
      <Footer 
        length={items.length}
      />
    </div>
  );
}

export default App;
