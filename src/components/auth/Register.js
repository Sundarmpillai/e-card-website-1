import React, { Component } from 'react'

class Register extends Component {
    state = {
        email : '',
        password: '',
        firstName:'',
        lastName:''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className = "grey-text text-darken-3">Register</h5>
                    <div className = "input-field">
                        <label htmlFor="email">First Name</label>
                        <input type="text" id= "firstName" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="email">Last Name</label>
                        <input type="text" id= "lastName" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id= "email" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" onChange={this.handelChange}/>
                    </div>
                    <div className="input-filed">
                        <button className="btn pink lighten-1 z-depth-0">Register</button>
                    </div>
                </form>       
            </div>
        )
    }
}

export default Register
