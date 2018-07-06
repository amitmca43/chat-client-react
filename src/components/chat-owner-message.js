import React from 'react'

function OwnerMessage(props) {  
    return (
        <div className="message">            
            <div className="message-owner-text">{props.text}</div>
        </div>
    )
}

export default OwnerMessage