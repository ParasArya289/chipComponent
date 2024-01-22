import { useState } from "react";
import "./App.css";
import { Input } from "./Components/Input/Input";
import userData from "./userData";

function App() {
  const [selectedUserArray, setSelectedUserArray] = useState([]);

  return (
    <div className="App">
      <h2>Pick User</h2>
      <Input
        data={userData}
        selectedUserArray={selectedUserArray}
        setSelectedUserArray={setSelectedUserArray}
        placeholder="Add new user"
      />
    </div>
  );
}

export default App;
