import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Detailpage = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);
  const [knownFor, setKnownFor] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_API_KEY}&append_to_response=combined_credits`
        );
        setPerson(response.data);
        setKnownFor(response.data.combined_credits.cast);
      } catch (error) {
        console.error("Error fetching person details:", error);
      }
    };

    fetchPersonDetails();

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }

  const handleImageClick = (id) => {
    navigate(`/details/${id}`);
  };

  // Conditional styles based on window size
  const imageStyles = {
    width: windowSize.width > 638 && windowSize.height > 1047 ? '50%' : '75%',
    height: windowSize.width > 638 && windowSize.height > 1047 ? '40rem' : '28rem',
  };

  return (
    <div className="text-gray-600 body-font">
      <div className="container px-5 py-12 mx-auto">
        <div className="flex flex-col lg:flex-row items-center lg:items-start lg:space-x-8">
          
          <div className="w-full lg:w-2/3 md:w-1/2 flex justify-center">
            <img
              alt={person.name}
              className="rounded object-cover object-center mx-auto"
              src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              style={imageStyles}
            />
          </div>
        
          <div className="w-full lg:w-2/3 md:w-full mt-6 lg:mt-0">
            <h1 className="text-gray-900 text-3xl md:text-5xl font-bold mb-4">
              {person.name}
            </h1>
            <div className="mb-6">
              <h2 className="text-gray-900 text-2xl md:text-3xl font-semibold mb-2">Biography</h2>
              <p className="text-gray-900 text-sm md:text-lg">
                {isReadMore ? person.biography : `${person.biography?.substring(0, 200)}...`}
              </p>
              {person.biography && person.biography.length > 200 && (
                <button
                  onClick={() => setIsReadMore(!isReadMore)}
                  className="text-blue-500 mt-2 focus:outline-none"
                >
                  {isReadMore ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
            <div className="mt-10">
              <h2 className="text-gray-900 text-2xl md:text-3xl font-semibold mb-4">
                Known For
              </h2>
              <div className="flex overflow-x-scroll space-x-4 pb-4 -mx-2">
                {knownFor.map((movie) => (
                  <div key={movie.id} className="flex-shrink-0 w-24 sm:w-32 mb-4" onClick={() => handleImageClick(movie.id)}>
                    <div className="flex flex-col items-center p-0 border border-gray-200 rounded-lg cursor-pointer">
                      <img
                        alt={movie.title || movie.name}
                        className="w-full h-full object-cover object-center rounded"
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      />
                      <p className="mt-2 text-center text-gray-900 text-xs sm:text-sm">
                        {movie.title || movie.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Detailpage;

