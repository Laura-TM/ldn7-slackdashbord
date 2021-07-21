import React from "react";
import "./Home.css";
import logo from "./cyf_logo.png";
import slackLogo from "./slack_tastic_logo.png";

const Headers = () => {
  return (
    <header className="header">
      <img
                    className="logo"
                    data-qa="logo"
                    src={logo}
                    alt="CYF logo"
                />
                <img
                    className="logo"
                    data-qa="logo"
                    src={slackLogo}
                    alt="slack logo"
                />
    </header>
  );
};

export default Headers;
