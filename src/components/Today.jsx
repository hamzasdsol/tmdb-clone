import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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

const Today = () => {
  const carouselRef = useRef(null);
  const [bars, setBars] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [activeTrendingButton, setActiveTrendingButton] = useState('Today');
  const navigate = useNavigate();

  // Fetch trending movies from TMDB
  const fetchTrendingMovies = async (period) => {
    try {
      const endpoint = period === 'Today'
        ? `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
        : `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
      const response = await axios.get(endpoint);
      return response.data.results;
    } catch (error) {
      console.error("Error fetching trending movies:", error);
      return [];
    }
  };

  // Generate random vertical bars
  useEffect(() => {
    const generateBars = () => {
      const barWidth = 2;
      const barMargin = 6;
      const numberOfBars = Math.ceil(window.innerWidth / (barWidth + barMargin));
      const barArray = [];
      for (let i = 0; i < numberOfBars; i++) {
        const height = Math.random() * (window.innerHeight / 2);
        barArray.push({
          left: `${i * (barWidth + barMargin)}px`,
          height: `${height}px`,
          width: `${barWidth}px`,
        });
      }
      setBars(barArray);
    };

    generateBars();
    window.addEventListener('resize', generateBars);
    return () => {
      window.removeEventListener('resize', generateBars);
    };
  }, []);

  // Handle keyboard navigation
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
    const fetchData = async () => {
      const data = await fetchTrendingMovies(activeTrendingButton);
      setTrendingMovies(data);
    };

    fetchData();
  }, [activeTrendingButton]);

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
      <section className="text-gray-600 body-font cursor-pointer" style={{ position: 'relative' }}>
        <div className='pt-10 px-4 flex items-center'>
          <h2 className='text-3xl font-semibold mr-4 text-black'>Trending</h2>

          <div className='border-2 border-black text-black bg-white rounded-full flex items-center'>
            <button
              style={activeTrendingButton === 'Today' ? selectedStyle : defaultStyle}
              className={`group px-11 py-1 transition-colors font-bold duration-300 ease-in-out rounded-full text-sm`}
              onClick={() => setActiveTrendingButton('Today')}
            >
              <span style={activeTrendingButton === 'Today' ? gradientText : {}}>
                Today
              </span>
            </button>
            <button
              style={activeTrendingButton === 'This Week' ? selectedStyle : defaultStyle}
              className={`group px-2 py-1 ml-4 transition-colors  font-bold duration-300 ease-in-out rounded-full text-sm`}
              onClick={() => setActiveTrendingButton('This Week')}
            >
              <span style={activeTrendingButton === 'This Week' ? gradientText : {}}>
                This Week
              </span>
            </button>
          </div>
        </div>
        <div className="vertical-bars">
          {bars.map((bar, index) => (
            <div key={index} style={{
              left: bar.left,
              height: bar.height,
              width: bar.width,
            }} />
          ))}
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
            {trendingMovies.map((x, index) => (
              <div key={index} className="relative" onClick={() => handleImageClick(x.id)}>
                <div className="block h-75 w-50 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    alt={x.title || 'Trending Movie'}
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
                    <i className='text-white text-sm fas fa-play'></i>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-900 mt-4">{x.title || 'Trending Movie'}</p>
                <p className="text-gray-500">{x.release_date || 'Release Date'}</p>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Today;
