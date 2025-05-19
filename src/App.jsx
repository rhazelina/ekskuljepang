import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPage from "./pages/AdminPage";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import MateriDetail from "./pages/MateriDetail";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tugas" element={<Tasks />} />
          <Route path="/materi/:id" element={<MateriDetail />} />
            <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
