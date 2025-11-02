import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import ToastPage from "./pages/Toast/Toast";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/toast" element={<ToastPage />} />
      </Routes>
    </Router>
  );
}

export default App;