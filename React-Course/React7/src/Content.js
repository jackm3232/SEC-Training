import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";

const Content = () => {
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
    <main>
      {items.length ? (
        <ul>
          {items.map((item) => (
            <li className="item" key={item.id}>
              <input 
                type="checkbox" 
                onChange={() => handle_check(item.id)}
                checked={item.checked}
              />
              <label
                style={(item.checked) ? { textDecoration: "line-through"} : null}
                onDoubleClick={() => handle_check(item.id)}
              >{item.item}</label>
              <FaTrashAlt 
                onClick={() => handle_delete(item.id)}
                role="button" 
                tabIndex="0"
              />
            </li>
          ))}
        </ul>
      ) : (
        <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
      )}
    </main>
  )
};

export default Content
