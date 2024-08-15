import React from 'react';
import { leaderBoard } from '../api/leaderBoard';

const Progressbar = () => {
  return (
    <div className="p-4">
      {/* Leaderboard Title with Bullet Points */}
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mr-8">Leaderboard</h2>
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
            <span className="text-sm">First Place</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
            <span className="text-sm">Second Place</span>
          </div>
        </div>
      </div>

      {/* Profiles and Progress Bars */}
      <div className="flex justify-between">
        {/* Left Column */}
        <div className="flex flex-col space-y-4">
          {leaderBoard.slice(0, 5).map((profile) => (
            <div key={profile.id} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-xs">No Image</span>
                  )}
                </div>
                <span className="text-sm">{profile.name}</span>
              </div>
              <div className="flex flex-col items-start ml-4 space-y-1">
                <div className="w-80 h-2 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${Math.min(profile.allTime.replace(/,/g, '') / 1000000, 100)}%` }}></div>
                </div>
                <div className="w-80 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${Math.min(profile.thisWeek.replace(/,/g, '') / 100000, 100)}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="flex flex-col space-y-4">
          {leaderBoard.slice(5).map((profile) => (
            <div key={profile.id} className="flex flex-col space-y-2">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-xs">No Image</span>
                  )}
                </div>
                <span className="text-sm">{profile.name}</span>
              </div>
              <div className="flex flex-col items-start ml-4 space-y-1">
                <div className="w-80 h-2 bg-red-200 rounded-full overflow-hidden">
                  <div className="h-full bg-red-500" style={{ width: `${Math.min(profile.allTime.replace(/,/g, '') / 1000000, 100)}%` }}></div>
                </div>
                <div className="w-80 h-2 bg-green-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500" style={{ width: `${Math.min(profile.thisWeek.replace(/,/g, '') / 100000, 100)}%` }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progressbar;