import "./App.css";
import { Input } from "./Components/Input/Input";
import userData from "./userData";

function App() {
  return (
    <div className="App">
      <h2>Zepto</h2>
      <Input data={userData} placeholder="Add new user"/>
    </div>
  );
}

export default App;
