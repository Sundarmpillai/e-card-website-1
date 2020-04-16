import React, { Profiler , Component} from 'react'
import {connect} from 'react-redux'
import {firestoreConnect} from 'react-redux-firebase'
import {compose} from 'redux'
import {Redirect} from 'react-router-dom'
import firebase from 'firebase';
import {updateProfile} from '../../store/actions/updateProfile'


class UserProfile extends Component {
    state = {
        fN : this.props.userProfile.fN,
        lN : this.props.userProfile.lN,
        cmp: this.props.userProfile.cmp,
        adr: this.props.userProfile.adr,
        pNo: this.props.userProfile.pNo,
        wNo: this.props.userProfile.wNo,
        pos: this.props.userProfile.pos,
        eM: this.props.userProfile.eM,
        pPic:this.props.userProfile.pPic,
        front:this.props.userProfile.front,
        back:this.props.userProfile.back,
        status:false
    }
    handelChange = (e) => {
        this.setState({
            [e.target.id]:e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateProfile(this.state);
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
        const {auth,userProfile} = this.props;
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
                                            <div className="input-field">
                                                <i className="small material-icons inline prefix" style={{float:'left'}}>phone_android</i>                         
                                                <input type='text'value={this.state.pNo || 'Personal Number'} id='pNo' onChange ={this.handelChange}/>
                                            </div>
                                            <div className="input-field">
                                                <i className="small material-icons inline prefix" style={{float:'left'}}>phone</i>
                                                <input type='text'value={this.state.wNo || 'Work Number'} id='wNo' onChange ={this.handelChange}/>
                                            </div>
                                            <div className="input-field">
                                                <i className="small material-icons inline prefix" style={{float:'left'}}>location_city</i>
                                                <input type='text'value={this.state.adr || 'Address'} id='adr' onChange ={this.handelChange}/>
                                            </div>
                                            <div className="input-filed">
                                                <button className="btn pink lighten-1 z-depth-0">Update</button>
                                            </div>
                                        </div>
                                        <div style={{float:'right',backgroundColor:'#D3D3D3'}}>
                                            <img className='card-view' src={this.state.front} style={{display:'block'}} />
                                            <img className='card-view' src={this.state.back} />
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

const mapStateToProps = (state) => { //for id receive from selecting an item from the list     
    return{
        auth: state.firebase.auth,
        userProfile:state.firebase.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfile: (profile) => dispatch(updateProfile(profile))
    }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect([
        {collection:'user'}
    ])
)(UserProfile)