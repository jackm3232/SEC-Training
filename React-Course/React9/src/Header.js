const Header = ({ title }) => {
  const header_style = {
    backgroundColor: "mediumblue",
    color: "white"
  };
  return (
    <header style={header_style}>
      <h1>{title}</h1>
    </header>
  )
};

Header.defaultProps = {
  title: "Default title"
}

export default Header
