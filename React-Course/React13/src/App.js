import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import Content from "./Content"
import Footer from "./Footer";
import { useState, useEffect } from "react";

function App() {
  const API_URL = "http://localhost:3500/items";

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [search, setSearch] = useState("");
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw Error("Did not receive expected data");
        const list_items = await response.json();
        setItems(list_items);
        setFetchError(null);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    setTimeout(() => fetchItems(), 2000);
  }, []);

  const add_item = (item) => {
    const id = items.length ? items[items.length - 1].id + 1 : 1;
    const my_new_item = { id, checked: false, item };
    const list_items = [...items, my_new_item];
    setItems(list_items);
  };

  const handle_check = (id) => {
    const list_items = items.map((item) => (item.id) === id ? { ...item, checked: !item.checked } : item);
    setItems(list_items);
  };

  const handle_delete = (id) => {
    const list_items = items.filter((item) => item.id !== id);
    setItems(list_items);
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
      <main>
        {isLoading && <p>Loading Items...</p>}
        {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
        {!fetchError && !isLoading && <Content 
          items={items.filter(item => ((item.item).toLowerCase()).includes(search.toLowerCase()))}
          handle_check={handle_check}
          handle_delete={handle_delete}
        />}
      </main>
      <Footer 
        length={items.length}
      />
    </div>
  );
}

export default App;
