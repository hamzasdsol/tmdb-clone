import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Banner from './components/Banner';
import Signup from './components/Signup';
import Login from './components/Login';
import People from './components/People';
import Detailpage from './components/pages/Detailpage';
import Today from './components/Today';
import TrendingDetail from './components/pages/TrendingDetail';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/people" element={<People />} />
        <Route path="/people/:id" element={<Detailpage />} />
        <Route path="/today" element={<Today />} />
        <Route path="/details/:id" element={<TrendingDetail />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
