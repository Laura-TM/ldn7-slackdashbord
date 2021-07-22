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
            {props.users.map((user, index) => {
                return (
                    <DropdownItem key={index} href={`/user/${user.userId}`}>User: {user.username}</DropdownItem>
                );
            })}
        </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;


