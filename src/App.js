import React from 'react'
import {Route , Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/' element={ <Home /> }/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
