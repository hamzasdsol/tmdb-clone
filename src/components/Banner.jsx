import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div
      style={{
        backgroundImage: 'url("src/assets/images/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        width: '100%',
        position: 'relative',
      }}
      className='flex items-center justify-center mb-10 w-full min-h-[600px] sm:min-h-[410px] md:min-h-[280px]'
    >
      <div
        className="p-6 absolute top-10 left-8 sm:top-6 sm:left-4"
      >
        <h1 className="text-white text-4xl font-bold mb-4 pl-4 sm:text-2xl sm:pl-2">
          Join Today
        </h1>
        <p className="text-white text-2xl mb-4 mt-7 font-semibold pl-4 sm:text-lg sm:pl-2">
          Get access to maintain your own <i className='text-gray-500'>personal lists, track what you've seen and search and filter for what to watch next—</i> regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, Zee5, Sun Nxt, and MUBI.
        </p>
        <button
          className="bg-[#C8A1E0] mt-4 text-white text-2xl py-2 px-4 rounded font-semibold sm:text-lg sm:py-1.5 sm:px-3"
          onClick={handleSignUpClick}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Banner;
