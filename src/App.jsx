import React from 'react'

import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'



const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      
      </Routes>
    </div>
  )
}

export default App
