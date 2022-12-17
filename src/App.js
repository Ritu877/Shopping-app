import logo from "./logo.svg";
import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./components/Admin";
import AddItems from "./components/AddItems";
import Allproducts from "./components/Allproducts";
import { createContext, useState } from "react";
import Products from "./components/Products";
import Cart from "./components/Cart";
import ProductData from "./components/ProductData";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export const CartContext = createContext();

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
            <ToastContainer />
      <CartContext.Provider value={{ count, setCount }}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products" element={<Products />} />
          <Route path="/additems" element={<AddItems />} />
          <Route path="/allproducts" element={<Allproducts />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

      </CartContext.Provider>
    </>
  );
}

export default App;
