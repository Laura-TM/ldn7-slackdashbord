import React, { useState } from "react";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import "./Home.css";

const UserDropdown = (props) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen( (prevState) => !prevState);

  return (
    <Dropdown className="linkButtons greenButton" isOpen={dropdownOpen} toggle={toggle}>
        <DropdownToggle caret>
            View Slack users
        </DropdownToggle>
        <DropdownMenu bottom>
        {Object.keys(props.users).map((key) => {
        let user = props.users[key];
        return (
            <DropdownItem key={user.username} href={`/user/${key}`}>User: {user.username}</DropdownItem>
        );
    })}
        </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;


