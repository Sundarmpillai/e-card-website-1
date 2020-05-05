import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updateConnection } from "../../store/actions/adminAction";
import { deleteConnection } from "../../store/actions/adminAction";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Paper } from "@material-ui/core";

function ViewConnection(props) {
  const initState = {
    fN: "",
    lN: "",
    cmp: "",
    adr: "",
    pNo: 0,
    wNo: 0,
    pos: "",
    eM: "",
    pPic: "",
    front: "",
    back: "",
    status: false,
  };

  const [doc, setDoc] = useState(initState);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"));
    console.log(profile);
    if (profile) {
      setDoc({
        ...doc,
        fN: profile.fN || "",
        lN: profile.lN || "",
        cmp: profile.cmp || "",
        adr: profile.adr || "",
        pNo: profile.pNo || 0,
        wNo: profile.wNo || 0,
        pos: profile.pos || "",
        eM: profile.eM || "",
        pPic: profile.pPic || "",
        front: profile.front || "",
        back: profile.back || "",
        status: profile.status || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("profile", JSON.stringify(props.conn_profile));
  });

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: "100%",
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
    tField: {
      padding: 10,
    },
  }));

  const handleChange = (e) => {
    setDoc({ ...doc, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var uid = props.match.params.id;
    props.updateConnection(doc, uid);
  };

  const onDelete = (e) => {
    var uid = this.props.match.params.id;
    this.props.deleteConnection(this.state.update, uid); // change it one parameter to pass:
    this.props.history.goBack();
  };

  const { admin_profile, auth } = props;
  const classes = useStyles();
  let admin = admin_profile.status;

  if (!auth.uid) return <Redirect to="/" />;
  if (admin_profile.isEmpty) {
    admin = true;
  }
  return (
    <form style={{ margin: "auto", width: "80%", padding: "10px" }}>
      <Card style={{ width: "auto" }}>
        <Grid container spcing={1}>
          <Grid item xs={6}>
            <Typography variant="h5" style={{ padding: "10px" }}>
              Profile
            </Typography>
            <div style={{ marginBottom: "10px" }}>
              <Avatar
                className={classes.large}
                alt={doc.fN}
                src={
                  doc.pPic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                style={{ margin: "auto" }}
              />
            </div>
            <Paper elevation={3} style={{ width: "80%", margin: "auto" }}>
              {admin ? (
                <div>
                  <TextField
                    className={classes.tField}
                    id="fN"
                    label="First Name"
                    value={doc.fN}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    className={classes.tField}
                    id="lN"
                    label="Last Name"
                    value={doc.lN}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
              ) : (
                <Typography variant="body1" style={{ padding: "10px" }}>
                  <label style={{ fontWeight: "bold" }}>Name - </label>
                  {doc.fN} {doc.lN}
                </Typography>
              )}
              <div>
                <div>
                  {admin ? (
                    <div>
                      <TextField
                        className={classes.tField}
                        id="cmp"
                        label="Company"
                        value={doc.cmp}
                        onChange={handleChange}
                        variant="outlined"
                      />
                      <TextField
                        className={classes.tField}
                        id="pos"
                        label="Position"
                        value={doc.pos}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <Typography variant="body1" style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>Company - </label>
                      {doc.cmp}
                      <label style={{ fontWeight: "bold" }}> Position - </label>
                      {doc.pos}
                    </Typography>
                  )}
                </div>
                <div>
                  {admin ? (
                    <TextField
                      className={classes.tField}
                      id="eM"
                      label="E-Mail"
                      value={doc.eM}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  ) : (
                    <Typography variant="body1" style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>E-Mail - </label>
                      {doc.eM}
                    </Typography>
                  )}
                  {admin ? (
                    <div>
                      <TextField
                        className={classes.tField}
                        id="pNo"
                        label="Personal Number"
                        value={doc.pNo}
                        onChange={handleChange}
                        variant="outlined"
                      />
                      <TextField
                        className={classes.tField}
                        id="wNo"
                        label="Work Number"
                        value={doc.wNo}
                        onChange={handleChange}
                        variant="outlined"
                      />
                    </div>
                  ) : (
                    <Typography variant="body1" style={{ padding: "10px" }}>
                      <label style={{ fontWeight: "bold" }}>
                        Personal Number -{" "}
                      </label>
                      {doc.pNo}
                      <label style={{ fontWeight: "bold" }}>
                        {" "}
                        Work Number -{" "}
                      </label>
                      {doc.wNo}
                    </Typography>
                  )}
                  {admin ? (
                    <TextField
                      className={classes.tField}
                      id="adr"
                      label="Address"
                      value={doc.adr}
                      onChange={handleChange}
                      variant="outlined"
                    />
                  ) : (
                    <Typography
                      id="adr"
                      variant="body1"
                      style={{ padding: "10px" }}
                    >
                      <label style={{ fontWeight: "bold" }}>Address - </label>
                      {doc.adr}
                    </Typography>
                  )}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ padding: "10px" }}>
              Card Images
            </Typography>
            <div>
              <img
                className="card-view"
                src={
                  doc.front ||
                  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                }
                alt="Card Front View"
                style={{ display: "block" }}
              />
              <img
                className="card-view"
                src={
                  doc.back ||
                  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                }
                alt="Card Back View"
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ float: "right" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Update
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ margin: "10px" }}
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </Grid>
      </Card>
    </form>
  );
}

// const sendMail = (e) => {
//   window.location.href = "mailto:" + this.props.conn_profile.eM;
// };

const mapStateToProps = (state, ownProps) => {
  //for id receive from selecting an item from the list
  const id = ownProps.match.params.id;
  const profiles = state.firestore.data.user; // check with the id values of the documents in the firestore
  var profile = profiles ? profiles[id] : null; // and when the value has a match pass that document as an object
  if (profile !== null && profile !== undefined) {
    localStorage.setItem("profile", JSON.stringify(profile));
  }
  if (profile === null) {
    profile = JSON.parse(localStorage.getItem("profile"));
  }
  return {
    conn_profile: profile,
    auth: state.firebase.auth,
    admin_profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateConnection: (profile, id) => dispatch(updateConnection(profile, id)),
    deleteConnection: (profile, id) => dispatch(deleteConnection(profile, id)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "user" }])
)(ViewConnection);
