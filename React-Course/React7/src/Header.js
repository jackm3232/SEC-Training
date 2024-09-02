import React from 'react'

const Header = () => {
  const header_style = {
    backgroundColor: "mediumblue",
    color: "white"
  };
  return (
    <header style={header_style}>
      <h1>Groceries List</h1>
    </header>
  )
}

export default Header
