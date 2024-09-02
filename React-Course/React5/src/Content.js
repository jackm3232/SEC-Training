import React from 'react'

const Content = () => {
  const handle_name_change = () => {
    const names = ["Bob", "Kevin", "Jack"];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  };

  const handle_click = () => {
    console.log("Clicked");
  };

  const handle_click2 = (name) => {
    console.log(`${name} was clicked`);
  };

  const handle_click3 = (e) => {
    console.log(e.target.innerText);
  };

  return (
    <main>
      <p onDoubleClick={handle_click}>
        Hello {handle_name_change()}!
      </p>
      <button onClick={handle_click}>Click It</button>
      <button onClick={() => handle_click2("Jack")}>Click It</button>
      <button onClick={(e) => handle_click3(e)}>Click It</button>
    </main>
  )
}

export default Content
