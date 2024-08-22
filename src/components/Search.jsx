import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { TiTick } from 'react-icons/ti';

const Search = () => {
  const [activeItem, setActiveItem] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query') || '';
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const response = await axios.get(`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
        setResults(response.data.results);
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  const getItemClass = (item) => {
    return `relative pl-10 pr-12 py-2 text-gray-700 cursor-pointer transition-all duration-300 ${activeItem === item ? 'bg-gray-100' : 'hover:bg-gray-100'}`;
  };

  const getNumberClass = (item) => {
    return `absolute right-4 top-1/2 transform -translate-y-1/2 rounded w-6 h-6 flex items-center justify-center text-sm ${activeItem === item ? 'bg-white text-gray-700' : 'bg-gray-300 text-gray-700'} ${activeItem !== item ? 'hover:bg-white hover:text-gray-700' : ''}`;
  };

  const numbers = ['98', '25', '110', '11', '43', '61', '7'];

  const handleImageClick = (id) => {
    navigate(`/trending-detail/${id}`); // Ensure this path matches the route in App
  };

  return (
    <div className="mt-5 mb-5 flex flex-col lg:flex-row lg:items-start lg:gap-5">
      {/* Features Section */}
      <div className="w-full lg:w-1/6 rounded-lg mb-4 lg:mb-0 border lg:ms-40 shadow-lg border-gray-300 flex-shrink-0" style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
        <div className="bg-white">
          <h2 className="text-2xl font-semibold mb-4 p-7 text-left text-white bg-[rgba(1,180,228)]" style={{ borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
            Search Results
          </h2>
          <ul className="space-y-2 pb-6 text-lg">
            {['Movies', 'TV Shows', 'People', 'Keyword', 'Companies', 'Collections', 'Network'].map((item, index) => (
              <li
                key={item}
                className={getItemClass(item)}
                onClick={() => handleItemClick(item)}
              >
                {item}
                <span className={getNumberClass(item)}>
                  {numbers[index]}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Results Section */}
      <div className="w-full lg:w-3/6 flex-shrink-0">
        {loading ? (
          <p>Loading...</p>
        ) : (
          results.length > 0 ? (
            results.map(result => (
              <div key={result.id} className="bg-white rounded-lg shadow-lg border border-gray-300 flex mb-4" style={{ height: '170px', width: '1300px' }}>
                {/* Image Section */}
                <div className="flex-shrink-0 w-1/7">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${result.poster_path}`}
                    alt={result.title || result.name}
                    className="w-full h-full object-cover rounded-l-lg cursor-pointer"
                    onClick={() => handleImageClick(result.id)} // Add onClick handler
                  />
                </div>

                {/* Text Section */}
                <div className="flex-1 p-4">
                  <h3 className="text-xl font-semibold mb-2">{result.title || result.name}</h3>
                  <p className="text-gray-700">{result.overview}</p>
                </div>
              </div>
            ))
          ) : (
            <p>No results found</p>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
