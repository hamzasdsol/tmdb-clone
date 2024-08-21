import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Detailpage = () => {
  const { id } = useParams(); 
  const [person, setPerson] = useState(null);
  const [knownFor, setKnownFor] = useState([]);
  const [isReadMore, setIsReadMore] = useState(false); // State to toggle text visibility
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
  }, [id]);

  if (!person) {
    return <div>Loading...</div>;
  }
  const handleImageClick = (id) => {
    navigate(`/details/${id}`); // Navigate to detail page
  };
  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap lg:flex-nowrap">
         
            <div className="lg:w-1/3 w-full lg:pr-10">
              <img
                alt={person.name}
                className="w-full h-70 rounded object-cover object-center"
                src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
              />
            </div>
       
            <div className="lg:w-2/3 w-full lg:pl-10 mt-6 lg:mt-0">
              <h1 className="text-gray-900 text-5xl font-bold font-medium mb-2">
                {person.name}
              </h1>
              <div className="mt-6">
              
                <h2 className="text-gray-900 text-3xl font-semibold mb-2">Biography</h2>
               
                <p className="text-gray-900 text-lg ">
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
              <div className="mt-20">
                <span className="title-font font-medium  text-3xl text-gray-900">
                  Known For
                </span>
               
                <div 
                  className="flex overflow-x-auto mt-4 space-x-4 px-2" 
                  style={{ 
                    overflowY: 'hidden', 
                    paddingBottom: '1rem' 
                  }}
                >
                  {knownFor.map((movie) => (
                    <div key={movie.id} className="flex-shrink-0 w-32 mb-20 h-48" onClick={() => handleImageClick(movie.id)}>
                      <div className="flex flex-col items-center p-0 border border-gray-200 rounded-lg">
                        <img
                          alt={movie.title || movie.name}
                          className="w-full h-full object-cover object-center rounded cursor-pointer"
                          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        />
                        <p className="mt-2 text-center text-gray-900 text-1xl">
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
      </section>
    </div>
  );
};

export default Detailpage;

