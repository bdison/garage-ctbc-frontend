import React from "react";
import "./Components.css";

export const ListHeaderFormatter = (column, colIndex, { sortElement }) => {

  return (
    <div>
      <span className="list-header-col">{column.text}</span> {sortElement}
    </div>
  );
};

export const customTotalFormatter = (from, to, size) => {
  return (
    <span className="react-bootstrap-table-pagination-total">
      Showing {from} to {to} of {size} {size > 1 ? "Results" : "Result"}
    </span>
  );
};