import React, { useRef, useEffect } from 'react';
import { trendingToday } from '../api/trendingToday';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import the default styles
import './Today.css'; // Custom CSS for Today component

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
    ctx.strokeStyle = '#028391';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius - lineWidth / 2, startAngle, endAngle, false);
    ctx.stroke();

    // Draw the percentage text
    ctx.font = 'bold 12px Arial';
    ctx.fillStyle = '#028391';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(`${percentage}%`, centerX, centerY);
  };

  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto">
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
            {trendingToday.map((x, index) => (
              <div key={index} className="relative">
                <div className="block h-75 w-50 rounded-lg overflow-hidden">
                  <img
                    alt="trending"
                    className="object-cover object-center w-full h-full block"
                    src={x.image}
                    loading="lazy" // Lazy loading for performance
                  />
                  <canvas
                    ref={(canvas) => {
                      if (canvas) {
                        drawPercentage(canvas, x.percentage);
                      }
                    }}
                    width="34"
                    height="34"
                    className="absolute left-3 bottom-1 z-15 transform -translate-y-1/2 rounded-full bg-white"
                  />
                  <div className='absolute right-3 top-3 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-500 transition-colors duration-300'>
                    <i className="fa-solid fa-ellipsis text-xs text-gray-600 hover:text-white"></i>
                  </div>
                </div>
                <div className="mt-2">
                  <h2 className="text-gray-900 title-font text-lg font-medium">
                    {x.title}
                  </h2>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div>
  );
};

export default Today;
