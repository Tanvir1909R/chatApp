import React from 'react'
import Attach from '../svg/Attach'

function Massage() {
  return (
    <form className='massage_form'>
        <label htmlFor="img"> <Attach /> </label>
        <input type="file" accept='image/*' id='img' style={{display:'none'}} />
        <div>
            <input type="text" placeholder='Enter Massage' />
        </div>
        <div>
            <button className='btn'> Send </button>
        </div>
    </form>
  )
}

export default Massage