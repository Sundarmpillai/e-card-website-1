import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../store/actions/authAction'
import {Button, Container, Typography, TextField} from '@material-ui/core'

class Register extends Component {
    
    state = {
        eM : '',
        pwd: '',
        fN:'',
        lN:'',
        pNo: null
    }
    
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.register(this.state);
        this.props.history.push(this.state,'/create',); // After the registration is completed, create page will be loaded.
    }

    render() {
        const {auth,authError} = this.props;
        if(auth.uid) return <Redirect to='/create' />

        return (
            <Container component="main" maxWidth="xs">
            <form noValidate>
                    <Typography component="h1" variant="h5">
                        Register
                    </Typography>
                    <hr/>
                    <TextField 
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    id="fN"
                    label="First Name"
                    name="First Name"
                    autoComplete
                    autoFocus
                    />
                    <br />
                    <TextField 
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    required
                    id="lN"
                    label="Last Name"
                    name="Last Name"
                    autoComplete
                    />
                    <br />
                    <TextField 
                     variant="outlined"
                     margin="dense"
                     fullWidth
                     required
                     id="eM"
                     label="Email"
                     name="email"
                     autoComplete="email"
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
                     id="pwd"
                     autoComplete="current-password"
                    />

                    <br/><br/>
                
                    <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    >Register
                    </Button>

                </form>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth,
        authError:state.auth.authError
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        register: (newUser) => dispatch(register(newUser))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)