import React, { Component } from "react";
import { connect } from "react-redux";
import { changePwd } from "../../store/actions/profileAction";
import { Redirect } from "react-router-dom";
import * as validator from "../auth/Validation";
import { logout } from "../../store/actions/authAction";
import {
  Button,
  Container,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";

class Login extends Component {
  state = {
    password: "",
    repwd: "",
    currPwd: "",
    errors: {
      password: "",
      repwd: "",
      currPwd: "",
    },
  };

  validateInputAndSetState = (id, value) => {
    const errors = validator.validate(id, value, this.state.errors);
    this.setState({ errors, [id]: value });
  };
  handleChange = (e) => {
    const { id, value } = e.target;
    this.validateInputAndSetState(id, value);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // iterate through the component state as key value pairs and
    //  run the validation on each value.
    // if the validation function handles that key value pair
    //  then it is validated otherwise skipped
    for (let [id, value] of Object.entries(this.state)) {
      this.validateInputAndSetState(id, value);
    }

    // if error object is empty then the form is valid
    const isFormValid = validator.isErrorObjectEmpty(this.state.errors);
    // submit if the form is valid

    if (
      isFormValid &&
      (this.state.password === this.state.repwd) &
        (this.state.password !== this.state.currPwd)
    ) {
      console.log("Form Valid");
      this.props.changePwd(this.state);
      this.props.logout();
    } else {
      console.log("Form invalid");
    }
  };
  render() {
    const { authError, auth } = this.props;
    if (!auth.uid) return <Redirect to="/login" />;
    return (
      <Container component="main" maxWidth="xs">
        <form onSubmit={this.handleSubmit} noValidate>
          <Card>
            <CardContent style={{ margin: "10px" }}>
              <Typography component="h1" variant="h5">
                Change Current Password
              </Typography>
              <hr />
              <br />
              <Typography variant="body1">
                Type in the new password below
              </Typography>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                name="newPassword"
                label="New Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
                style={{ marginBottom: "20px" }}
              />
              <Typography color="secondary">
                {this.state.errors.email}
              </Typography>
              <Typography variant="body1">
                Re-enter your new password
              </Typography>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                name="RePwd"
                label="Re-enter Password"
                type="password"
                id="repwd"
                autoComplete="current-password"
                onChange={this.handleChange}
                style={{ marginBottom: "20px" }}
              />
              <br />
              <Typography variant="body1">
                Type in your current password
              </Typography>
              <TextField
                variant="outlined"
                margin="dense"
                fullWidth
                required
                name="password"
                label="Current Password"
                type="password"
                id="currPwd"
                autoComplete="current-password"
                onChange={this.handleChange}
                style={{ marginBottom: "20px" }}
              />
              <Typography color="secondary">
                {this.state.errors.password}
              </Typography>

              <br />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
              <div className="red-text center">
                {authError ? <p>{authError}</p> : null}
              </div>
              <br />
            </CardContent>
          </Card>
        </form>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changePwd: (creds) => dispatch(changePwd(creds)),
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
