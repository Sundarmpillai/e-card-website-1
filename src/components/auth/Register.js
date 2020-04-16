import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {register} from '../../store/actions/authAction'

class Register extends Component {
    
    state = {
        eM : '',
        pwd: '',
        fN:'',
        lN:'',
        pNo:null
    }
    handelChange = (e) => {
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
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className = "grey-text text-darken-3">Register</h5>
                    <div className = "input-field">
                        <label htmlFor="email">First Name</label>
                        <input type="text" id= "fN" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="email">Last Name</label>
                        <input type="text" id= "lN" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id= "em" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="pwd" onChange={this.handelChange}/>
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
