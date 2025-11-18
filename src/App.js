import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ToastPage from "./pages/Toast/Toast";
import Otp from "./pages/otp/otp";
import TicTacToe from "./pages/tic-tac-toe/tic-tac-toe";
import MemoryGame from "./pages/memory-game/memory-game";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/" element={<Home />} />
    //     <Route path="/toast" element={<ToastPage />} />
    //     <Route path="/otp" element={<Otp />} />
    //   </Routes>
    // </Router>
    // <Otp len={6}/>
    // <TicTacToe />
    <MemoryGame />
  );
}

export default App;