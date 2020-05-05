import React, { useState } from "react";
import NotificationList from "../profile/NotificationList";
import ConnectionList from "../connections/ConnectionList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Paper, Card } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  circlular: {
    display: "flex",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

function Admin(props) {
  // Declare a new state variable, which we'll call "count"
  const [term, setTerm] = useState("");

  const classes = useStyles();

  function searchBar(e) {
    setTerm(e.target.value);
  }

  const { profiles, auth, current_user, notification } = props;
  if (!auth.uid) return <Redirect to="/login" />;

  if (current_user.pNo === 0) return <Redirect to="/create" />;

  if (!current_user.status) return <Redirect to="/" />;
  const conn_list = [];
  localStorage.removeItem("profile");
  localStorage.removeItem("create");
  profiles &&
    profiles.map((user) => {
      return conn_list.push(user);
    });
  return (
    <div className={classes.root}>
      <Grid container spcing={3}>
        <Grid item xs={12}>
          <div>
            <p></p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <Paper style={{ width: "50%", margin: "auto" }}>
            <TextField
              id="filled-basic"
              label="Search"
              variant="filled"
              onChange={searchBar}
              style={{ width: "100%" }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <div style={{ overflow: "auto", height: "400px" }}>
            {conn_list.filter(searchingFor(term)).map((person) => (
              <ul key={person.id}>
                <ConnectionList profiles={person} />
                {/* Display all users that are registered in the E-Card system*/}
              </ul>
            ))}
          </div>
        </Grid>
        <Grid item xs={6}>
          <div
            style={{
              paddingTop: "15px",
              margin: "auto",
              width: "50%",
            }}
          >
            <Card>
              <Typography
                variant="h6"
                style={{ paddingLeft: "15px", paddingBottom: "5px" }}
              >
                {" "}
                Notifications{" "}
              </Typography>
              <Card
                style={{ paddingLeft: "25px", paddingBottom: "10px" }}
                elevation={0}
              >
                <NotificationList notification={notification} />
              </Card>
            </Card>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

function searchingFor(term) {
  return function (x) {
    if (x !== null) {
      return x.fN.toLowerCase().includes(term.toLowerCase()) || !term;
    }
    return "";
  };
}

const mapStateToProps = (state) => {
  // firebase.firestore().collection("notify").doc()
  return {
    profiles: state.firestore.ordered.user, // get the  list of user from the firestore
    auth: state.firebase.auth,
    current_user: state.firebase.profile,
    notification: state.firestore.ordered.notify,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "user" }, { collection: "notify", limit: 5 }])
)(Admin);
