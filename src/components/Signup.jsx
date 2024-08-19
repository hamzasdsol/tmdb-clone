import React from 'react';
import { TiTick } from 'react-icons/ti';

const Signup = () => {
  return (
    <div className="mt-5 mb-5 flex flex-col lg:flex-row lg:items-start">
      {/* Features Section */}
      <div className="w-full lg:w-1/6 rounded-lg mb-4 lg:mb-0 border lg:ms-40 shadow-lg border-gray-300 flex-shrink-0" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <div className="bg-white">
          <h2 className="text-2xl font-semibold mb-4 p-7 text-left text-white bg-[rgba(1,180,228)]" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
            Benefits of being a member
          </h2>
          <ul className="space-y-6 pb-6 text-lg">
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Find something to watch on your subscribed streaming services
            </li>
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Log the movies and TV shows you have watched
            </li>
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Keep track of your favourite movies and TV shows and get recommendations from them
            </li>
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Build and maintain a personal watchlist
            </li>
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Build custom mixed lists (movies and TV)
            </li>
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Take part in movie and TV discussions
            </li>
            <li className="relative pl-10 text-gray-700">
              <TiTick className="absolute left-2 top-0 text-black" />
              Contribute to, and improve the information in our database
            </li>
          </ul>
        </div>
      </div>

      {/* Signup Form Section */}
      <div className="w-full lg:w-2/3 bg-white p-8 rounded flex flex-col justify-start">
        <h2 className="text-3xl font-bold mb-3 text-left">Sign Up for an account</h2>
        <p className="mb-7 text-lg">
          Signing up for an account is free and easy. Fill out the form below to get started. JavaScript is required to continue.
        </p>
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-black focus:border-[rgba(1,180,228)] focus:outline-none"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="password">
              Password (4 characters minimum)
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-black focus:border-[rgba(1,180,228)] focus:outline-none"
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="passwordConfirm">
              Confirm Password
            </label>
            <input
              id="passwordConfirm"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-black focus:border-[rgba(1,180,228)] focus:outline-none"
              placeholder="Confirm your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded placeholder-black focus:border-[rgba(1,180,228)] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
          <p className="text-lg text-gray-600 mt-6 mb-6">
            By clicking the <strong>"Sign up"</strong> button below, I certify that I have read and agree to the TMDB terms of use and privacy policy.
          </p>
          <div className="flex flex-col lg:flex-row mt-9 space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              type="submit"
              className="bg-[rgba(1,180,228)] text-white text-lg py-2 px-6 rounded font-semibold"
            >
              Sign Up
            </button>
            <button
              type="button"
              className="text-[rgba(1,180,228)] text-lg py-2 px-4 rounded font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
