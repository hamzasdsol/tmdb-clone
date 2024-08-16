import React, { useRef, useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import the default styles
import axios from 'axios';

const API_KEY = '1332e02a7aa536736b2d35a49363d0ce'; // Replace with your TMDB API key
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
      const barWidth = 2; // Thinner width of each bar
      const barMargin = 6; // Increase margin between bars
      const numberOfBars = Math.ceil(window.innerWidth / (barWidth + barMargin)); // Number of bars based on width and margin
      const barArray = [];
      for (let i = 0; i < numberOfBars; i++) {
        const height = Math.random() * (window.innerHeight / 2); // Random height from 0 to half the window height
        barArray.push({
          left: `${i * (barWidth + barMargin)}px`, // Position each bar with margin
          height: `${height}px`,
          width: `${barWidth}px`, // Set the width of the bars
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

  // Add and remove event listeners
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Fetch trending movies based on the active button
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTrendingMovies(activeTrendingButton);
      console.log(data); // Log data to verify structure
      setTrendingMovies(data);
    };

    fetchData();
  }, [activeTrendingButton]);

  // Function to draw the percentage on the canvas
  const drawPercentage = (canvas, percentage) => {
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const lineWidth = 4;
    const centerX = radius;
    const centerY = radius;
    const startAngle = -0.5 * Math.PI;
    const endAngle = ((percentage / 100) * 2 * Math.PI) - 0.5 * Math.PI;

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#00FF00'; // Green color for the stroke
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, startAngle, endAngle, false);
    ctx.stroke();

    // Draw the percentage text
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = 'white'; // Green color for the text
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage}%`, centerX, centerY);
  };

  // Styles for the buttons
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
              width: bar.width, // Apply width to the bar
            }} />
          ))}
        </div>
        <div className="container px-5 py-5 mx-auto cursor-pointer">
          <Carousel
            ref={carouselRef}
            responsive={responsive}
            infinite={true}
            showDots={false} // Hide dots
            arrows={false} // Hide arrows
            autoPlay={false} // Disable auto play if not needed
            itemClass="carousel-item" // Apply margin between items
            containerClass="carousel-container" // Apply padding around container
          >
            {trendingMovies.map((x, index) => (
              <div key={index} className="relative">
                <div className="block h-75 w-50 rounded-lg overflow-hidden cursor-pointer">
                  <img
                    alt={x.title || 'Trending Movie'}
                    className="object-cover object-center w-full h-full block cursor-pointer relative"
                    src={`https://image.tmdb.org/t/p/w500${x.poster_path}`} // Update URL based on TMDB structure
                    loading="lazy" // Lazy loading for performance
                  />
                  <div className='absolute'>
                    <canvas
                      ref={(canvas) => {
                        if (canvas) {
                          drawPercentage(canvas, x.vote_average * 10); // Assuming percentage is based on vote_average
                        }
                      }}
                      style={{ backgroundColor: 'rgb(3, 37, 65)' }}
                      width="40"
                      height="40"
                      className="absolute left-3 -bottom-10 z-15 transform -translate-y-1/2 cursor-pointer rounded-full bg-white"
                    />
                  </div>
                  <div className='absolute right-3 top-3 w-6 h-6 rounded-full cursor-pointer bg-gray-200 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300'>
                    <i className='text-white text-sm fas fa-play'></i> {/* Example icon */}
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



