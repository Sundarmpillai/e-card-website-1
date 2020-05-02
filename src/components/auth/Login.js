import React, { Component } from 'react'
import {connect} from 'react-redux'
import {login} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import * as validator from './Validations.js'
import {Button, Container, Checkbox, Grid, FormControlLabel, Link, Typography, TextField} from '@material-ui/core'

class Login extends Component {
    state = {
        email: '',
        password: '',

        errors: {
            email: '',
            password: ''
        }
    }

    validateInputAndSetState = (id, value) => {
        const errors = validator.validate(id, value, this.state.errors);
        this.setState({errors, [id]: value});
    }

    handleChange = (e) => {
        const { id, value } = e.target;
        this.validateInputAndSetState(id, value);

    }

    handleSubmit = (e) => {
        e.preventDefault();

        // iterate through the component state as key value pairs and
        //  run the validation on each value.
        // if the validation function handles that key value pair
        //  then it is validated otherwise skipped
        for (let [id, value] of Object.entries(this.state)) {
            console.log(`${id} : ${value}`);
            this.validateInputAndSetState(id, value);
        }

        // if error object is empty then the form is valid
        const isFormValid = validator.isErrorObjectEmpty(this.state.errors);
        // submit if the form is valid  
        
        if (isFormValid) {
            console.log('Form Valid');
            this.props.login(this.state);
        } else {
            console.log('Form invalid');
        }
    }

    render() {
        const {authError, auth} = this.props;
        if(auth.uid) return <Redirect to='/'/>
        return (
            <Container component="main" maxWidth="xs">
                <form onSubmit={this.handleSubmit} noValidate>
                    <Typography component="h1" variant="h5">
                        Login
                    </Typography>
                    <hr/>
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
                     onChange={this.handleChange} 
                    />
                    <Typography color="secondary">{this.state.errors.email}</Typography>
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
                     onChange={this.handleChange} 
                    />
                    <Typography color="secondary">{this.state.errors.password}</Typography>
                    <br/>

                    <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember Me"
                    />

                    <br/><br/>

                    <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    >Login
                    </Button>
                    <div className="red-text center">
                        {authError ? <p>{authError}</p> : null}
                    </div>

                    <br/><br/>

                    <Grid container>
                        <Grid item xs>
                            <Link href='#' variant='body2'>
                                Forgot Password?
                            </Link>
                        </Grid>
                    <Grid item>
                        <Link href='#' variant='body2'>
                            {"Don't have an account? Sign Up"}
                        </Link>
                    </Grid>
                    </Grid>
                </form> 
            </Container>
            )
        }
    }

const mapStateToProps = (state) => {
    return{
        authError: state.auth.authError,
        auth: state.firebase.auth
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        login: (creds) => dispatch(login(creds))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login)
