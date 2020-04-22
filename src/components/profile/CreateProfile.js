import React, { Component } from "react";
import { connect } from "react-redux";
import { createProfile } from "../../store/actions/profileAction";
import { Redirect } from "react-router-dom";
import firebase from "firebase";
class CreateProfile extends Component {
  state = {
    fN: "",
    lN: "",
    cmp: "",
    adr: "",
    pNo: "",
    wNo: "",
    pos: "",
    eM: "",
    pPic: "",
    front: "",
    back: "",
  };

  handelChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.createProfile(this.state);
    this.props.history.push("/");
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        pPic: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  frontView = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        front: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  backView = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        back: URL.createObjectURL(event.target.files[0]),
      });
    }
  };

  fileUploadHandler = (e) => {
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
  render() {
    const { auth, profile } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit} className="white">
          <h5 className="grey-text text-darken-3">Create Profile</h5>

          <h6 className="grey-text text-darken-3">Personal Information</h6>
          <div style={{ position: "relative" }}>
            <img
              className="circular_view"
              src={
                this.state.pPic ||
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              }
              alt=""
              height="50"
              width="50"
            />
            <div className="file-field input-field" style={{ margin: "10px" }}>
              <div className="btn pink lighten-1 z-depth-2">
                <span style={{ fontSize: "10px" }}>Upload</span>
                <input
                  type="file"
                  id="pPic"
                  onChange={this.onImageChange}
                  style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                />
              </div>
            </div>
          </div>
          <div style={{ clear: "left", position: "relative" }}>
            <div
              className="input-field"
              style={{ float: "left", paddingInlineEnd: 20 }}
            >
              <label htmlFor="fN">First Name</label>
              <input type="text" id="fN" onChange={this.handelChange} />
            </div>
            <div className="input-field" style={{ float: "left" }}>
              <label htmlFor="lN">Last Name</label>
              <input type="text" id="lN" onChange={this.handelChange} />
            </div>
          </div>
          <div className="input-field" style={{ clear: "left" }}>
            <label htmlFor="pNo">Personal Number</label>
            <input
              type="text"
              id="pNo"
              onChange={this.handelChange}
              style={{ width: "40%" }}
            />
          </div>
          <h6 className="grey-text text-darken-3">Work Information</h6>
          <div className="input-field">
            <label htmlFor="pNo">Company</label>
            <input
              type="text"
              id="cmp"
              onChange={this.handelChange}
              style={{ width: "40%" }}
            />
          </div>
          <div className="input-field">
            <label htmlFor="pos">Position</label>
            <input type="text" id="pos" onChange={this.handelChange} />
          </div>
          <div className="input-field">
            <label htmlFor="eM">Email Address</label>
            <br />
            <p id="eM">{profile.eM}</p>
          </div>
          <div className="input-field">
            <label htmlFor="wNo">Work Phone Number</label>
            <input type="text" id="wNo" onChange={this.handelChange} />
          </div>
          <div className="input-field">
            <label htmlFor="adr">Address</label>
            <input type="text" id="adr" onChange={this.handelChange} />
          </div>
          <div>
            <div style={{ float: "left", position: "relative", margin: "5px" }}>
              <img
                src={
                  this.state.front ||
                  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                }
                height="160"
                width="250"
                alt="Card Front View"
              />
              <br />
              <div
                className="file-field input-field"
                style={{ margin: "10px" }}
              >
                <div className="btn pink lighten-1 z-depth-2 ">
                  <span style={{ fontSize: "10px" }}>Upload</span>
                  <input
                    type="file"
                    id="front"
                    onChange={this.frontView}
                    style={{ whiteSpace: "normal", wordWrap: "break-word" }}
                  />
                </div>
              </div>
            </div>
            <div style={{ float: "left", position: "relative", margin: "5px" }}>
              <img
                src={
                  this.state.back ||
                  "https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg"
                }
                height="160"
                width="250"
                alt="Card Back View"
              />
              <br />
              <div
                className="file-field input-field"
                style={{ margin: "10px" }}
              >
                <div className="btn pink lighten-1 z-depth-2">
                  <span style={{ fontSize: "10px" }}>Upload</span>
                  <input type="file" id="back" onChange={this.backView} />
                </div>
              </div>
            </div>
          </div>
          <div className="input-filed" style={{ clear: "left" }}>
            <button
              className="btn pink lighten-0 z-depth-0"
              onClick={this.fileUploadHandler}
              style={{ whiteSpace: "normal" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    );
  }
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
