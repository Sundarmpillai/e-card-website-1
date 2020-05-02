import React, { Component } from "react";
import Notification from "../profile/Notification";
import ConnectionList from "../connections/ConnectionList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      people: "",
      term: "",
    };
    this.searchBar = this.searchBar.bind(this);
  }

  searchBar(e) {
    this.setState({
      term: e.target.value,
    });
  }

  componentDidMount() {
    this.setState({
      people: this.props.profiles,
    });
  }

  render() {
    // console.log('props',this.props.profiles);
    // console.log('state',this.state.profiles);
    const { profiles, auth, current_user } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;

    if (current_user.pNo === "") return <Redirect to="/create" />;
    const conn_list = [];
    profiles &&
      profiles.map((user) => {
        return conn_list.push(user);
      });
    return (
      <div className="themed-container " fluid="md">
        <div className="dashboard container">
          <div className="row">
            <input
              type="text"
              value={this.state.term}
              onChange={this.searchBar}
            />
            <div
              className="col s12 m6"
              style={{ overflow: "auto", height: "550px" }}
            >
              {conn_list.filter(searchingFor(this.state.term)).map((person) => (
                <ul key={person.id}>
                  <ConnectionList profiles={person} />{" "}
                  {/* Display the list of connection the user has */}
                </ul>
              ))}
            </div>

            <div className="col s12 m5 offset-m1">
              <Notification />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function searchingFor(term) {
  return function (x) {
    return x.fN.toLowerCase().includes(term.toLowerCase()) || !term;
  };
}

//variable name must be same when passing props to the nested component and mapping stateProps
const mapStateToProps = (state) => {
  return {
    profiles: state.firestore.ordered.user, // get the  list of user from the firestore
    auth: state.firebase.auth,
    current_user: state.firebase.profile,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "user" }])
)(Admin);
