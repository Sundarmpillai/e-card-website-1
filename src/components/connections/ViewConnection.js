import React from 'react'

const ViewConnection = (props) => {
    const id = props.match.params.id
    return(
        <div className="container section project-details">
            <div className="card z-depth-0">
                <div className="card-content">
                    <span className="card-title">Connection-{id} Name</span>
                    <p>Other Information to be Displayed Soon </p>
                </div>
            </div>
        </div>
    )
}

export default ViewConnection