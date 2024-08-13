import React, { useState } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import enImage from '../assets/images/en.PNG'; // Adjust the path according to the location of Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [dropdown, setDropdown] = useState({ movies: false, tvShows: false, people: false, more: false });

  const handleMouseEnter = (category) => {
    setDropdown(prevState => ({ ...prevState, [category]: true }));
  };

  const handleMouseLeave = (category) => {
    setDropdown(prevState => ({ ...prevState, [category]: false }));
  };

  return (
    <header className="text-gray-600 body-font" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
      <div className="container mx-auto flex flex-wrap p-1 flex-col md:flex-row items-center">
        <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0" href="#">
        <Link to="/"><img className="h-6 mr-auto" src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" alt="Logo" />
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
                <div className="absolute top-full left-0 mt-2 bg-white text-black border border-gray-300 shadow-lg rounded-lg w-48 z-50">

                  {category === 'movies' && (
                    <>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left  duration-300" href="/movies/action">Popular</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/movies/drama">Now Playing</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left  duration-300" href="/movies/comedy">Upcoming</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/movies/horror">Top Rated</a>
                    </>
                  )}
                  {category === 'tvShows' && (
                    <>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left  duration-300" href="/tv-shows/drama">Popular</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/tv-shows/comedy">On TV </a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/tv-shows/thriller">Airing Today</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left  duration-300" href="/tv-shows/sci-fi">Top Rated</a>
                    </>
                  )}
                  {category === 'people' && (
                    <>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/people/actors">Popular People</a>
                    </>
                  )}
                  {category === 'more' && (
                    <>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/settings">Discussions</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/help">Leaderboard</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left duration-300" href="/about">Support</a>
                      <a className="block px-5 py-2 hover:bg-gray-200 transition-colors text-left  duration-300" href="/contact">Api</a>
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
          <h1 className="text-white cursor-pointer text-lg text-2xl font-semibold mx-4">Login</h1>
          <h1 className="text-white cursor-pointer text-lg font-semibold mx-4">Join TMDB</h1>
          <FaSearch className="cursor-pointer text-2xl font-semibold" style={{ color: '#028391', marginLeft: '0.5rem' }} />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
