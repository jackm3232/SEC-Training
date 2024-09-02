import ItemList from "./ItemList";

const Content = ({ items, handle_check, handle_delete }) => {
  return (
    <>
      {items.length ? (
        <ItemList 
          items={items}
          handle_check={handle_check}
          handle_delete={handle_delete}
        />
        ) : (
          <p style={{ marginTop: "2rem" }}>Your list is empty.</p>
        )}
    </>
  )
};

export default Content
