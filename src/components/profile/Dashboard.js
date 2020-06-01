import React, { useState } from "react";
import NotificationList from "./NotificationList";
import ConnectionList from "../connections/ConnectionList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Card, Paper } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));

function Dashboard(props) {
  const [term, setTerm] = useState("");
  const [item, setItem] = useState("First Name");
  const [id, setID] = useState("fN");

  const classes = useStyles();

  function searchBar(e) {
    setTerm(e.target.value);
  }
  const handleChange = (event) => {
    setItem(event.target.value);
  };

  function handleID(e) {
    setID(e.target.id);
  }

  const conn_list = [];
  const notify_list = [];
  const { profiles, auth, current_user, notification } = props;
  if (current_user.status) return <Redirect to="/dashboard" />;

  if (!auth.uid) return <Redirect to="/login" />;
  if (!auth.emailVerified) return <Redirect to="/verify" />;

  if (current_user.pNo === 0) return <Redirect to="/create" />;

  profiles &&
    profiles.map((user) => {
      if (current_user.conn != null) {
        for (var i = 0; i < current_user.conn.length; i++) {
          if (current_user.conn[i] === user.id) {
            conn_list.push(user);
          }
        }
      }
      return null;
    });

  notification &&
    notification.map((user) => {
      if (current_user.conn != null) {
        for (var i = 0; i < current_user.conn.length; i++) {
          if (current_user.conn[i] === user.id) {
            notify_list.push(user);
          }
        }
      }
      return null;
    });
  return (
    <div className={classes.root} style={{ marginTop: "15px" }}>
      <Paper elevation={3} style={{ width: "90%", margin: "auto" }}>
        <Grid container spcing={3}>
          <Grid item xs={6}>
            <div className={classes.paper} style={{ display: "flex" }}>
              <TextField
                id="filled-basic"
                label="Search"
                variant="outlined"
                onChange={searchBar}
                style={{ width: "75%", marginRight: 0 }}
              />
              <div
                style={{
                  float: "right",
                  marginLeft: 0,
                  paddingTop: "8px",
                  paddingLeft: "2px",
                  // border: "1px solid grey",
                }}
              >
                <InputLabel id="demo-simple-select-label">Search By</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={item}
                  onChange={handleChange}
                  disableUnderline={true}
                >
                  <MenuItem
                    id="fN"
                    value={"First Name"}
                    onClick={(e) => handleID(e)}
                  >
                    First Name
                  </MenuItem>
                  <MenuItem
                    id="lN"
                    value={"Last Name"}
                    onClick={(e) => handleID(e)}
                  >
                    Last Name
                  </MenuItem>
                  <MenuItem
                    id="cmp"
                    value={"Company"}
                    onClick={(e) => handleID(e)}
                  >
                    Company
                  </MenuItem>
                </Select>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div align="center" style={{ width: "80%", margin: "auto" }}>
              <Typography variant="h5">Your Card List</Typography>
              <hr />
            </div>
            <div style={{ overflow: "auto", height: "400px" }}>
              {conn_list.filter(searchingFor(term, id)).map((person) => (
                <ul key={person.id}>
                  <ConnectionList profiles={person} />
                  {/* Display the list of connection the user has */}
                </ul>
              ))}
            </div>
          </Grid>
          <Grid item xs={6}>
            <div
              style={{
                margin: "auto",
                width: "70%",
              }}
            >
              <Card
                style={{
                  borderTop: "2px solid #3f51b5",
                  borderRight: "5px solid #3f51b5",
                }}
              >
                <Typography
                  variant="h5"
                  style={{ paddingLeft: "15px", paddingBottom: "5px" }}
                  align="center"
                >
                  Notifications
                  <hr />
                </Typography>
                <div
                  style={{
                    margin: "auto",
                    marginLeft: "15%",
                    overflow: "auto",
                  }}
                >
                  <NotificationList notification={notify_list} />
                </div>
              </Card>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}

function searchingFor(term, type) {
  return function (x) {
    return x[type].toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

//variable name must be same when passing props to the nested component and mapping stateProps
const mapStateToProps = (state) => {
  return {
    profiles: state.firestore.ordered.user, // get the  list of user from the
    auth: state.firebase.auth,
    current_user: state.firebase.profile,
    notification: state.firestore.ordered.notify,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "user" }, { collection: "notify" }])
)(Dashboard);
