import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Pagination from "./pagination";
import { CartContext } from "../App";

function ProductData() {
  const [users, setUsers] = useState([]);
  const cartContext = useContext(CartContext);
  const { count, setCount } = cartContext;
  const [ordersData, setOrdersData] = useState();
  const [showPerPage, setShowPerPage] = useState(12);
  const [pagination, setPagination] = useState({
    start: 0,
    end: showPerPage,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getUsers();
    cartDetails();
  }, [count]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:5000/products");
    setUsers(await response.json());
  };

  const cartDetails = async () => {
    const response = await fetch("http://localhost:5000/cart");
    const data = await response.json();
    setOrdersData(data);
    setCount(data.length);
  };

  const subProducts = (element) => {
    navigate("/allproducts", { state: element });
  };

  const onPaginationChange = (start, end) => {
    setPagination({ start: start, end: end });
  };

  const Addtocard = async (data) => {
    let productData = data.variation[0];
    productData["count"] = 1;
    let updateData = ordersData.filter((item) => {
      return item.id === data.variation[0].id;
    });
    console.log(updateData, "----");
    if (updateData.length > 0) {
      alert("Already Add , Plz check Your Cart");
    } else {
      setCount(count + 1);
      ordersData.push(productData);
      await axios.post("http://localhost:5000/cart", productData);
    }
  };
  const logOut = () => {
    localStorage.removeItem("user")
    navigate("/");
  };
  return (
    <>
      <div className="container ">
        <div className="text-end ">
          <button className="btn btn-info text-white btn-lg" onClick={logOut}>
            Logout
          </button>
        </div>
      </div>
      {users.length !== 0 ? (
        <div className="row row-cols-1 row-cols-md-4 mt-5">
          {users.slice(pagination.start, pagination.end).map((curEle, i) => {
            return (
              <div key={i}>
                <div className="col mb-4">
                  <div className="card ">
                    <img
                      src={curEle.variation[0].img}
                      className="card-img-top "
                      style={{ height: 300, width: 300 }}
                      alt="..."
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        {curEle.variation[0].productname}
                      </h5>
                      <p className="card-title">
                        <strong>Price:</strong> {curEle.variation[0].price}
                        {curEle.variation[0].quantityname}
                      </p>
                      <div>
                        <button
                          className="btn btn-warning m-2 mt-4"
                          onClick={() => subProducts(curEle)}
                        >
                          Sub Products
                        </button>
                        <button
                          className="btn btn-info m-2 mt-4"
                          onClick={() => Addtocard(curEle)}
                        >
                          Add To Card
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center mt-5 display-6">
          No Productes Available!
        </div>
      )}
      {users.length > 12 && (
        <Pagination
          showPerPage={showPerPage}
          onPaginationChange={onPaginationChange}
          total={users.length}
        />
      )}
    </>
  );
}

export default ProductData;
