import './App.css';
import Home from './components/home/home';
import { Routes, Route, Link } from "react-router-dom";
import Login from './components/login/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
