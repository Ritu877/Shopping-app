import React from "react";
import {} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../App";


function Navbar() {
  const navigate = useNavigate();
  const { count } = useContext(CartContext);

  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-ligh bg-warning">
          <a className="navbar-brand" href="/">
            Shopping App
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
              <Link to="/products" className="text-black p-2">
                Products
              </Link>
                 <Link to="/cart" className="text-black p-2">
                     Cart
                     <i className="fa-solid fa-cart-shopping"></i>
                     {count}
                  </Link>
            </ul>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Navbar;
