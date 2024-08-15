import React from 'react';

const Banner = () => {
  return (
    <div
      style={{
        backgroundImage: 'url("src/assets/images/lMnoYqPIAVL0YaLP5YjRy7iwaYv.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '350px',
        width: '100%',
        position: 'relative',
      }}
      className='mb-7 mt-8 flex items-start'
    >
      <div
        className="p-6 absolute top-10 left-8" // Adjust the `left` value for padding from the left
      >
        <h1 className="text-white text-4xl font-bold mb-4 pl-4">
          Join Today
        </h1>
        <p className="text-white text-2xl mb-4 mt-7 font-semibold pl-4">
          Get access to maintain your own <i className='text-gray-500'>personal lists, track what you've seen and search and filter for what to watch next—</i> regardless if it's in theatres, on TV or available on popular streaming services like Netflix, Amazon Prime Video, Zee5, Sun Nxt, and MUBI.
        </p>
        <button className="bg-[#C8A1E0] mt-4 text-white text-2xl py-2 px-4 rounded font-semibold">
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Banner;
