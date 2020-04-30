import React, { Profiler } from 'react'
import {Link} from 'react-router-dom'
import LoggedInLink from './LoggedInLink'
import LoggedOutLink from './LoggedOutLink'
import {connect} from 'react-redux'
import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import {makeStyles} from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({  
    root: {
        flexGrow: 1,
    },

    title: {
        flex: 1,
        fontSize: 32,
        fontFamily: 'Sans-Serif',
        flexGrow: 1,
    },

}));

const Navbar = (props) => {
    const classes = useStyles();
    const {auth, profile} = props;
    const links = auth.uid ? <LoggedInLink profile={profile}/> : <LoggedOutLink/>
    return (
        <div className={classes.root}>
            <AppBar color='inherit' position='static'>
                <Toolbar variant="dense">
                <Typography variant="h4" className={classes.title}>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        E-Card Website
                    </Link>
                </Typography>
                    {links} 
                </Toolbar>
            </AppBar>
        </div>
    );
}

const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth,
        profile:state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar)