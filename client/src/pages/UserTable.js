import React from "react";
import { Table } from "reactstrap";
import "./Home.css";

const UserTable = (props) => {
  return (
    <Table responsive className="table table-color table-bordered">
      <thead>
        <tr className="text-center">
          <th>#</th>
          <th>Week</th>
          <th>Post Count</th>
          <th>Reactions Count</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <th scope="row">1</th>
          <td>{props.userInfo.week}</td>
          <td>{props.userInfo.posts}</td>
          <td>{props.userInfo.reactions}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default UserTable;
