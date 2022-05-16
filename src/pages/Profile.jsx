import React, { useState } from 'react'
import Camra from '../svg/Camra'

function Profile() {
    const [img, setImg] = useState('');
    console.log(img);
  return (
    <section className='profile'> 
        <div className="profile_wrapper">
            <div className="user_img">
                <img src="./img/profile.jpg" alt="" />
                <div className="overlay">
                    <div>
                        <label htmlFor="photo">
                            <Camra />
                        </label>
                        <input type="file" accept='image/*' id='photo' style={{display:'none'}} onChange={e=> setImg(e.target.files[0])} />
                    </div>
                </div>
            </div>
            <div className="user_dec">
                <h3>User Name</h3>
                <p>User Email</p>
                <hr />
                <small>Joined On: ...</small>
            </div>
        </div>
    </section>
  )
}

export default Profile