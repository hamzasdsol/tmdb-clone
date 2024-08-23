import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 7
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2
  }
};

const FreeWatch = () => {
  const [activeFreeToWatchButton, setActiveFreeToWatchButton] = useState('Movies');
  const [content, setContent] = useState([]);
  const carouselRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleKeyDown = (event) => {
    if (carouselRef.current) {
      if (event.key === 'ArrowRight') {
        carouselRef.current.goToSlide(carouselRef.current.state.currentSlide + 1);
      } else if (event.key === 'ArrowLeft') {
        carouselRef.current.goToSlide(carouselRef.current.state.currentSlide - 1);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        let endpoint = '';
        if (activeFreeToWatchButton === 'Movies') {
          endpoint = `/discover/movie`;
        } else if (activeFreeToWatchButton === 'TV') {
          endpoint = `/discover/tv`;
        }

        const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
          params: {
            api_key: API_KEY,
          }
        });
        setContent(data.results);
      } catch (error) {
        console.error('Error fetching content:', error);
      }
    };

    fetchContent();
  }, [activeFreeToWatchButton]);

  const drawPercentage = (canvas, percentage) => {
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const lineWidth = 4;
    const centerX = radius;
    const centerY = radius;
    const startAngle = -0.5 * Math.PI;
    const endAngle = ((percentage / 100) * 2 * Math.PI) - 0.5 * Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#00FF00';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, startAngle, endAngle, false);
    ctx.stroke();

    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage.toFixed(2)}%`, centerX, centerY);
  };

  const selectedStyle = {
    backgroundColor: 'rgb(3, 37, 65)',
    color: 'transparent',
    position: 'relative',
    overflow: 'hidden',
  };

  const gradientText = {
    position: 'relative',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    backgroundImage: 'linear-gradient(45deg, #17ead9, #6078ea)',
    WebkitBackgroundClip: 'text',
    backgroundClip: 'text',
    color: 'transparent',
  };

  const defaultStyle = {
    backgroundColor: 'white',
    color: 'black',
  };

  const handleImageClick = (id) => {
    navigate(`/details/${id}`); // Navigate to detail page
  };

  return (
    <div>
      <div className='pt-10 px-4 flex items-center'>
        <h2 className='text-3xl font-semibold mr-4'>Free to Watch</h2>

        <div className='border-2 border-black text-black bg-white rounded-full flex items-center'>
          <button
            style={activeFreeToWatchButton === 'Movies' ? selectedStyle : defaultStyle}
            className={`group px-8 py-1 transition-colors font-bold duration-300 ease-in-out rounded-full text-sm`}
            onClick={() => setActiveFreeToWatchButton('Movies')}
          >
            <span style={activeFreeToWatchButton === 'Movies' ? gradientText : {}}>
              Movies
            </span>
          </button>
          <button
            style={activeFreeToWatchButton === 'TV' ? selectedStyle : defaultStyle}
            className={`group px-4 py-1 ml-4 transition-colors font-bold duration-300 ease-in-out rounded-full text-sm`}
            onClick={() => setActiveFreeToWatchButton('TV')}
          >
            <span style={activeFreeToWatchButton === 'TV' ? gradientText : {}}>
              TV
            </span>
          </button>
        </div>
      </div>
      
      <section className="text-gray-600 body-font cursor-pointer" style={{ position: 'relative' }}>
        <div className="container px-5 py-5 mx-auto cursor-pointer">
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite={true}
            showDots={false}
            arrows={false}
            autoPlay={false}
            itemClass="carousel-item"
            containerClass="carousel-container"
          >
            {content.map((x, index) => (
              <div key={index} className="relative" onClick={() => handleImageClick(x.id)}>
                <div className="block h-75 w-50 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    alt="trending"
                    className="object-cover object-center w-full h-full block cursor-pointer relative"
                    src={`https://image.tmdb.org/t/p/w500${x.poster_path}`}
                    loading="lazy"
                  />
                  <div className='absolute'>
                    <canvas
                      ref={(canvas) => {
                        if (canvas) {
                          drawPercentage(canvas, x.vote_average * 10);
                        }
                      }}
                      style={{ backgroundColor: 'rgb(3, 37, 65)' }}
                      width="40"
                      height="40"
                      className="absolute left-3 -bottom-10 z-15 transform -translate-y-1/2 cursor-pointer rounded-full bg-white"
                    />
                  </div>
                  <div className='absolute right-3 top-3 w-6 h-6 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300'>
                    <i className="fa-solid fa-ellipsis text-xs cursor-pointer text-gray-600 hover:text-white"></i>
                  </div>
                </div>
                <div className="mt-6 ml-4">
                  <h2 className="text-gray-900 title-font text-lg font-medium cursor-pointer text-left">
                    {x.title || x.name}
                  </h2>
                  <p className="text-gray-600">{x.release_date || x.first_air_date}</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
}

export default FreeWatch;
