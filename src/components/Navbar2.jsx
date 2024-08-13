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
      <div className='absolute top-10 left-20 right-20 text-white w-[80vw]'> 
      <h1 className='text-4xl font-bold pt-10'>Welcome.</h1>
<p className='text-4xl font-semibold whitespace-nowrap overflow-hidden text-ellipsis mt-0'>
  Millions of movies, TV shows, and people to discover. Explore now.
</p>

        <div className='mt-11 relative  text-1xl text-gray-600'>
          <input
            type='text'
            placeholder='Search for a Movie, TV Show, Person...'
            className='p-4 w-full bg-white text-gray-900 rounded-full text-1xl pr-24' // Increased padding to increase height
            style={{ paddingLeft: '1rem' }}
          />
          <button
            className='absolute right-0 top-0 bottom-0 px-6 text-white rounded-full transition-colors duration-300 ease-in-out hover:text-black'
            style={{ ...doubleColor, height: '100%', lineHeight: '2.5rem' }} // Ensure button covers full height
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
