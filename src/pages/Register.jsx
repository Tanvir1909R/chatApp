import React, { useState } from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {doc , setDoc, Timestamp} from 'firebase/firestore'
import { auth, db} from '../firebase'
import { useNavigate } from 'react-router-dom'

function Register() {
    const [data , setData] = useState({
        name:'',
        email:'',
        password:'',
        error:false,
        loding:false
    })
    const {name, email, password, error,} = data
    const navigat = useNavigate()
    const hendleChange = (e)=>{
        setData({...data ,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault();
        setData({...data})
        if(!name && !password && !email){
            setData({...data , error:true})
        }
        try {
            const result = await createUserWithEmailAndPassword(auth,email,password);
            await setDoc(doc(db,'users', result.user.uid),{
                uid:result.user.uid,
                name,
                email,
                password,
                createAt: Timestamp.fromDate(new Date()),
                isOnline: true
            })
            setData({name:'',email:'',password:''})
        } catch (err) {
            console.log(err);
        }
        navigat('/')
        console.log(data);
    }
  return (
    <section className='register'>
        <h3>Create An Account</h3>
        <form className='form' onSubmit={handleSubmit}>
            <div className="input_Wrapper">
                <label htmlFor="name">Name</label>
                <input type="text" name='name' value={name} onChange={hendleChange} />
            </div>
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
                <button className='btn'>Register</button>
            </div>
        </form>
    </section>
  )
}

export default Register