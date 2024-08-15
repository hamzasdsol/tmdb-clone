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
      <div className='pt-10 px-4 flex items-center'>
        <h2 className='text-3xl font-semibold mr-4'>Trending</h2>

        <div className='border-2 border-black text-black bg-white rounded-full flex items-center'>
          <button
            style={activeTrendingButton === 'Today' ? selectedStyle : defaultStyle}
            className={`group px-11 py-1 transition-colors duration-300 ease-in-out rounded-full text-sm`}
            onClick={() => setActiveTrendingButton('Today')}
          >
            <span style={activeTrendingButton === 'Today' ? gradientText : {}}>
              Today
            </span>
          </button>
          <button
            style={activeTrendingButton === 'This Week' ? selectedStyle : defaultStyle}
            className={`group px-2 py-1 ml-4 transition-colors duration-300 ease-in-out rounded-full text-sm`}
            onClick={() => setActiveTrendingButton('This Week')}
          >
            <span style={activeTrendingButton === 'This Week' ? gradientText : {}}>
              This Week
            </span>
          </button>
        </div>
      </div>
      <Outlet />
      <Today />
      <div className="mt-10">
        <TrailorSlider />
        <div className='pt-8 -mt-2 px-4 flex items-center'>
  <h2 className='text-3xl font-semibold mr-4'>What's Popular</h2>

  <div className='border-2 border-black text-black bg-white rounded-full flex items-center'>
    <button
      style={activePopularButton === 'Streaming' ? selectedStyle : defaultStyle}
      className={`group px-2 py-1 transition-colors duration-300 ease-in-out rounded-full text-sm`}
      onClick={() => setActivePopularButton('Streaming')}
    >
      <span style={activePopularButton === 'Streaming' ? gradientText : {}}>
        Streaming
      </span>
    </button>
    <button
      style={activePopularButton === 'On TV' ? selectedStyle : defaultStyle}
      className={`group px-2 py-1 ml-4 transition-colors duration-300 ease-in-out rounded-full text-sm`}
      onClick={() => setActivePopularButton('On TV')}
    >
      <span style={activePopularButton === 'On TV' ? gradientText : {}}>
        On TV
      </span>
    </button>
    <button
      style={activePopularButton === 'For Rent' ? selectedStyle : defaultStyle}
      className={`group px-2 py-1 ml-4 transition-colors duration-300 ease-in-out rounded-full text-sm`}
      onClick={() => setActivePopularButton('For Rent')}
    >
      <span style={activePopularButton === 'For Rent' ? gradientText : {}}>
        For Rent
      </span>
    </button>
    <button
      style={activePopularButton === 'In Theaters' ? selectedStyle : defaultStyle}
      className={`group px-2 py-1 ml-4 transition-colors duration-300 ease-in-out rounded-full text-sm`}
      onClick={() => setActivePopularButton('In Theaters')}
    >
      <span style={activePopularButton === 'In Theaters' ? gradientText : {}}>
        In Theaters
      </span>
    </button>
  </div>
</div>

        <Popular/>
        <div className='pt-10 px-4 flex items-center'>
          <h2 className='text-3xl font-semibold mr-4'>Free to Watch</h2>

          <div className='border-2 border-black text-black bg-white rounded-full flex items-center'>
            <button
              style={activeFreeToWatchButton === 'Movies' ? selectedStyle : defaultStyle}
              className={`group px-8 py-1 transition-colors duration-300 ease-in-out rounded-full text-sm`}
              onClick={() => setActiveFreeToWatchButton('Movies')}
            >
              <span style={activeFreeToWatchButton === 'Movies' ? gradientText : {}}>
                Movies
              </span>
            </button>
            <button
              style={activeFreeToWatchButton === 'TV' ? selectedStyle : defaultStyle}
              className={`group px-4 py-1 ml-4 transition-colors duration-300 ease-in-out rounded-full text-sm`}
              onClick={() => setActiveFreeToWatchButton('TV')}
            >
              <span style={activeFreeToWatchButton === 'TV' ? gradientText : {}}>
                TV
              </span>
            </button>
          </div>
        </div>
        <FreeWatch/>
        <Banner/>
        <Progressbar/>
      </div>
     
    </div>
  );
}

export default Home;
