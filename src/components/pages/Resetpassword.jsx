import React from 'react';
import { TiTick } from 'react-icons/ti';

const Resetpassword = () => {
  return (
    <div className="mt-5 mb-5 flex flex-col lg:flex-row lg:items-start">
    
      <div className="w-full lg:w-1/6  mb-4 lg:mb-0 lg:ms-40">
       
      </div>

    
      <div className="w-full min-h-[500px] lg:w-2/3 bg-white p-8 rounded flex flex-col justify-start">
        <h2 className="text-3xl font-bold mb-3 text-left">Reset Password</h2>
        <p className="mb-7 text-lg">
        Enter the email you used to sign up for a TMDB account and we'll send you the steps required to reset your password.
        </p>
        <form>
         
          <div className="mb-6">
            <label className="block text-gray-700 text-lg font-semibold mb-1" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-[60rem] px-3 py-2 border border-gray-300 bg-[#D1E9F6] rounded placeholder-black focus:border-[rgba(1,180,228)] focus:outline-none"
              placeholder="Enter your email"
            />
          </div>
       
          <div className="flex flex-col lg:flex-row mt-9 space-y-4 lg:space-y-0 lg:space-x-4">
            <button
              type="submit"
              className="bg-[rgba(1,180,228)] text-white text-lg py-2 px-6 rounded font-semibold"
            >
              Continue
            </button>
            <button
              type="button"
              className="text-[rgba(1,180,228)] text-lg py-2  px-4 rounded font-semibold"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
