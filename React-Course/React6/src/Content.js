import { useState } from "react";

const Content = () => {
  const [name, setName] = useState("Jack");
  const [count, setCount] = useState(0);

  const handle_name_change = () => {
    const names = ["Bob", "Kevin", "Jack"];
    const int = Math.floor(Math.random() * 3);
    setName(names[int]);
  };

  const handle_click = () => {
    setCount(count + 1);
    setCount(count + 1);
    console.log(count);
  };

  const handle_click2 = () => {
    console.log(count);
  };

  return (
    <main>
      <p onDoubleClick={handle_click}>
        Hello {name}!
      </p>
      <button onClick={handle_name_change}>Change Name</button>
      <button onClick={handle_click}>Click It</button>
      <button onClick={handle_click2}>Click It</button>
    </main>
  )
}

export default Content
