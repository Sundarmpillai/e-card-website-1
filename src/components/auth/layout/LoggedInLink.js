import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../../store/actions/authAction'

const LoggedInLink = (props) => {
    return(
        <ul className="right">
            <li><NavLink to='/create'>Create Profile</NavLink></li>
            <li><a onClick={props.logout} to='/'>Log Out</a></li>
            <li><NavLink to='/' className='btn btn-floating pink lighten-1'>NN</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(LoggedInLink)