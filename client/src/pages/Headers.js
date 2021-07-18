import React from "react";
import "./Home.css";
import logo from "./cyf_logo.png";

const Headers = (props) => {
  return (
    <header className="header">
      <div>
      <h1>CYF</h1>
      <h2>Trainee Name: {props.name}</h2>
      <h3>Trainee Cohort: {props.cohort}</h3>
      </div>
      <img
                    className="logo"
                    data-qa="logo"
                    src={logo}
                    alt="CYF logo"
                />
    </header>
  );
};

export default Headers;
