import React, { useRef, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css'; // Import the default styles
import './Today.css';
import { trendingToday } from '../api/trendingToday';




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
  const carouselRef = useRef(null); // Define the carouselRef here

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


  return (
    <div>
      <section className="text-gray-600 body-font cursor-pointer" style={{ position: 'relative' }}>
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
           {trendingToday.map((x, index) => (
  <div key={index} className="relative">
     <div className="block h-75 w-50 rounded-lg overflow-hidden cursor-pointer">
                  
                  <img
                    alt="trending"
                    className="object-cover object-center w-full h-full block cursor-pointer relative"
                    src={x.image}
                    loading="lazy" // Lazy loading for performance
                  />
                  <div className='absolute'>
                  <canvas
                    ref={(canvas) => {
                      if (canvas) {
                        drawPercentage(canvas, x.percentage);
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
        {x.title}
      </h2>
      <p className="text-gray-600">{x.date}</p>
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
