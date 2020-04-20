import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../store/actions/authAction'
import * as validator from './Validations.js'

class Register extends Component {
    
    state = {
        em : '',
        pwd: '',
        fN:'',
        lN:'',
        pNo: null,
        errors: {
            fN: '',
            lN: '',
            eM: '',
            pwd: '',
        },
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
            console.log('Form is valid');
            this.props.register(this.state);
            this.props.history.push(this.state,'/create',); // After the registration is completed, create page will be loaded.
        } else {
            console.log('Form is invalid. Are errors displayed?');
        }
        
        console.log(this.state);
    }
    
    render() {
        const {auth,authError} = this.props;
        if(auth.uid) return <Redirect to='/create' />
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white" noValidate>
                    <h5 className = "grey-text text-darken-3">Register</h5>
                    <div className = "input-field">
                        <label htmlFor="email">First Name</label>
                        <input type="text" id= "fN" onChange ={this.handleChange}/>
                        <div>{this.state.errors.fN}</div>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="email">Last Name</label>
                        <input type="text" id= "lN" onChange ={this.handleChange}/>
                        <div>{this.state.errors.lN}</div>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id= "em" onChange ={this.handleChange} noValidate/>
                        <div>{this.state.errors.eM}</div>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="pwd" onChange={this.handleChange}/>
                        <div>{this.state.errors.pwd}</div>
                    </div>
                    <div className="input-filed">
                        <button className="btn pink lighten-1 z-depth-0" >Register</button>
                    <div className="red-text center">
                        {authError ? <p> {authError} </p>: null}
                    </div>
                    </div>
                </form>       
            </div>
        )
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
