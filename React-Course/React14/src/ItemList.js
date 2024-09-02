import LineItem from "./LineItem";

const ItemList = ({ items, handle_check, handle_delete }) => {
  return (
    <ul>
      {items.map((item) => (
        <LineItem 
          key={item.id}
          item={item}
          handle_check={handle_check}
          handle_delete={handle_delete}
        />
      ))}
    </ul>
  )
};

export default ItemList
