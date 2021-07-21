import React, { useState } from "react";
import "./Home.css";

const TableRow = ({ channel }) => {
  const [selectedRow, setSelectedRow] = useState(false);

  function rowSelected() {
    setSelectedRow(!selectedRow);
  }

  return (
    <tr className={selectedRow ? "selectedRow" : " "} onClick={rowSelected}>
      <th scope="row">{channel.name}</th>
      <td>{channel.description}</td>
      <td>{channel.users.length}</td>
      <td>{channel.users}</td>
    </tr>
  );
};

export default TableRow;
