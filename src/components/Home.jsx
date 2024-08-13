import React, { useState } from 'react';
import Navbar2 from './Navbar2';
import { Outlet } from 'react-router-dom';
import Today from './Today';

const Home = () => {
  const [activeButton, setActiveButton] = useState('Today');

  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName);
  };

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
      <div className='pt-10 px-4 flex items-center'>
        <h2 className='text-3xl font-semibold mr-4'>Trending</h2>

        <div className='border-2 border-black text-black bg-white rounded-full flex items-center'>
          <button
            style={activeButton === 'Today' ? selectedStyle : defaultStyle}
            className={`group px-4 py-2 transition-colors duration-300 ease-in-out rounded-full`}
            onClick={() => handleButtonClick('Today')}
          >
            <span style={activeButton === 'Today' ? gradientText : {}}>
              Today
            </span>
          </button>
          <button
            style={activeButton === 'This Week' ? selectedStyle : defaultStyle}
            className={`group px-4 py-2 ml-4 transition-colors duration-300 ease-in-out rounded-full`}
            onClick={() => handleButtonClick('This Week')}
          >
            <span style={activeButton === 'This Week' ? gradientText : {}}>
              This Week
            </span>
          </button>
        </div>
      </div>
      <Outlet />
      <Today />
    </div>
  );
}

export default Home;

