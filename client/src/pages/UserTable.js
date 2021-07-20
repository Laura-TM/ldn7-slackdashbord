import React from "react";
import { Table } from "reactstrap";
import "./Home.css";

const UserTable = (props) => {
  return (
    <Table responsive className="table table-color table-bordered">
      <thead>
        <tr className="text-center">
          <th>#</th>
          <th>Week / Month</th>
          <th>Post Count</th>
          <th>Reactions Count</th>
          <th>Calls</th>
        </tr>
      </thead>
      <tbody className="text-center">
        <tr>
          <th scope="row">1</th>
          <td>{props.userInfo.month}</td>
          <td>{props.userInfo.posts}</td>
          <td>{props.userInfo.reactions}</td>
          <td>{props.userInfo.calls}</td>
        </tr>
        {/* <tr>
          <th scope="row">2</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
          <td>Table cell</td>
        </tr> */}
      </tbody>
    </Table>
  );
};

export default UserTable;
