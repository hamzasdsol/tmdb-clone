import React from 'react';
import image from '../assets/images/18wozP6NjPSNBSgCga5bN7yUSzl.jpg'; 

const Navbar2 = () => {
  const doubleColor = {
    background: 'linear-gradient(78deg, #17ead9, #6078ea)', // Gradient background
  };

  return (
    <div className='relative'>
      <img
        src={image}
        alt="Description"
        className='w-full h-auto'
        style={{ filter: 'brightness(50%) contrast(80%)' }} 
      />
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-center px-4 md:px-8 w-full md:w-[80vw]'>
        <h1 className='text-2xl md:text-4xl font-bold text-left mb-1'>Welcome.</h1>
        <p className='text-lg md:text-2xl text-left font-semibold whitespace-nowrap overflow-hidden text-ellipsis'>
          Millions of movies, TV shows, and people to discover. Explore now.
        </p>

        <div className='mt-8 relative text-base text-gray-600'>
          <input
            type='text'
            placeholder='Search for a Movie, TV Show, Person...'
            className='p-3 w-full md:p-4 bg-white text-gray-900 rounded-full text-base pr-24'
          />
          <button
            className='absolute right-0 top-0 bottom-0 px-4 md:px-6 text-white rounded-full transition-colors duration-300 ease-in-out hover:text-black'
            style={{ ...doubleColor, height: '100%', lineHeight: '2.5rem' }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
