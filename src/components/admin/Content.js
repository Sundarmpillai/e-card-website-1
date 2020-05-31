import React, { useState } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

import { uploadNews, updateContact } from "../../store/actions/adminAction";
import {
  Card,
  Typography,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";

function Content(props) {
  const initState = {
    msg: "",
    date: "",
  };

  const initContact = {
    fN1: "",
    lN1: "",
    pNo1: 0,
    eM1: "",
    fN2: "",
    lN2: "",
    pNo2: 0,
    eM2: "",
  };

  const [news, setNews] = useState(initState);

  const [contact, setContact] = useState(initContact);

  function handleChange(e) {
    setNews({ ...news, msg: e.target.value, date: new Date() });
  }

  function handleContact(e) {
    setContact({ ...contact, [e.target.id]: e.target.value });
  }

  function handleAnnouncement(e) {
    console.log(news);
    props.uploadNews(news);
  }

  function handleContactUpdate(e) {
    console.log(contact);
    props.updateContact(contact);
  }

  const { auth } = props;
  if (!auth.uid) return <Redirect to="/login" />;

  return (
    <div style={{ width: "750px", margin: "auto", marginTop: "10px" }}>
      <Card>
        <CardContent>
          <Typography variant="h5">Announcement</Typography>
          <div>
            <TextField
              id="news"
              label="Message"
              multiline
              rows={3}
              variant="outlined"
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            onClick={handleAnnouncement}
            style={{ float: "right", margin: "10px" }}
          >
            Publish
          </Button>
        </CardContent>
      </Card>
      <Card style={{ marginTop: "10px", marginBottom: "10px" }}>
        <CardContent>
          <Typography variant="h5">Contact Information</Typography>
          <div>
            <Typography>1st Contact Information</Typography>
            <div style={{ margin: "10px" }}>
              <TextField
                id="fN1"
                label="First Name"
                variant="outlined"
                style={{ marginRight: "10px" }}
                onChange={handleContact}
              />
              <TextField
                id="lN1"
                label="Last Name"
                variant="outlined"
                onChange={handleContact}
              />
            </div>
            <div style={{ margin: "10px" }}>
              <TextField
                id="pNo1"
                label="Phone Number"
                variant="outlined"
                style={{ marginRight: "10px" }}
                onChange={handleContact}
              />

              <TextField
                id="eM1"
                label="Email Address"
                variant="outlined"
                onChange={handleContact}
              />
            </div>
          </div>
          <div>
            <Typography>2nd Contact Information</Typography>
            <div style={{ margin: "10px" }}>
              <TextField
                id="fN2"
                label="First Name"
                variant="outlined"
                style={{ marginRight: "10px" }}
                onChange={handleContact}
              />
              <TextField
                id="lN2"
                label="Last Name"
                variant="outlined"
                onChange={handleContact}
              />
            </div>
            <div style={{ margin: "10px" }}>
              <TextField
                id="pNo2"
                label="Phone Number"
                variant="outlined"
                style={{ marginRight: "10px" }}
                onChange={handleContact}
              />
              <TextField
                id="eM2"
                label="Email Address"
                variant="outlined"
                onChange={handleContact}
              />
            </div>
          </div>
          <Button
            color="primary"
            variant="contained"
            style={{ float: "right", margin: "10px" }}
            onClick={handleContactUpdate}
          >
            Update
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    content: state.firestore.ordered.news, // get the  list of user from the firestore
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    uploadNews: (obj) => dispatch(uploadNews(obj)),
    updateContact: (obj) => dispatch(updateContact(obj)),
  };
};
export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  firestoreConnect([{ collection: "news" }])
)(Content);
