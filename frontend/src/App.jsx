import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Register from "./views/auth/Register";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ fontFamily: "Poppins" }}>
      <Register />
    </div>
  );
}

export default App;
