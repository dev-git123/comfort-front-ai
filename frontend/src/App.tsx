import { Routes, Route } from "react-router-dom";

import './App.css'
import Home from "./pages/home";
import Chat from "./pages/chat";

function App() {
   return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chat" element={<Chat />} />
    </Routes>
  );
}

export default App
