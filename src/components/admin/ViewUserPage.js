import React from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'

const ViewConnection = (props) => {
    const {conn_profile, auth} = props;
    if(!auth.uid) return <Redirect to= '/login'/>   
                        
    if(conn_profile){       //getting the conn_profile property from the props and Initializing it
        var profilePic;
        if(conn_profile.pPic == null){
            profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
        }else{
            profilePic = conn_profile.pPic;
        }     
        return(    
            <div className="container section">
                <div className="card">
                    <div className="card-content">
                        <img className='circular_view' src= {profilePic} width="20%" height="20%"/>
                        <span className="card-title">Name - {conn_profile.fN} {conn_profile.lN}</span>
                                <div  className=" card-small" style={{display:'inline-block'}}>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>work</i>
                                        <p>Company - {conn_profile.cmp}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>person_pin</i>
                                        <p>Position - {conn_profile.pos}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>mail</i>
                                        <p>Email - {conn_profile.eM} </p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>phone_android</i>
                                        <p>Personal Number - {conn_profile.pNo}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>phone</i>
                                        <p>Work Number - {conn_profile.wNo}</p>
                                    </div>
                                    <div className="card-content">
                                        <i className="small material-icons inline" style={{float:'left'}}>location_city</i>
                                        <p>Address - {conn_profile.adr}</p>
                                    </div>
                                </div>
                                <div style={{float:'right',backgroundColor:'#D3D3D3'}}>
                                    <img className='card-view' src={conn_profile.front} style={{display:'block'}} />
                                    <img className='card-view' src={conn_profile.back} />
                                </div>
                                <div>
                                    <button className="btn pink lighten-1 z-depth-0">Edit</button>    
                                    <button className="btn pink lighten-1 z-depth-0">Delete</button>
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

const mapStateToProps = (state, ownProps) => { //for id receive from selecting an item from the list
    const id = ownProps.match.params.id         
    const profiles = state.firestore.data.user;     // check with the id values of the documents in the firestore 
    const profile = profiles ? profiles[id]:null    // and when the value has a match pass that document as an object
    console.log(profile);
    return{
        conn_profile: profile,
        auth: state.firebase.auth
    }
}

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(ViewConnection)