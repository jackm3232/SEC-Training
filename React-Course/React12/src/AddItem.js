import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddItem = ({ newItem, setNewItem, handle_submit }) => {
  const inputRef = useRef();
  return (
    <form className="addForm" onSubmit={handle_submit}>
      <label htmlFor="addItem">Add Item</label>
      <input
        autoFocus
        ref={inputRef}
        id="addItem"
        type="text"
        placeholder="Add Item"
        required
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Add Item"
        onClick={() => inputRef.current.focus()}
      >
        <FaPlus />
      </button>
    </form>
  )
}

export default AddItem
