import React from "react";

const ButtonField = ({ handleClick, label }) => {
  return (
    <>
      <button onClick={handleClick} className="btn btn-primary m-2 p-2 px-4">
        {label}
      </button>
    </>
  );
};

export default ButtonField;
