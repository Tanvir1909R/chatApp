import React from 'react'
import {Route , Routes} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './pages/Home';
import Register from './pages/Register'

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route exact path='/' element={ <Home /> }/>
        <Route exact path='/register' element={<Register/>}/>
      </Routes>
    </>
  )
}

export default App
