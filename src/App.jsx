import React from 'react'

import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'



const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
     
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
