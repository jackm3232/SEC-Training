import { FaTrashAlt } from "react-icons/fa";

const LineItem = ({ item, handle_check, handle_delete }) => {
  return (
    <li className="item">
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
        aria-label={`Delete ${item.item}`}
      />
    </li>
  )
}

export default LineItem
