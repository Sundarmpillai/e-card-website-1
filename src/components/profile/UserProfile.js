import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import { updateProfile } from "../../store/actions/adminAction";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Typography,
  TextField,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Grid,
  Avatar,
} from "@material-ui/core";
import * as validator from "../auth/Validation";

function UserProfile(props) {
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
    errors: {
      fN: "",
      lN: "",
      cmp: "",
      adr: "",
      pNo: "",
      wNo: "",
      pos: "",
      eM: "",
    },
  };

  const [doc, setDoc] = useState(initState);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("current_user_profile"));
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
        conn: profile.conn || [],
        status: profile.status || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("current_user_profile", JSON.stringify(props.profile));
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
    input: {
      display: "none",
    },
  }));

  const [valid, setValid] = useState(true);

  const validateInputAndSetState = (id, value) => {
    const errors = validator.validate(id, value, doc.errors);
    setDoc({ ...doc, errors, [id]: value });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    validateInputAndSetState(id, value);
    setValid(validator.isErrorObjectEmpty(doc.errors)); //if the error state is empty then valid become true
    // setDoc({ ...doc, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(doc);

    // iterate through the component state as key value pairs and
    //  run the validation on each value.
    // if the validation function handles that key value pair
    //  then it is validated otherwise skipped
    for (let [id, value] of Object.entries(doc)) {
      validateInputAndSetState(id, value);
    }
    // if error object is empty then the form is valid
    const isFormValid = validator.isErrorObjectEmpty(doc.errors);
    // submit if the form is valid

    if (isFormValid) {
      handleClose();
      setValid(true); // set the valid state to true since the form is valid
      console.log("Form is Valid.");
      delete doc.errors; // delete error state from the final object.
      console.log(doc);
      props.updateProfile(doc);
    } else {
      console.log("Form is INVALID. Are all errors displayed?");
      setValid(false);
      handleClose();
    }
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({ ...doc, pPic: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const backView = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({ ...doc, back: URL.createObjectURL(event.target.files[0]) });
    }
  };

  const frontView = (event) => {
    if (event.target.files && event.target.files[0]) {
      setDoc({ ...doc, front: URL.createObjectURL(event.target.files[0]) });
    }
  };

  let id = props.auth.uid;
  const ref = firebase.storage().ref(`${id}`);

  const frontUpload = (e) => {
    const file = document.getElementById("front").files[0];
    try {
      const name = new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          setDoc({
            ...doc,
            front: url,
          });
          console.log("DONE");
        })
        .catch(console.error);
    } catch (err) {
      console.log(0);
    }
  };
  const backUpload = (e) => {
    const file = document.getElementById("back").files[0];
    try {
      const name = new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          setDoc({
            ...doc,
            back: url,
          });
          console.log("DONE");
        })
        .catch(console.error);
    } catch (err) {
      console.log(0);
    }
  };

  const pPicUpload = (e) => {
    const file = document.getElementById("pPic").files[0];
    try {
      const name = new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type,
      };
      const task = ref.child(name).put(file, metadata);
      task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
          setDoc({
            ...doc,
            pPic: url,
          });
          console.log("DONE");
        })
        .catch(console.error);
    } catch (err) {
      console.log(0);
    }
  };

  function handleDialog() {
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" color="black">
          {"Updating the profile"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Are you sure that you want to update your current profile?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            No
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  function renderProfile() {
    return (
      <form style={{ margin: "auto", width: "80%", padding: "10px" }}>
        <Card style={{ width: "auto" }}>
          <Typography variant="h4" style={{ padding: "10px" }}>
            Profile
          </Typography>
          <hr />
          <Grid container spcing={1}>
            <Grid item xs={6}>
              <div style={{ position: "relative" }}>
                <Avatar
                  className={classes.large}
                  alt={doc.fN}
                  src={
                    doc.pPic ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  style={{ margin: "10px" }}
                />
                <div style={{ margin: "10px" }}>
                  <div>
                    <input
                      id="pPic"
                      onChange={onImageChange}
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                      accept="image/*"
                      className={classes.input}
                      multiple
                      type="file"
                    />
                    <label htmlFor="pPic">
                      <Button
                        component="span"
                        variant="contained"
                        color="primary"
                        style={{ margin: "10px" }}
                      >
                        Select
                      </Button>
                    </label>
                    <Button
                      component="span"
                      onClick={pPicUpload}
                      variant="contained"
                      color="primary"
                    >
                      Upload
                    </Button>
                  </div>
                </div>
              </div>
              <div style={{ clear: "left", position: "relative" }}>
                <div>
                  <TextField
                    error={doc.errors.fN === "" ? false : true}
                    className={classes.tField}
                    id="fN"
                    label={valid ? "First Name" : "Error!"}
                    value={doc.fN}
                    helperText={valid ? null : doc.errors.fN}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    error={doc.errors.lN === "" ? false : true}
                    className={classes.tField}
                    id="lN"
                    label={valid ? "Last Name" : "Error!"}
                    value={doc.lN}
                    helperText={valid ? null : doc.errors.lN}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    error={doc.errors.cmp === "" ? false : true}
                    className={classes.tField}
                    id="cmp"
                    label={valid ? "Company" : "Error!"}
                    value={doc.cmp}
                    helperText={valid ? null : doc.errors.cmp}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    error={doc.errors.pos === "" ? false : true}
                    className={classes.tField}
                    id="pos"
                    label={valid ? "Position" : "Error!"}
                    value={doc.pos}
                    helperText={valid ? null : doc.errors.pos}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    error={doc.errors.eM === "" ? false : true}
                    className={classes.tField}
                    id="eM"
                    label={valid ? "E-Mail" : "Error!"}
                    value={doc.eM}
                    helperText={valid ? null : doc.errors.eM}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    error={doc.errors.pNo === "" ? false : true}
                    className={classes.tField}
                    id="pNo"
                    label={valid ? "Personal Number" : "Error!"}
                    value={doc.pNo}
                    helperText={valid ? null : doc.errors.pNo}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
                <div>
                  <TextField
                    error={doc.errors.wNo === "" ? false : true}
                    className={classes.tField}
                    id="wNo"
                    label={valid ? "Work Phone Number" : "Error!"}
                    value={doc.wNo}
                    helperText={valid ? null : doc.errors.wNo}
                    onChange={handleChange}
                    variant="outlined"
                  />
                  <TextField
                    error={doc.errors.adr === "" ? false : true}
                    className={classes.tField}
                    id="adr"
                    label={valid ? "Address" : "Error!"}
                    value={doc.adr}
                    helperText={valid ? null : doc.errors.adr}
                    onChange={handleChange}
                    variant="outlined"
                  />
                </div>
              </div>
            </Grid>
            <Grid>
              <Typography variant="h6" style={{ padding: "10px" }}>
                Card Images
              </Typography>
              <div
                className="CenterImage"
                style={{
                  paddingTop: "15px",
                  margin: "auto",
                  width: "50%",
                }}
              >
                <div style={{ position: "relative", margin: "5px" }}>
                  <img
                    src={
                      doc.front ||
                      "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                    }
                    height="160"
                    width="250"
                    alt="Card Front View"
                  />
                  <div
                    align="right"
                    style={{
                      clear: "right",
                      float: "right",
                      marginLeft: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <div>
                      <input
                        id="front"
                        onChange={frontView}
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                        accept="image/*"
                        className={classes.input}
                        multiple
                        type="file"
                      />
                      <label htmlFor="front">
                        <Button
                          component="span"
                          variant="contained"
                          color="primary"
                          style={{ margin: "10px" }}
                        >
                          Select
                        </Button>
                      </label>
                      <Button
                        component="span"
                        onClick={frontUpload}
                        variant="contained"
                        color="primary"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    position: "relative",
                    margin: "5px",
                    clear: "right",
                  }}
                >
                  <img
                    src={
                      doc.back ||
                      "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                    }
                    height="160"
                    width="250"
                    alt="Card Back View"
                  />
                  <div
                    style={{
                      float: "right",
                      marginLeft: "10px",
                    }}
                  >
                    <div>
                      <input
                        id="back"
                        onChange={backView}
                        style={{
                          whiteSpace: "normal",
                          wordWrap: "break-word",
                        }}
                        accept="image/*"
                        className={classes.input}
                        multiple
                        type="file"
                      />
                      <label htmlFor="back">
                        <Button
                          component="span"
                          variant="contained"
                          color="primary"
                          style={{ margin: "10px" }}
                        >
                          Select
                        </Button>
                      </label>
                      <Button
                        component="span"
                        onClick={backUpload}
                        variant="contained"
                        color="primary"
                      >
                        Upload
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <div style={{ float: "right" }}>
              <Button
                variant="contained"
                color="primary"
                style={{ margin: 10 }}
                onClick={(e) => handleClickOpen()}
              >
                Update
              </Button>
              {open ? handleDialog() : null}
            </div>
            <div style={{ clear: "right" }}></div>
          </Grid>
        </Card>
      </form>
    );
  }

  const { auth } = props;
  const classes = useStyles();
  if (!auth.uid) return <Redirect to="/login" />;

  const profileView = doc === null ? <Redirect to="/" /> : renderProfile();
  if (profileView) {
    return <div>{profileView}</div>;
  } else {
    return (
      <div className="container center">
        <p>Loading Profile...</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  //for id receive from selecting an item from the list
  var curr_user = state.firebase.profile;

  if (!curr_user.isEmpty) {
    localStorage.setItem("current_user_profile", JSON.stringify(curr_user));
  }
  if (curr_user.isEmpty) {
    curr_user = JSON.parse(localStorage.getItem("current_user_profile"));
  }

  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateProfile: (profile) => dispatch(updateProfile(profile)),
  };
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "user" }])
)(UserProfile);
