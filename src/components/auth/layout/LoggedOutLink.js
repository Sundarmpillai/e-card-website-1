import React from "react";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";

const LoggedOutLink = () => {
  return (
    <ul className="right">
      <li style={{ display: "inline" }}>
        <Button style={{ color: "white" }}>
          <NavLink
            to="/register"
            style={{ color: "black", textDecoration: "none" }}
          >
            Sign Up
          </NavLink>
        </Button>
      </li>
      <li style={{ display: "inline" }}>
        <Button style={{ color: "white" }}>
          <NavLink
            to="/login"
            style={{ color: "black", textDecoration: "none" }}
          >
            Login
          </NavLink>
        </Button>
      </li>
    </ul>
  );
};

export default LoggedOutLink;
