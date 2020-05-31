import React, { useState } from "react";
import { connect } from "react-redux";
import { login, resetPassword } from "../../store/actions/authAction";
import { Redirect } from "react-router-dom";
import * as validator from "./Validation";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  Button,
  Container,
  Grid,
  Typography,
  TextField,
  Card,
  CardContent,
} from "@material-ui/core";

function Login(props) {
  const initState = {
    email: "",
    password: "",
    errors: {
      email: "",
      password: "",
    },
  };

  const [state, setState] = useState(initState);
  const [open, setOpen] = useState(false);
  const [mail, setMail] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleForgotPwd = (e) => {
    console.log(mail);
    props.resetPassword(mail);
  };
  const validateInputAndSetState = (id, value) => {
    const errors = validator.validate(id, value, state.errors);
    setState({ errors, [id]: value });
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    validateInputAndSetState(id, value);
    setState({ ...state, [e.target.id]: e.target.value });
  };
  const handleMail = (e) => {
    setMail({ ...mail, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // iterate through the component state as key value pairs and
    //  run the validation on each value.
    // if the validation function handles that key value pair
    //  then it is validated otherwise skipped
    for (let [id, value] of Object.entries(state)) {
      validateInputAndSetState(id, value);
    }

    // if error object is empty then the form is valid
    const isFormValid = validator.isErrorObjectEmpty(state.errors);
    // submit if the form is valid

    if (isFormValid) {
      console.log(state);
      props.login(state);
    } else {
      console.log("Form invalid");
    }
  };
  const { authError, auth } = props;
  if (!auth.isEmpty) return <Redirect to="/" />;
  return (
    <Container component="main" maxWidth="xs">
      <form onSubmit={handleSubmit} noValidate>
        <Card>
          <CardContent>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <hr />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              required
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <Typography color="secondary">{state.errors.email}</Typography>
            <br />
            <TextField
              variant="outlined"
              margin="dense"
              fullWidth
              required
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <Typography color="secondary">{state.errors.password}</Typography>
            <br />

            <Button type="submit" fullWidth variant="contained" color="primary">
              Login
            </Button>
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
            <br />
            <br />

            <Grid container>
              <Grid item xs>
                <div align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleClickOpen}
                  >
                    Forgot Password?
                  </Button>
                </div>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Re-set Password
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To reset your password, please type in your email address
                      which was used for the registration
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="mail"
                      label="Email Address"
                      type="email"
                      fullWidth
                      onChange={handleMail}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleForgotPwd} color="primary">
                      Send
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (creds) => dispatch(login(creds)),
    resetPassword: (email) => dispatch(resetPassword(email)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
