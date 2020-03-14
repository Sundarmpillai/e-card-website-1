import React from 'react'
import {Link} from 'react-router-dom'
import LoggedInLink from './LoggedInLink'
import LoggedOutLink from './LoggedOutLink'
import {connect} from 'react-redux'

const Navbar = () => {
    return(
        <nav className="nav-wrapper grey darken-3">
            <div className="container">
                <Link to='/' className="brand-logo">E-Card</Link>
                <LoggedInLink />
                <LoggedOutLink />
            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    console.log(state);
    return{
        
    }
}

export default connect(mapStateToProps)(Navbar)