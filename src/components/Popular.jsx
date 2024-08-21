import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import './Today.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 7 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 3 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 2 },
};

const Popular = () => {
  const carouselRef = useRef(null);
  const [activePopularButton, setActivePopularButton] = useState('Streaming');
  const [popularContent, setPopularContent] = useState([]);
  const [contentType, setContentType] = useState('movie');
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
    const fetchPopularContent = async () => {
      try {
        let endpoint = '';
        switch (activePopularButton) {
          case 'Streaming':
            endpoint = `/trending/${contentType}/week`;
            break;
          case 'On TV':
            endpoint = `/movie/upcoming`;
            break;
          case 'For Rent':
            endpoint = `/tv/on_the_air`;
            break;
          case 'In Theaters':
            endpoint = `/movie/now_playing`;
            break;
          default:
            endpoint = `/trending/${contentType}/week`;
        }

        const { data } = await axios.get(`${BASE_URL}${endpoint}`, {
          params: { api_key: API_KEY }
        });
        setPopularContent(data.results);
      } catch (error) {
        console.error('Error fetching popular content:', error);
      }
    };

    fetchPopularContent();
  }, [activePopularButton, contentType]);

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
    ctx.fillText(`${percentage}%`, centerX, centerY);
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
      <section className="text-gray-600 body-font cursor-pointer" style={{ position: 'relative' }}>
        <div className='pt-8 -mt-2 px-4 flex flex-col md:flex-row items-center'>
          <h2 className='text-3xl font-semibold text-black mb-4 md:mb-0 md:mr-4'>
            What's Popular
          </h2>

          <div className='border-2 border-black text-black bg-white rounded-full flex flex-wrap items-center'>
            <button
              style={activePopularButton === 'Streaming' ? selectedStyle : defaultStyle}
              className='group px-2 py-1 font-bold transition-colors duration-300 ease-in-out rounded-full text-sm'
              onClick={() => {
                setActivePopularButton('Streaming');
                setContentType('movie');
              }}
            >
              <span style={activePopularButton === 'Streaming' ? gradientText : {}}>
                Streaming
              </span>
            </button>
            <button
              style={activePopularButton === 'On TV' ? selectedStyle : defaultStyle}
              className='group px-2 py-1 ml-2 font-bold transition-colors duration-300 ease-in-out rounded-full text-sm'
              onClick={() => {
                setActivePopularButton('On TV');
                setContentType('tv');
              }}
            >
              <span style={activePopularButton === 'On TV' ? gradientText : {}}>
                On TV
              </span>
            </button>
            <button
              style={activePopularButton === 'For Rent' ? selectedStyle : defaultStyle}
              className='group px-2 py-1 ml-2 font-bold transition-colors duration-300 ease-in-out rounded-full text-sm'
              onClick={() => {
                setActivePopularButton('For Rent');
                setContentType('movie');
              }}
            >
              <span style={activePopularButton === 'For Rent' ? gradientText : {}}>
                For Rent
              </span>
            </button>
            <button
              style={activePopularButton === 'In Theaters' ? selectedStyle : defaultStyle}
              className='group px-2 py-1 ml-2 font-bold transition-colors duration-300 ease-in-out rounded-full text-sm'
              onClick={() => {
                setActivePopularButton('In Theaters');
                setContentType('movie');
              }}
            >
              <span style={activePopularButton === 'In Theaters' ? gradientText : {}}>
                In Theaters
              </span>
            </button>
          </div>
        </div>

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
            {popularContent.map((x, index) => (
              <div key={index} className="relative" onClick={() => handleImageClick(x.id)}>
                <div className="block h-75 w-50 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    alt="popular"
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
                    {x.title || x.name} {/* title for movies, name for TV shows */}
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
};

export default Popular;
