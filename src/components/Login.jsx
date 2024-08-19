import React from 'react';

const Login = () => {
  return (
    <div className="mt-3 mb-5 flex flex-col lg:flex-row lg:items-start lg:mx-[110px] px-4 lg:px-0">
      <div className="bg-white p-8 rounded w-full flex flex-col">
        <h2 className="text-3xl font-bold mb-3 text-left">Login to your account</h2>
        <p className="mb-1 text-lg">
          In order to use the editing and rating capabilities of TMDB, as well as get personal recommendations, you will need to login to your account. If you do not have an account, registering for an account is free and simple. <a href="#" className="text-[rgba(1,180,228)]">Click here</a> to get started.
        </p>
        <p className='mb-4 text-lg'>If you signed up but didn't get your verification email, <a href="#" className="text-[rgba(1,180,228)]">click here</a> to have it resent.</p>
        <form>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full px-4 py-2 border bg-[#D1E9F6] border-[rgba(1,180,228)] rounded placeholder-black focus:outline-none focus:ring-0"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-2 bg-[#D1E9F6] border border-[rgba(1,180,228)] rounded placeholder-black focus:outline-none focus:ring-0"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex flex-col lg:flex-row lg:space-x-4 mt-6">
            <button
              type="submit"
              className="bg-[rgba(1,180,228)] text-white text-lg py-2 px-6 rounded font-semibold mb-4 lg:mb-0"
            >
              Login
            </button>
            <button
              type="button"
              className="text-[rgba(1,180,228)] text-gray-700 text-lg py-2 px-4 rounded font-semibold"
            >
              Reset Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
