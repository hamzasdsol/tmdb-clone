import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import enImage from '../assets/images/en.PNG'; // Adjust the path according to the location of Navbar.jsx
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const Navbar = () => {
  const isSmallScreen = useMediaQuery({ maxWidth: '1030px' });
  const [dropdown, setDropdown] = useState({ movies: false, tvShows: false, people: false, more: false });
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleMouseEnter = (category) => {
    setDropdown(prevState => ({ ...prevState, [category]: true }));
  };

  const handleMouseLeave = (category) => {
    setDropdown(prevState => ({ ...prevState, [category]: false }));
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <header className="text-gray-600 body-font" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
      {!isSmallScreen && (
        <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="#">
            <Link to="/">
              <img className="h-6 mr-auto" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="Logo" />
            </Link>
          </a>
          <nav className="flex flex-wrap items-center text-base text-white justify-center md:ml-5">
            {['movies', 'tvShows', 'people', 'more'].map((category) => (
              <div
                key={category}
                className="relative"
                onMouseEnter={() => handleMouseEnter(category)}
                onMouseLeave={() => handleMouseLeave(category)}
              >
                <button className="mr-5 cursor-pointer text-lg font-semibold ml-4 text-white">
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
                {dropdown[category] && (
                  <div className="absolute top-full left-0 bg-white text-black border border-gray-300 shadow-lg rounded-lg w-48 z-50">
                    {category === 'movies' && (
                      <>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/movies/action">Popular</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/movies/drama">Now Playing</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/movies/comedy">Upcoming</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/movies/horror">Top Rated</a>
                      </>
                    )}
                    {category === 'tvShows' && (
                      <>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/tv-shows/drama">Popular</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/tv-shows/comedy">On TV</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/tv-shows/thriller">Airing Today</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/tv-shows/sci-fi">Top Rated</a>
                      </>
                    )}
                    {category === 'people' && (
                      <>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/people">Popular People</a>
                      </>
                    )}
                    {category === 'more' && (
                      <>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/settings">Discussions</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/help">Leaderboard</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/about">Support</a>
                        <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/contact">Api</a>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex items-center md:ml-auto">
            <FaPlus className="text-white cursor-pointer mx-4 text-2xl" />
            <img src={enImage} className="text-white cursor-pointer mx-1" alt="My Image" />
            <Link to='/login'>
              <h1 className="text-white cursor-pointer text-lg text-2xl font-semibold mx-4">Login</h1>
            </Link>
            <Link to='/signup'>
              <h1 className="text-white cursor-pointer text-lg font-semibold mx-4">Join TMDB</h1>
            </Link>
            <FaSearch className="cursor-pointer text-2xl font-semibold" style={{ color: '#028391', marginLeft: '0.5rem' }} />
          </div>
        </div>
      )}

      {isSmallScreen && (
        <>
          {/* Drawer */}
          <div className={`fixed inset-y-0 left-0 bg-gray-800 text-white p-4 w-64 z-50 transform transition-transform duration-300 ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <div className="text-2xl cursor-pointer" onClick={closeDrawer}>
              ×
            </div>
            <div className="flex flex-col mt-4">
              <a to="/" className="py-2 px-4 mt-4 text-2xl font-bold">Movies</a>
              <a to="/" className="py-2 px-4 text-2xl mt-3 font-bold">TV Shows</a>
              <Link to="/people" className="py-2 px-4 text-2xl font-bold mt-3">People</Link>
              <a to="/" className="py-2 px-4 text-lg font-semibold mt-5">Contribution Bible</a>
              <a to="/" className="py-2 px-4 text-lg font-semibold mt-1">Discussions</a>
              <a to="/" className="py-2 px-4 text-lg font-semibold mt-1">Leaderboard</a>
              <a to="/" className="py-2 px-4 text-lg font-semibold mt-1">API</a>
              <a to="/" className="py-2 px-4 text-lg font-semibold mt-1">Support</a>
              <a to="/" className="py-2 px-4 text-lg font-semibold mt-1">About</a>
              <a to="/login" className="py-2 px-4 text-lg font-semibold mt-1">Login</a>
              
            </div>
          </div>

          {/* Top bar for small screens */}
          <div className="flex items-center justify-between p-4 bg-gray-800 text-white" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
            <div className="text-2xl cursor-pointer" onClick={toggleDrawer}>
              ☰
            </div>
            <div className="flex-1 flex justify-center">
              <img 
                src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_square_2-d537fb228cf3ded904ef09b136fe3fec72548ebc1fea3fbbd1ad9e36364db38b.svg" 
                alt="Logo" 
                className="max-h-10"
              />
            </div>
            {!isDrawerOpen && (
              <div className="text-lg">
                <Link to="/login">Login</Link>
              </div>
            )}
          </div>
        </>
      )}
    </header>
  );
};

export default Navbar;
