import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [resetKey, setResetKey] = useState(0);

  const handleHome = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar onHome={handleHome} />
      <Home key={resetKey} />
    </div>
  );
}

export default App;