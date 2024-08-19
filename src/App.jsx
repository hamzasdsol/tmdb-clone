import React from 'react'

import Home from './components/Home'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Banner from './components/Banner'
import Signup from './components/Signup'
import Login from './components/Login'



const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/" element={<Banner />} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
