import React from 'react'
import {Link} from 'react-router-dom'
import LoggedInLink from './LoggedInLink'
import LoggedOutLink from './LoggedOutLink'

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

export default Navbar