import React from "react";
import { Link } from "react-router-dom";
import LoggedInLink from "./LoggedInLink";
import LoggedOutLink from "./LoggedOutLink";
import AdminLink from "./adminLink";
import { connect } from "react-redux";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  title: {
    flex: 1,
    fontSize: 32,
    fontFamily: "Sans-Serif",
    flexGrow: 1,
  },
}));

const Navbar = (props) => {
  const classes = useStyles();
  const { auth, profile } = props;

  const adminlinks = profile.status ? <AdminLink profile={profile} /> : null;
  const links = auth.uid ? (
    <LoggedInLink profile={profile} />
  ) : (
    <LoggedOutLink />
  );
  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: "#3949ab" }}>
        <Toolbar variant="dense">
          <Typography variant="h4" className={classes.title}>
            <Link to="/home" style={{ color: "white", textDecoration: "none" }}>
              E-Card
            </Link>
          </Typography>
          {adminlinks === null ? links : adminlinks}
        </Toolbar>
      </AppBar>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

export default connect(mapStateToProps)(Navbar);
