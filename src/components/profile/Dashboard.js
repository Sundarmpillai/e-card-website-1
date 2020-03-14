import React, {Component} from 'react'
import Notification from './Notification'
import ConnectionList from '../connections/ConnectionList'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'

class Dashboard extends Component{
    render(){
        // console.log(this.props);
        const {profiles} = this.props;
        return(
            <div className="container">
                <div className="dashboard container">
                    <div className ="row">
                        <div className="col s12 m6">
                            <ConnectionList profiles= {profiles}/>   {/* Display the list of connection the user has */}
                        </div>
                        <div className="col s12 m5 offset-m1">
                            <Notification />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

//variable name must be same when passing props to the nested component and mapping stateProps
const mapStateToProps = (state) => {
    return{
        profiles: state.firestore.ordered.user // get the  list of user from the
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(Dashboard)