import logo from './logo.svg';
import './App.css';

function openDrawer(){
  window.__gamePay("event","open");
}
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={openDrawer}>
          CLICK ME
        </button>
      </header>
    </div>
  );
}

export default App;
