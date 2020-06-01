import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import { updateConnection } from "../../store/actions/adminAction";
import { deleteConnection } from "../../store/actions/adminAction";
import firebase from "firebase";

const initialState = {
  firstNameErr: "",
  lastNameErr: "",
  emailError:"",
  numberError:"",
  numberError2:"",
};

class ViewConnection extends Component {
  state = {
    prof: [],
    update: {
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
      status: "",
    },
    form_error:initialState,
  };

  // state2 = initialState;

  componentDidMount() {
    const { update } = this.state;
    // console.log(this.props.conn_profile);
    this.setState({
      update: {
        ...update,
        fN: this.props.conn_profile.fN,
        lN: this.props.conn_profile.lN,
        cmp: this.props.conn_profile.cmp,
        adr: this.props.conn_profile.adr,
        pNo: this.props.conn_profile.pNo,
        wNo: this.props.conn_profile.wNo,
        pos: this.props.conn_profile.pos,
        eM: this.props.conn_profile.eM,
        pPic: this.props.conn_profile.pPic,
        front: this.props.conn_profile.front,
        back: this.props.conn_profile.back,
        status: this.props.conn_profile.status,
      },
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.conn_profile !== this.props.conn_profile) {
      this.setState({
        prof: this.props.conn_profile,
      });
    }
  }

  handelChange = (e) => {
    const { update } = this.state;
    this.setState({
      update: { ...update, [e.target.id]: e.target.value },
    });
  };

  testClick = () => {
    alert("Test Complete");
  };


  validate = () => {
    let firstNameErr = "";
    let lastNameErr = "";
    let numberError = "";
    let numberError2 = "";

    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    const numberRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
    // const numberRegex = /^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;

    if (!this.state.update.fN) {
      this.state.form_error.firstNameErr = "First Name cannot be empty";
      return false;
    }

    if (!this.state.update.lN) {
      this.state.form_error.lastNameErr = "Last Name cannot be empty";
      return false;
    }

    if (!this.state.update.eM) {
      this.state.form_error.emailError = "Email cannot be empty";
      return false;

    } else if (!emailRegex.test(this.state.update.eM)) {
      this.state.form_error.emailError = "Invalid Email";
      return false;
    }

    if (!this.state.update.pNo) {
      this.state.form_error.numberError = "Number cannot be empty";
      return false;

    } else if (!numberRegex.test(this.state.update.pNo)) {
      this.state.form_error.numberError = "Invalid number";
      return false;
    }

    if (!this.state.update.wNo) {
      this.state.form_error.numberError2 = "Number cannot be empty";
      return false;

    } else if (!numberRegex.test(this.state.update.wNo)) {
      this.state.form_error.numberError2 = "Invalid number";
      return false;
    }

    if (firstNameErr || lastNameErr || numberError || numberError2) {
      this.setState({error:{ firstNameErr, lastNameErr, numberError, numberError2}});
      return false;
    }

    return true;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const isValid = this.validate();
    
    if (isValid) {
      console.log(this.state.form_error);
      this.setState({form_error:{initialState}}); 
      e.target.reset();
      alert("Update Successful");
      // var uid = this.props.match.params.id;
      // this.props.updateConnection(this.state.update, uid);
    } 
    
  };

  onDelete = (e) => {
    var uid = this.props.match.params.id;
    this.props.deleteConnection(this.state.update, uid); // change it one parameter to pass:
    this.props.history.goBack();
  };

  onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        //   update: { ...update, [e.target.id]: e.target.value },
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

  sendMail = (e) => {
    window.location.href = "mailto:" + this.props.conn_profile.eM;
  };

  renderProfile(profile, admin) {
    // console.log("reached", profile);
    return (
      <div className="container section">
        <form onSubmit={this.handleSubmit} className="white">
          <div className="card">
            <div className="card-content">
              <img
                className="circular_view"
                src={
                  profile.pPic ||
                  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                }
                alt=""
                width="20%"
                height="20%"
              />
              {admin ? (
                <div>
                  <input
                    type="text"
                    id="fN"
                    value={profile.fN}
                    placeholder = "First Name"
                    onChange={this.handelChange}
                  />
                  <div style={{ color: "red" }}>{this.state.form_error.firstNameErr}</div>
                  <input
                    type="text"
                    id="lN"
                    value={profile.lN}
                    placeholder = "Last Name"
                    onChange={this.handelChange}
                  />
                  <div style={{ color: "red" }}>{this.state.form_error.lastNameErr}</div>
                </div>
              ) : (
                <span className="card-title">
                  Name - {profile.fN} {profile.lN}
                </span>
              )}
              <div className=" card-small" style={{ display: "inline-block" }}>
                <div className="input-field">
                  <i
                    className="small material-icons inline prefix"
                    style={{ float: "left" }}
                  >
                    work
                  </i>
                  {admin ? (
                    <input
                      type="text"
                      value={profile.cmp}
                      placeholder = "Company"
                      id="cmp"
                      onChange={this.handelChange}
                    />
                  ) : (
                    <p>Company - {profile.cmp}</p>
                  )}
                </div>
                <div className="input-field">
                  <i
                    className="small material-icons inline prefix"
                    style={{ float: "left" }}
                  >
                    person_pin
                  </i>
                  {admin ? (
                    <input
                      type="text"
                      value={profile.pos}
                      placeholder = "Position"
                      id="pos"
                      onChange={this.handelChange}
                    />
                  ) : (
                    <p id="pos">Position - {profile.pos}</p>
                  )}
                </div>
                <div className="input-field">
                  <i
                    className="small material-icons inline prefix"
                    style={{ float: "left" }}
                  >
                    mail
                  </i>
                  {admin ? (
                    <input
                      type="text"
                      value={profile.eM}
                      placeholder = "Email"
                      id="eM"
                      onChange={this.handelChange}
                    />
                  ) : (
                    <p id="eM">Email - {profile.eM}</p>
                  )}
                </div>
                <div style={{ color: "red" }}>{this.state.form_error.emailError}</div>
                <div className="input-field" style={{ whiteSpace: "nowrap" }}>
                  <i
                    className="small material-icons inline prefix"
                    style={{ float: "left" }}
                  >
                    phone_android
                  </i>
                  {admin ? (
                    <input
                      type="text"
                      value={profile.pNo}
                      placeholder = "Personal Number"
                      id="pNo"
                      onChange={this.handelChange}
                    />
                  ) : (
                    <p id="pNo">Personal Number- {profile.pNo}</p>
                  )}
                </div>
                <div style={{ color: "red" }}>{this.state.form_error.numberError}</div>
                <div className="input-field">
                  <i
                    className="small material-icons inline prefix"
                    style={{ float: "left" }}
                  >
                    phone
                  </i>
                  {admin ? (
                    <input
                      type="text"
                      value={profile.wNo}
                      placeholder = "Work Number"
                      id="wNo"
                      onChange={this.handelChange}
                    />
                  ) : (
                    <p id="wNo">Work Number - {profile.wNo}</p>
                  )}
                </div>
                <div style={{ color: "red" }}>{this.state.form_error.numberError2}</div>

                <div className="input-field">
                  <i
                    className="small material-icons inline prefix"
                    style={{ float: "left" }}
                  >
                    location_city
                  </i>
                  {admin ? (
                    <input
                      type="text"
                      value={profile.adr}
                      placeholder = "Address"
                      id="adr"
                      onChange={this.handelChange}
                    />
                  ) : (
                    <p id="adr">Adress - {profile.adr}</p>
                  )}
                </div>
              </div>
              <div style={{ float: "right", backgroundColor: "#D3D3D3" }}>
                <img
                  className="card-view"
                  src={profile.front}
                  alt="Card Front View"
                  style={{ display: "block" }}
                />
                <img
                  className="card-view"
                  src={profile.back}
                  alt="Card Back View"
                />
              </div>
              <div className="input-filed" style={{ clear: "left" }}>
                <button className="btn pink lighten-1 z-depth-0">Update</button>
                <button
                  className="btn pink lighten-1 z-depth-0"
                  style={{ margin: 10 }}
                  onClick={this.onDelete}
                >
                  Delete
                </button>
                <button
                  className="btn pink lighten-1 z-depth-0"
                  onClick={this.testClick}
                >
                  Test
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

  render() {
    // const { conn_profile } = this.props;
    // console.log("state", this.state.update);
    const { admin_profile } = this.props;
    const { update } = this.state;
    let status = admin_profile.status;
    const profileView =
      update === null ? (
        <Redirect to="/" />
      ) : (
        this.renderProfile(update, status)
      );
    return <div>{profileView}</div>;
  }
}
const mapStateToProps = (state, ownProps) => {
  //for id receive from selecting an item from the list
  const id = ownProps.match.params.id;
  const profiles = state.firestore.data.user; // check with the id values of the documents in the firestore
  const profile = profiles ? profiles[id] : null; // and when the value has a match pass that document as an object
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
