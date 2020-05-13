import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../store/actions/profileAction";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function CreateProfile(props) {
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
    const profile = JSON.parse(localStorage.getItem("create"));
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
        conn: profile.conn || [],
        front: profile.front || "",
        back: profile.back || "",
        status: profile.status || false,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.removeItem("create");
    localStorage.setItem("create", JSON.stringify(props.profile));
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
    props.createProfile(doc);
    props.history.push("/");
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        pPic: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const frontView = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        front: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const backView = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        back: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  const fileUploadHandler = (e) => {
    const ref = firebase.storage().ref();
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
          this.setState({
            pPic: url,
          });
        })
        .catch(console.error);
    } catch (err) {
      console.log(0);
    }
  };
  const { auth, profile } = props;
  const classes = useStyles();
  if (!auth.uid) return <Redirect to="/login" />;
  return (
    <form
      onSubmit={handleSubmit}
      style={{ margin: "auto", width: "80%", padding: "10px" }}
    >
      <Card style={{ width: "auto" }}>
        <Typography variant="h4" style={{ padding: "10px" }}>
          Create Profile
        </Typography>
        <Grid container spcing={1}>
          <Grid item xs={6}>
            <Typography variant="h6" style={{ padding: "10px" }}>
              Personal Information
            </Typography>
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
                  <span style={{ fontSize: "10px" }}>Upload</span>
                  <input
                    type="file"
                    id="pPic"
                    onChange={onImageChange}
                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ clear: "left", position: "relative" }}>
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
            </div>
            <div style={{ clear: "left" }}>
              <TextField
                className={classes.tField}
                id="pNo"
                label="Personal Number"
                value={doc.pNo}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <Typography variant="h6" style={{ padding: "10px" }}>
              Work Information
            </Typography>
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
            <div>
              <TextField
                className={classes.tField}
                id="eM"
                label="E-Mail"
                value={doc.eM}
                onChange={handleChange}
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                className={classes.tField}
                id="wNo"
                label="Work Number"
                value={doc.wNo}
                onChange={handleChange}
                variant="outlined"
              />
              <TextField
                className={classes.tField}
                id="adr"
                label="Address"
                value={doc.adr}
                onChange={handleChange}
                variant="outlined"
              />
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
                    profile.front ||
                    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                  }
                  height="160"
                  width="250"
                  alt="Card Front View"
                />
                <br />
                <div style={{ margin: "10px" }}>
                  <div>
                    <span style={{ fontSize: "10px" }}>Upload</span>
                    <input
                      type="file"
                      id="front"
                      onChange={frontView}
                      style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                    />
                  </div>
                </div>
              </div>
              <div style={{ position: "relative", margin: "5px" }}>
                <img
                  src={
                    profile.back ||
                    "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                  }
                  height="160"
                  width="250"
                  alt="Card Back View"
                />
                <br />
                <div style={{ margin: "10px" }}>
                  <div>
                    <span style={{ fontSize: "10px" }}>Upload</span>
                    <input type="file" id="back" onChange={backView} />
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <div style={{ clear: "left" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={fileUploadHandler}
              style={{ float: "right", margin: "10px" }}
            >
              Create
            </Button>
          </div>
        </Grid>
      </Card>
    </form>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (profile) => dispatch(createProfile(profile)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
