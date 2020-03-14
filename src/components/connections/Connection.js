import React from 'react'

const Connection =({profile}) =>{           //set the profile prop object values
    return(
        <div className="project-list section">      
            <div className="card z-depth-0 project-summary">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{profile.fN}</span>      {/*set profile user name   (the name of the accessor must be same as the field name of the database)*/}
                    <p>{profile.cmp}</p>                                  {/*set profile user company (the name of the accessor must be same as the field name of the database)*/}
                </div>
            </div>
        </div>
    )
}

export default Connection
    
