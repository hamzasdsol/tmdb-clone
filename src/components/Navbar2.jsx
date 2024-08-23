import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Navbar2 = () => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRandomImage = async () => {
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
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

  const handleSearchClick = () => {
    navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
  };

  return (
    <div className='relative w-full h-[400px] md:h-[500px] overflow-hidden'>
      <img
        src={backgroundImage}
        alt="Background"
        className='absolute inset-0 w-full h-full object-cover'
        style={{ 
          filter: 'brightness(50%) contrast(80%)', 
          objectPosition: 'center center',
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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearchClick}
            className='absolute right-0 top-0 bottom-0 px-4 md:px-6 text-white rounded-full transition-colors duration-300 ease-in-out hover:text-black'
            style={{ background: 'linear-gradient(78deg, #17ead9, #6078ea)', height: '100%', lineHeight: '2.5rem' }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar2;
