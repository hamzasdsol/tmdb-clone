import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar2 = () => {
  const [backgroundImage, setBackgroundImage] = useState('');

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const apiKey = '1332e02a7aa536736b2d35a49363d0ce'; // Replace with your TMDb API key
        const response = await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${apiKey}`);
        const randomIndex = Math.floor(Math.random() * response.data.results.length);
        const randomImage = response.data.results[randomIndex].backdrop_path;
        setBackgroundImage(`https://image.tmdb.org/t/p/original${randomImage}`);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchRandomImage();
  }, []);

  const doubleColor = {
    background: 'linear-gradient(78deg, #17ead9, #6078ea)', // Gradient background
  };

  return (
    <div className='relative w-full h-[400px] overflow-hidden'>
      <img
        src={backgroundImage}
        alt="Background"
        className='absolute inset-0 w-full h-full object-cover'
        style={{ 
          filter: 'brightness(50%) contrast(80%)', 
          objectPosition: 'center center', // Center the image
          transition: 'opacity 1s'
        }}
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



