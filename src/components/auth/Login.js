import React, { Component } from 'react'
import {connect} from 'react-redux'
import {login} from '../../store/actions/authAction'
import {Redirect} from 'react-router-dom'
import * as validator from './Validations.js'

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
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white" noValidate>
                    <h5 className = "grey-text text-darken-3">Login</h5>
                    <div className = "input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id= "email" onChange ={this.handleChange} noValidate/>
                        <div>{this.state.errors.email}</div>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handleChange}/>
                        <div>{this.state.errors.password}</div>
                    </div>
                    <div className="input-filed">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                        <div className="red-text center">
                            {authError ? <p>{authError}</p> : null}
                        </div>
                    </div>
                </form>       
            </div>
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
