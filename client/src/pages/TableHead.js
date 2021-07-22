import React from "react";
import "./Home.css";

const TableHead = (props) => {

  return (
    <tr>
      <th>
        Channel
      </th>
      <th>
        Description
      </th>
      <th>
        No. of users
      </th>
      <th>
        Users
      </th>
    </tr>
  );
};

export default TableHead;
