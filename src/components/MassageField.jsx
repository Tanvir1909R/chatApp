import React from 'react'
import Moment from 'react-moment'

function MassageField( {msg} ) {
  return <div className='massage_wrapper'>
        <p>
            { msg.media ? <img src={msg.media} alt='uploadImg'/> : null }
            { msg.text }
            <br />
            <small>
                <Moment fromNow={msg.massageAt.toDate()} ></Moment>
            </small>
        </p>
    </div>
}

export default MassageField