import React from 'react'
import {NavLink} from 'react-router-dom'
import {List, Button} from '@material-ui/core';

const LoggedOutLink = () => {
    return(
        <List className="right">
            <List><Button color="inherit"><NavLink to='/register' color="inherit" style={{ textDecoration: 'none' }}>Sign Up</NavLink></Button><Button color="inherit"><NavLink to='/login' style={{ textDecoration: 'none' }}>Login</NavLink></Button></List>
        </List>
    )
}

export default LoggedOutLink