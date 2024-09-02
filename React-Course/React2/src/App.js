import logo from './logo.svg';
import './App.css';

function App() {
  const handle_name_change = () => {
    const names = ["Bob", "Kevin", "Jack"];
    const int = Math.floor(Math.random() * 3);
    return names[int];
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Hello {handle_name_change()}!
        </p>
      </header>
    </div>
  );
}

export default App;
