import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const People = () => {
  const [people, setPeople] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Retrieve page number from location state if available
    const pageNumber = location.state?.page || 1;
    setPage(pageNumber);

    const fetchPopularPeople = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_API_KEY}&page=${pageNumber}`
        );
        setPeople(response.data.results);
        setTotalPages(response.data.total_pages);
      } catch (error) {
        console.error("Error fetching popular people data:", error);
      }
    };

    fetchPopularPeople();
  }, [location.state?.page]); // Re-run effect if page changes

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      navigate(`/people`, { state: { page: newPage } }); // Pass new page number on page change
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;

    let startPage = Math.max(page - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(endPage - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-4 py-2 text-xl text-gray-900 rounded ${i === page ? 'bg-gray-300' : ''}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      pageNumbers.push(
        <span key="dots" className="px-4 py-2 text-xl text-gray-900">...</span>
      );
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-4 py-2 text-xl text-gray-900 rounded ${page === totalPages ? 'bg-gray-300' : ''}`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div>
      <section className="text-gray-600 body-font cursor-pointer">
        <div className="container px-5 py-6 mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-7">Popular People</h1>
          
          <div className="flex flex-wrap -m-4">
            {people.map((person) => (
              <div key={person.id} className="p-4 md:w-1/4 sm:w-1/2 w-full">
                <div
                  className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden"
                  onClick={() => navigate(`/people/${person.id}`, { state: { page } })}
                >
                  <Link to={`/people/${person.id}`} state={{ page }}>
                    <img
                      className="h-74 w-full object-cover object-center"
                      style={{ borderBottomRightRadius: '5px', borderBottomLeftRadius: '5px' }}
                      src={`https://image.tmdb.org/t/p/w500${person.profile_path}`}
                      alt={person.name}
                    />
                    <div className="p-2">
                      <h1 className="title-font text-2xl font-medium text-gray-900 mb-0">{person.name}</h1>
                      <p className="leading-relaxed text-1xl">
                        Known for: {person.known_for.map(movie => movie.title || movie.name).join(', ')}
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 mx-1 text-3xl text-gray-900 rounded disabled:opacity-50"
            >
              <FaAngleLeft />
            </button>
            <div className="flex space-x-1">
              {renderPageNumbers()}
            </div>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 mx-1 text-3xl text-gray-900 rounded disabled:opacity-50"
            >
              <FaAngleRight />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default People;
