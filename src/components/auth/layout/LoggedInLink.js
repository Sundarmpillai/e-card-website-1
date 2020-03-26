import React from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../../store/actions/authAction'
import UserProfile from '../../profile/UserProfile'

const LoggedInLink = (props) => {
    return(
        <ul className="right">
            <li><NavLink to='/create'>Create Profile</NavLink></li>
            <li><a onClick={props.logout} to='/'>Log Out</a></li>
            <li><NavLink to='/profile' className='btn-floating pink lighten-1 center'>
                {props.profile.fN}
                <UserProfile profile={props.profile} />
                </NavLink>
            </li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

export default connect(null,mapDispatchToProps)(LoggedInLink)