import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import Content from "./Content"
import Footer from "./Footer";
import { useState } from "react";

function App() {
  const [items, setItems] = useState(JSON.parse(localStorage.getItem("shopping_list")));

  const [newItem, setNewItem] = useState("");

  const [search, setSearch] = useState("");

  const set_save_items = (new_items) => {
    setItems(new_items);
    localStorage.setItem("shopping_list", JSON.stringify(new_items));
  };

  const add_item = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const my_new_item = { id, checked: false, item };
    const list_items = [...items, my_new_item];
    set_save_items(list_items);
  };

  const handle_check = (id) => {
    const list_items = items.map((item) => (item.id) === id ? { ...item, checked: !item.checked } : item);
    set_save_items(list_items);
  };

  const handle_delete = (id) => {
    const list_items = items.filter((item) => item.id !== id);
    set_save_items(list_items);
  };

  const handle_submit = (e) => {
    e.preventDefault();
    if (!newItem) return;
    add_item(newItem);
    setNewItem("");
  }

  return (
    <div className="App">
      <Header title="Grocery List"/>
      <AddItem 
        newItem={newItem}
        setNewItem={setNewItem}
        handle_submit={handle_submit}
      />
      <SearchItem 
        search={search}
        setSearch={setSearch}
      />
      <Content 
        items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
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
