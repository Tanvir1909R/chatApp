import React,{useContext} from 'react'
import {AuthContext} from '../context/auth'
import { Route, useNavigate } from 'react-router-dom'
const PrivateRoute = ({component:Component, ...rest}) => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()
  return <Route {...rest}  element={({props})=> user ? <Component {...props} /> : navigate('/login')}
  />
}

export default PrivateRoute