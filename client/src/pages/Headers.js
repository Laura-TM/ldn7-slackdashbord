import React from "react";
import "./Home.css";

const Headers = (props) => {
  return (
    <header className="header">
      <h1>CYF</h1>
      <h2>Trainee Name: {props.name}</h2>
      <h3>Trainee Cohort: {props.cohort}</h3>
    </header>
  );
};

export default Headers;
