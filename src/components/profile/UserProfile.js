import React, { Profiler } from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

const UserProfile = (props) => {
    console.log(props.profile);
    const {auth,userProfile} = props;
    if(!auth.uid) return <Redirect to= '/login'/>   
                        
    if(userProfile){       //getting the conn_profile property from the props and Initializing it
        var profilePic;
        if(userProfile.pPic == null){
            profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        }else{
            profilePic = userProfile.pPic;
        }     
        return(
            <div className="container section">
                <div className="card">
                        <div className="card-content">
                                <img className='circular_view' src= {profilePic} width="20%" height="20%"/>
                                <span className="card-title">Name - {userProfile.fN} {userProfile.lN}</span>
                                <div  className=" card-small" style={{display:'inline-block'}}>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>work</i>
                                        <p>Company - {userProfile.cmp}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>person_pin</i>
                                        <p>Position - {userProfile.pos}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>mail</i>
                                        <p>Email - {userProfile.eM} </p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>phone_android</i>
                                        <p>Personal Number - {userProfile.pNo}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>phone</i>
                                        <p>Work Number - {userProfile.wNo}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>location_city</i>
                                        <p>Address - {userProfile.adr}</p>
                                    </div>
                                </div>
                                <div style={{float:'right',backgroundColor:'#D3D3D3'}}>
                                    <img className='card-view' src={userProfile.front} style={{display:'block'}} />
                                    <img className='card-view' src={userProfile.back} />
                                </div>
                        </div>
                    </div>
                </div>
        )
    }else{
        return(
            <div className= "container center">
                <p>Loading Profile...</p>
            </div>
        )
    }
}

const mapStateToProps = (state) => { //for id receive from selecting an item from the list     
    return{
        auth: state.firebase.auth,
        userProfile:state.firebase.profile
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(UserProfile)