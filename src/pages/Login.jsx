import React, { useState } from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {doc , updateDoc} from 'firebase/firestore'
import { auth, db} from '../firebase'
import { useNavigate } from 'react-router-dom'

function Login() {
    const [data , setData] = useState({
        email:'',
        password:'',
        error:false,
    })
    const { email, password, error,} = data
    const navigat = useNavigate()
    const hendleChange = (e)=>{
        setData({...data ,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setData({...data})
        if( !password && !email){
            setData({...data , error:true})
        }
        try {
            const result = await signInWithEmailAndPassword(auth,email,password);
            await updateDoc(doc(db,'users', result.user.uid),{
                isOnline: true
            })
            setData({email:'',password:''})
        } catch (err) {
            console.log(err);
        }
        navigat('/')
        console.log(data);
    }
  return (
    <section className='register'>
        <h3>Log In Your Account</h3>
        <form className='form' onSubmit={handleSubmit}>
            <div className="input_Wrapper">
                <label htmlFor="email">Email</label>
                <input type="email" name='email' value={email} onChange={hendleChange}/>
            </div>
            <div className="input_Wrapper">
                <label htmlFor="password">Password</label>
                <input type="password" name='password' value={password} onChange={hendleChange}/>
            </div>
            {error ? <p className='error'> data required </p> : false}
            <div className="resigter_btn">
                <button className='btn'>Login</button>
            </div>
        </form>
    </section>
  )
}

export default Login