import React, { useEffect, useState } from "react";

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
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
  useEffect(() => {
    console.log("counter changed....");
    const value = showPerPage * counter;
    // console.log("start",value - showPerPage);
    // console.log("end",value);
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-primary"
          onClick={() => onButtonClick("prev")}
        >
          Previous
        </button>
        <button
          className="btn btn-primary"
          onClick={() => onButtonClick("next")}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
