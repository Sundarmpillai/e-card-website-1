import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../../store/actions/authAction";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

const LoggedInLink = (props) => {
  return (
    <ul>
      {/* <li><NavLink to='/create'>Create Profile</NavLink></li> */}
      <li style={{ display: "inline" }}>
        <Button style={{ color: "white" }}>Update Contents</Button>
      </li>
      <li style={{ display: "inline" }}>
        <Button style={{ color: "white" }}>Settings</Button>
      </li>
      <li style={{ display: "inline" }}>
        <Button onClick={props.logout} to="/" style={{ color: "white" }}>
          Logout
        </Button>
      </li>
      <li style={{ display: "inline" }}>
        <Button>
          <NavLink
            to="/profile"
            style={{ color: "black", textDecoration: "none" }}
          >
            <Avatar
              src={
                props.profile.pPic ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              style={{ margin: "10px" }}
            />
          </NavLink>
        </Button>
      </li>
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(null, mapDispatchToProps)(LoggedInLink);
