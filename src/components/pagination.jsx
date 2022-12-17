import React, { useState, useEffect } from "react";

let disable = false;

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);

    if (total < 1) {
      disable = true;
    }
    if (total > 12) {
      disable = true;
    }
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (Math.ceil(total / showPerPage) === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="d-flex justify-content-between">
      <button
        className="btn btn-primary"
        disabled={disable}
        onClick={() => onButtonClick("prev")}
      >
        Previous
      </button>

      <button
        className="btn btn-primary"
        disabled={disable}
        onClick={() => onButtonClick("next")}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
