import React, { useState } from "react";

function IncDec(curEle) {
  const [qty, setQty] = useState(1);
  let [totalPrice, setTotalPrice] = useState(curEle.price);

  const handleAddQty = () => {
    setQty((prevState) => prevState + 1);

    setTotalPrice(totalPrice * qty);
  };

  const handleReduceQty = () => {
    setQty((prevState) => {
      if (prevState !== 1) return prevState - 1;
      else return prevState;
    });
  };

 return (
    <div>
      <div>
        <i className="fa-sharp fa-solid fa-minus" onClick={handleReduceQty}></i>
        {qty}
        <i className="fa-solid fa-plus" onClick={handleAddQty}></i>
      </div>
    </div>
  );
}

export default IncDec;
