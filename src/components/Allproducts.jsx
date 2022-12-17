import React from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import { CartContext } from "../App";
import { useContext } from "react";

function Allproducts(props) {
  const location = useLocation();
  const [ordersData, setOrdersData] = useState();
  const cartContext = useContext(CartContext);
  const { count, setCount } = cartContext;
  const compare = async () => {
    const response = await fetch("http://localhost:5000/cart");
    setOrdersData(await response.json());
  };

  useEffect(() => {
    compare();
  }, []);

  const Addtocard = async (data) => {
    let productData = data;
    productData["count"] = 1;
    let updateData = ordersData.filter((item) => {
      return item.id === data.id;
    });
    if (updateData.length > 0) {
      alert("Check Your Card");
    } else {
      setCount(count + 1);
      ordersData.push(productData);
      await axios.post("http://localhost:5000/cart", productData);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="fs-2">
          <span>Sub Products</span>
        </div>
        <div className="mt-5 d-flex">
          {[...Array(location.state.NoOfVariation - 0)].map((data, i) => (
            <div className="card m-2" key={i}>
              <img
                src={location.state.variation[i].img}
                className="card-img-top "
                style={{ height: "300px", width: "300px" }}
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">
                  {location.state.variation[i].productname}
                </h5>
                <strong>Description: </strong>{" "}
                {location.state.variation[i].flavourname}
                <p>
                  <strong>Price: </strong>
                  {location.state.variation[i].price}{" "}
                  {location.state.variation[i].quantityname}
                </p>
                <div className="text-center mt-5">
                  <button
                    className="btn btn-info"
                    onClick={() => Addtocard(location.state.variation[i])}
                  >
                    Add To Card
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Allproducts;
