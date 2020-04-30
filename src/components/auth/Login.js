import React, { Component } from 'react';
import {connect} from 'react-redux';
import {login} from '../../store/actions/authAction';
import {Redirect} from 'react-router-dom';
import {Button, Container, Checkbox, Grid, FormControlLabel, Link, Typography, TextField} from '@material-ui/core'

class Login extends Component {
    state = {
        email : '',
        password: ''
    }

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state);
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
                    />
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
                    />

                    <br/><br/>

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
