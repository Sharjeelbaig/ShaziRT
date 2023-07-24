
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Import the necessary functions and hooks
import "./App.css";
import Home from "./routes/Home";

function App() {
  return (
    <Router>
      <Routes>
		
        <Route path="/" Component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
