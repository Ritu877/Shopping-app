import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const CartProduct = ({
  curEle,
  getCartItems,
  setTotalPrice,
  totalPrice,
  handleDelete,
}) => {
  const [qty, setQty] = useState(+curEle.count);
  useEffect(() => {
    setTotalPrice((totalPrice) => totalPrice + curEle.price * qty);
  }, []);

  const handleAddQty = async () => {
    setQty((prevState) => prevState + 1);
    await axios.patch(`http://localhost:5000/cart/${curEle.id}`, {
      count: qty + 1,
    });

    setTotalPrice((totalPrice) => totalPrice + curEle.price * 1);
  };

  const handleReduceQty = async () => {
    setQty((prevState) => {
      if (prevState !== 1) return prevState - 1;
      else return prevState;
    });

    if (qty <= 1) return;

    await axios.patch(`http://localhost:5000/cart/${curEle.id}`, {
      count: qty - 1,
    });

    setTotalPrice((totalPrice) => totalPrice - curEle.price * 1);
  };

 

  return (
    <>
      <div className="mt-5">
        <div className="d-flex">
          <div className="">
            <img
              src={curEle.img}
              alt=""
              style={{ height: "200px", width: "200px" }}
            />
          </div>
          <div className="w-25">
            <div className="p-5 pt-5">
              <h5>{curEle.productname}</h5>
              <p>
                Price: {curEle.price}
                {curEle.quantityname}
              </p>
            </div>
          </div>
          <div className="text-center pt-5 w-25">
            <i
              className="fa-sharp fa-solid fa-minus m-2 btn btn-info"
              onClick={handleReduceQty}
            ></i>
            <strong>{qty}</strong>
            <i
              className="fa-solid fa-plus m-2 btn btn-info"
              onClick={handleAddQty}
            ></i>
          </div>
          <div className="text-center pt-5 w-25">
            <strong>{qty * curEle.price} rs</strong>
          </div>

          <div className="text-center pt-5 w-25">
            <button onClick={() => handleDelete(curEle.id, curEle)}>
              Remove
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartProduct;
