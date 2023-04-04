import { Routes, Route, Navigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddProduct from "./pages/AddProduct";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import DetailHistory from "./pages/DetailHistory";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Register from "./pages/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/history/:id" element={<DetailHistory />} />
        <Route path="/products" element={<Products />} />
        <Route path="/add-product/:id" element={<AddProduct />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
