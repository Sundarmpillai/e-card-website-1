import React, { Component } from 'react'
import {connect} from 'react-redux'
import rootReducer from '../../store/reducer/rootReducer'
import {firestoreConnect} from 'react-redux-firebase'
import {compose, createStore} from 'redux'
import {Redirect} from 'react-router-dom'
import {updateConnection} from '../../store/actions/updateProfile'
import firebase from 'firebase';


class ViewConnection extends Component {
    state = {
        fN : this.props.conn_profile.fN,
        lN : this.props.conn_profile.lN,
        cmp: this.props.conn_profile.cmp,
        adr: this.props.conn_profile.adr,
        pNo: this.props.conn_profile.pNo,
        wNo: this.props.conn_profile.wNo,
        pos: this.props.conn_profile.pos,
        eM: this.props.conn_profile.eM,
        pPic:this.props.conn_profile.pPic,
        front:this.props.conn_profile.front,
        back:this.props.conn_profile.back
    }

    handelChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        var uid = this.props.match.params.id;
        this.props.updateConnection(this.state,uid);
    }

    onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                pPic: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    frontView = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                front: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    backView = (event) => {
        if (event.target.files && event.target.files[0]) {
            this.setState({
                back: URL.createObjectURL(event.target.files[0])
            });
        }
    }

    fileUploadHandler = (e) => {
        const ref = firebase.storage().ref();
        const file = document.getElementById('pPic').files[0]
        try{
            const name = (new Date()) + '-' + file.name;
            const metadata = {
                contentType: file.type
            };
            const task = ref.child(name).put(file, metadata);
            task
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then((url) => {
                this.setState({
                pPic: url
                })
            })
            .catch(console.error);
        }catch (err){
           console.log(0);
        }
    }

    render(){
        const {conn_profile, auth} = this.props;
        if(!auth.uid) return <Redirect to= '/login'/>   
                            
        if(false){       //getting the conn_profile property from the props and Initializing it
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
                    </div>
                </div>
            </div>
            )
        }else if(true){
            var profilePic;
            if(conn_profile.pPic == null){
                profilePic = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
            }else{
                profilePic = conn_profile.pPic;
            }   
            return(
                <div className="container section">
                    <form onSubmit = {this.handleSubmit} className="white">
                        <div className="card">
                            <div className="card-content">
                                <img className='circular_view' src= {profilePic} width="20%" height="20%"/>
                                <span className="card-title">Name - {this.state.fN} {this.state.lN}</span>
                                <div  className=" card-small" style={{display:'inline-block'}}>
                                    <div className="input-field">
                                        <i className="small material-icons inline prefix" style={{float:'left'}}>work</i>
                                        <input type='text'value={this.state.cmp || 'Company'} id='cmp' onChange ={this.handelChange}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="small material-icons inline prefix" style={{float:'left'}}>person_pin</i>
                                        <input type='text'value={this.state.pos || 'Position'} id='pos' onChange ={this.handelChange}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="small material-icons inline prefix" style={{float:'left'}}>mail</i>
                                        <input type='text'value={this.state.eM || 'E-Mail'} id='eM' onChange ={this.handelChange}/>
                                    </div>
                                    <div className="input-field" style={{whiteSpace:'nowrap'}}>
                                        <i className="small material-icons inline prefix" style={{float:'left'}}>phone_android</i>                         
                                        <input type='text'value={this.state.pNo || 'Personal Number'} id='pN' onChange ={this.handelChange}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="small material-icons inline prefix" style={{float:'left'}}>phone</i>
                                        <input type='text'value={this.state.wNo || 'Work Number'} id='wNo' onChange ={this.handelChange}/>
                                    </div>
                                    <div className="input-field">
                                        <i className="small material-icons inline prefix" style={{float:'left'}}>location_city</i>
                                        <input type='text'value={this.state.adr || 'Address'} id='adr' onChange ={this.handelChange}/>
                                    </div>
                                </div>
                                <div style={{float:'right',backgroundColor:'#D3D3D3'}}>
                                    <img className='card-view' src={this.state.front} style={{display:'block'}} />
                                    <img className='card-view' src={this.state.back} />
                                </div>
                                <div className="input-filed" style={{clear:'left'}}>
                                    <button className="btn pink lighten-1 z-depth-0">Update</button>
                                    <button className="btn pink lighten-1 z-depth-0" style={{margin:10}}>Delete</button>
                                </div>
                            </div>
                        </div>
                    </form>
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
}

var value = true;

const mapStateToProps = (state, ownProps) => { //for id receive from selecting an item from the list
    const id = ownProps.match.params.id         
    const profiles = state.firestore.data.user;     // check with the id values of the documents in the firestore 
    const profile = profiles ? profiles[id]:null    // and when the value has a match pass that document as an object
    return{
        conn_profile: profile,
        auth: state.firebase.auth,
        status:value
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateConnection: (profile,id) => dispatch(updateConnection(profile,id))
    }
}

// function saveToLocalStorage(state){
//     try{
//         const serializedState = JSON.stringify(state)
//         localStorage.setItem('state',serializedState)
//     }catch(e){
//         console.log(e);
//     }
// }

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(ViewConnection)