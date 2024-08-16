import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Modal from 'react-modal';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const API_KEY = '1332e02a7aa536736b2d35a49363d0ce';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchTrending = async (category) => {
  try {
    const response = await fetch(`${BASE_URL}/trending/${category}/week?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    return [];
  }
};

const fetchVideos = async (category, id) => {
  try {
    const response = await fetch(`${BASE_URL}/${category}/${id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

const TrailorSlider = () => {
  const [selected, setSelected] = useState('movie');
  const [latestTrailers, setLatestTrailers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('src/assets/images/bSiI6FlkJxuBLEHsIgkXMoJrnhB2.jpg');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingItems = await fetchTrending(selected);
        const trailers = await Promise.all(
          trendingItems.map(async (item) => {
            const videos = await fetchVideos(selected, item.id);
            return videos.find((video) => video.type === 'Trailer') || {};
          })
        );
        setLatestTrailers(trailers.filter((trailer) => trailer.key));
      } catch (error) {
        console.error('Error fetching trailers:', error);
      }
    };

    fetchData();
  }, [selected]);

  const openModal = (trailer) => {
    setCurrentTrailer(trailer);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentTrailer(null);
  };

  const borderColor = 'rgb(9, 184, 184)'; // Border color for the buttons
  const selectedStyle = {
    backgroundColor: borderColor,
    color: 'black', // Text color when selected
  };

  const defaultStyle = {
    backgroundColor: 'transparent',
    color: 'white', // Text color when not selected
  };

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    draggable: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
        position: 'relative',
      }}
      className='flex items-center justify-center banner-bg mb-4'
    >
      <div className="relative overflow-hidden bg-bars-container banner-bg w-full px-4 sm:px-8 lg:px-12">
        <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 my-3 p-1 rounded-lg'>
          <h2 className='text-2xl font-semibold mb-4 sm:mb-0 text-white'>
            Latest Trailers
          </h2>
          <div className='relative flex space-x-2 rounded-full' style={{ border: `1px solid ${borderColor}` }}>
            <button
              onClick={() => setSelected('movie')}
              style={selected === 'movie' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm  font-bold font-medium'
            >
              Popular
            </button>
            <button
              onClick={() => setSelected('Streaming')}
              style={selected === 'Streaming' ? selectedStyle : defaultStyle}
              className='px-4 py-2 font-bold rounded-full text-sm font-medium'
            >
              Streaming
            </button>
            <button
              onClick={() => setSelected('on TV')}
              style={selected === 'on TV' ? selectedStyle : defaultStyle}
              className='px-4 py-2 font-bold rounded-full text-sm font-medium'
            >
              On TV
            </button>
            <button
              onClick={() => setSelected('for rent')}
              style={selected === 'for rent' ? selectedStyle : defaultStyle}
              className='px-4 py-2  font-bold rounded-full text-sm font-medium'
            >
              For Rent
            </button>
            <button
              onClick={() => setSelected('in theaters')}
              style={selected === 'in theaters' ? selectedStyle : defaultStyle}
              className='px-4 py-2  font-bold rounded-full text-sm font-medium'
            >
              In Theaters
            </button>
          </div>
        </div>

        <div className='relative overflow-x-auto slider-container'>
          <Slider {...sliderSettings}>
            {latestTrailers.length > 0 ? (
              latestTrailers.map((trailer) => (
                <div key={trailer.id} className='inline-block w-full px-2'>
                  <div className='rounded-lg'>
                    <div
                      className='relative'
                      onMouseEnter={() => setBackgroundImage(`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`)}
                      onMouseLeave={() => setBackgroundImage('src/assets/images/bSiI6FlkJxuBLEHsIgkXMoJrnhB2.jpg')}
                    >
                      {trailer.key ? (
                        <div
                          className='relative cursor-pointer overflow-hidden'
                          onClick={() => openModal(trailer)}
                          style={{
                            transition: 'transform 0.3s ease-in-out',
                          }}
                        >
                          <img
                            className='w-full h-68 sm:h-55 rounded-lg hover:scale-105 transition-transform duration-300'
                            src={`https://img.youtube.com/vi/${trailer.key}/hqdefault.jpg`}
                            alt={trailer.name}
                          />
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <i className='fas fa-play-circle text-white text-4xl'></i>
                          </div>
                        </div>
                      ) : (
                        <div className='w-full h-48 sm:h-40 rounded-lg bg-gray-800 flex items-center justify-center text-white'>
                          <p>No video available</p>
                        </div>
                      )}
                      <div className='absolute top-2 right-2'>
                        <a href="#" aria-label="View Item Options">
                          <div className='bg-white px-2 pb-1 rounded-full hover:bg-blue-400'>
                            <i className="fa-solid fa-ellipsis text-xs"></i>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div className='mt-4 mb-20 ms-2'>
                      <h2 className='text-lg font-semibold'>
                        <a className='text-white '>
                          {trailer.name.length > 25 ? `${trailer.name.slice(0, 22)}...` : trailer.name}
                        </a>
                      </h2>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className='w-full text-center text-white'>No trailers available</div>
            )}
          </Slider>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          style={{
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '80%',
              maxWidth: '1000px',
              height: '60%',
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              border: 'none',
              padding: 0,
              zIndex: '10000',
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              zIndex: '9999',
            },
          }}
        >
          {currentTrailer && (
            <iframe
              width='100%'
              height='100%'
              src={`https://www.youtube.com/embed/${currentTrailer.key}`}
              title='YouTube video player'
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
              allowFullScreen
            ></iframe>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default TrailorSlider;
