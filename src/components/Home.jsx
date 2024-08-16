import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import { Outlet } from 'react-router-dom';
import Today from './Today';
import TrailorSlider from './TrailorSlider';
import Popular from './Popular';
import FreeWatch from './FreeWatch';
import Banner from './Banner';
import Progressbar from './Progressbar';


const Home = () => {
  // Separate states for each group of buttons
  const [activeTrendingButton, setActiveTrendingButton] = useState('Today');
  const [activePopularButton, setActivePopularButton] = useState('Streaming');
  const [activeFreeToWatchButton, setActiveFreeToWatchButton] = useState('Movies');

  const selectedStyle = {
    backgroundColor: 'rgb(3, 37, 65)',
    color: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  };

  const gradientText = {
    position: 'relative',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    backgroundImage: 'linear-gradient(45deg, #17ead9, #6078ea)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const defaultStyle = {
    backgroundColor: 'white',
    color: 'black',
  };

  return (
    <div className='lg:mx-110px'>
      <Navbar2 />
      
      <Outlet />
      <Today />
      <div className="mt-10">
        <TrailorSlider />
     

        <Popular/>
       
        <FreeWatch/>
        <Banner/>
        <Progressbar/>
      </div>
     
    </div>
  );
}

export default Home;
