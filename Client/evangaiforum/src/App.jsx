import React from 'react'
import LnadingLayout from './pages/LnadingLayout'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<LnadingLayout/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
     
   
    </div>

  )
}

export default App