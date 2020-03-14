import React, { Component } from 'react'
import {connect} from 'react-redux'
import {createProfile} from '../../store/actions/profileAction'

class CreateProfile extends Component {
    state = {
        fN : '',
        cmp: ''
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.createProfile(this.state);
    }
    render() {
        return (
            <div className="container">
                <form onSubmit = {this.handleSubmit} className="white">
                    <h5 className = "grey-text text-darken-3">Create Profile</h5>
                    <div className = "input-field">
                        <label htmlFor="fName">Full Name</label>
                        <input type="text" id= "fN" onChange ={this.handelChange}/>
                    </div>
                    <div className = "input-field">
                        <label htmlFor="company">Company</label>
                        <input type="text" id="cmp" onChange={this.handelChange}/>
                    </div>
                    <div className="input-filed">
                        <button className="btn pink lighten-1 z-depth-0">Upload</button>
                    </div>
                </form>       
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createProfile: (profile) => dispatch(createProfile(profile))
    }
}

export default connect(null,mapDispatchToProps)(CreateProfile)
