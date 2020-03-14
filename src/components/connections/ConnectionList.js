import React from 'react'
import Connection from './Connection'
import {Link} from 'react-router-dom'
const ConnectionList = ({profiles}) =>{     // list of connection from the database
    return(
        <div className="connection-list section">
            {profiles && profiles.map(profile => {             // map the profiles object to the profile object from Connection.js
                                                                // ID of the profile will be ID in the firestore document ID
                return(
                    <Link to={'/project/'+ profile.id} key={profile.id}>        
                        <Connection profile={profile} />
                    </Link>
                )
            })}
        </div>
    )
}

export default ConnectionList