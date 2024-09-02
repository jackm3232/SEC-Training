import React from 'react'

const Content = () => {
  const handle_name_change = () => {
    const names = ["Bob", "Kevin", "Jack"];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  }
  return (
    <main>
      <p>
        Hello {handle_name_change()}!
      </p>
    </main>
  )
}

export default Content
