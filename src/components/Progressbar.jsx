import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TMDB_API_KEY = '1332e02a7aa536736b2d35a49363d0ce';
const TMDB_API_URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_API_KEY}&language=en-US&page=1`;

const getAvatarBackgroundColor = (index) => {
  const colors = ['bg-blue-500', 'bg-blue-800', 'bg-purple-500'];
  return colors[index % colors.length];
};

const Progressbar = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(TMDB_API_URL);
        const movies = response.data.results.map((movie, index) => ({
          id: movie.id,
          name: movie.title,
          image: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          allTime: (movie.popularity * 1000).toFixed(0), // Example calculation for allTime
          thisWeek: (movie.vote_count * 10).toFixed(0),  // Example calculation for thisWeek
        }));

        // Find max values for normalization
        const maxAllTime = Math.max(...movies.map(movie => movie.allTime));
        const maxThisWeek = Math.max(...movies.map(movie => movie.thisWeek));

        // Normalize values
        const normalizedMovies = movies.map(movie => ({
          ...movie,
          allTimePercentage: (movie.allTime / maxAllTime) * 100,
          thisWeekPercentage: (movie.thisWeek / maxThisWeek) * 100,
        }));

        setLeaderBoard(normalizedMovies.slice(0, 10)); // Limit to top 10 items
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchLeaderboard();
  }, []);

  // Split the leaderboard into two columns
  const firstColumn = leaderBoard.slice(0, 5);
  const secondColumn = leaderBoard.slice(5, 10);

  return (
    <div className="py-4 mx-20">
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-bold mr-8">Leaderboard</h2>
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-lg" style={{ background: 'linear-gradient(45deg, #94f8ef, #0ed2c2)' }}></div>
            <span className="text-1xl ml-2">First Place</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-lg" style={{ background: 'linear-gradient(45deg, #f5d67b, #fe36d9)' }}></div>
            <span className="text-1xl ml-2">Second Place</span>
          </div>
        </div>
      </div>

      {/* Profiles and Progress Bars */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 ">
        {/* First Column */}
        <div>
          {firstColumn.map((profile, index) => (
            <div key={profile.id} className="flex flex-col mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 flex items-center mt-2 justify-center rounded-full ${getAvatarBackgroundColor(index)}`}
                >
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-lg font-bold -mt-4">{profile.name}</span>
              </div>
              <div className="flex flex-col items-start ml-16 space-y-2 -mt-4">
                {/* All-Time Progress Bar */}
                <div className="flex items-center w-full h-2 rounded-full overflow-visible">
                  <div
                    style={{ background: 'linear-gradient(45deg, #94f8ef, #0ed2c2)', width: `${profile.allTimePercentage}%` }}
                    className="h-full rounded-full"
                  ></div>
                  <span className="ml-2 text-xs font-bold mt-[-10px]">{profile.allTime}</span>
                </div>
                {/* This Week Progress Bar */}
                <div className="flex items-center w-full h-2 rounded-full overflow-visible">
                  <div
                    style={{ background: 'linear-gradient(45deg, #f5d67b, #fe36d9)', width: `${profile.thisWeekPercentage}%` }}
                    className="h-full rounded-full"
                  ></div>
                  <span className="ml-2 text-xs font-bold mt-[-10px]">{profile.thisWeek}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Second Column */}
        <div>
          {secondColumn.map((profile, index) => (
            <div key={profile.id} className="flex flex-col mb-8">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-12 h-12 flex items-center mt-2 justify-center rounded-full ${getAvatarBackgroundColor(index + 5)}`}
                >
                  {profile.image ? (
                    <img src={profile.image} alt={profile.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                    <span className="text-xl font-bold text-white">
                      {profile.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <span className="text-lg font-bold -mt-4">{profile.name}</span>
              </div>
              <div className="flex flex-col items-start ml-16 space-y-2 -mt-4">
                {/* All-Time Progress Bar */}
                <div className="flex items-center w-full h-2 rounded-full overflow-visible">
                  <div
                    style={{ background: 'linear-gradient(45deg, #94f8ef, #0ed2c2)', width: `${profile.allTimePercentage}%` }}
                    className="h-full rounded-full"
                  ></div>
                  <span className="ml-2 text-xs font-bold mt-[-10px]">{profile.allTime}</span>
                </div>
                {/* This Week Progress Bar */}
                <div className="flex items-center w-full h-2 rounded-full overflow-visible">
                  <div
                    style={{ background: 'linear-gradient(45deg, #f5d67b, #fe36d9)', width: `${profile.thisWeekPercentage}%` }}
                    className="h-full rounded-full"
                  ></div>
                  <span className="ml-2 text-xs font-bold mt-[-10px]">{profile.thisWeek}</span>
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

