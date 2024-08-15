import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


import { latestTrailer } from '../api/latestTrailer';

const TrailorSlider = () => {
  const [selected, setSelected] = useState('popular');

  const selectedStyle = {
    backgroundColor: 'rgb(3, 37, 65)',
    position: 'relative',
    overflow: 'hidden',
    backgroundImage: 'linear-gradient(45deg, #17ead9, #6078ea)',
    WebkitBackgroundClip: 'img',
    color: 'transparent',
  };

  const gradientText = {
    position: 'relative',
    fontSize: 'inherit',
    fontWeight: 'inherit',
    color: 'white',
    WebkitBackgroundClip: 'img',
    backgroundClip: 'img',
  };
  
  const defaultStyle = {
    backgroundColor: 'transparent',
    color: 'white',
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
        backgroundImage: 'url("src/assets/images/bSiI6FlkJxuBLEHsIgkXMoJrnhB2.jpg")',
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
          <div className='relative flex space-x-2 rounded-full' style={{ border: '1px solid rgb(9, 184, 184)' }}>
            <button
              onClick={() => setSelected('popular')}
              style={selected === 'popular' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'popular' ? gradientText : {}}>
                Popular
              </span>
            </button>
            <button
              onClick={() => setSelected('streaming')}
              style={selected === 'streaming' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'streaming' ? gradientText : {}}>
                Streaming
              </span>
            </button>
            <button
              onClick={() => setSelected('tv')}
              style={selected === 'tv' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'tv' ? gradientText : {}}>
                On TV
              </span>
            </button>
            <button
              onClick={() => setSelected('rent')}
              style={selected === 'rent' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'rent' ? gradientText : {}}>
                For Rent
              </span>
            </button>
            <button
              onClick={() => setSelected('theaters')}
              style={selected === 'theaters' ? selectedStyle : defaultStyle}
              className='px-4 py-2 rounded-full text-sm font-medium'
            >
              <span style={selected === 'theaters' ? gradientText : {}}>
                In Theaters
              </span>
            </button>
          </div>
        </div>

        <div className='relative overflow-x-auto slider-container'>
          <Slider {...sliderSettings}>
            {latestTrailer.map(item => (
              <div key={item.id} className='inline-block w-full px-2'>
                <div className='rounded-lg'>
                  <div className='relative'>
                    <a title={item.title}>
                      <img
                        loading="lazy"
                        className='w-full h-48 sm:h-40 rounded-lg object-cover'
                        src={item.image}
                        alt={item.title}
                      />
                    </a>
                    <div className='absolute top-2 right-2'>
                      <a href="#" aria-label="View Item Options">
                        <div className='bg-white px-2 pb-1 rounded-full hover:bg-blue-400'>
                          <i className="fa-solid fa-ellipsis text-xs"></i>
                        </div>
                      </a>
                    </div>
                  </div>
                  <div className='mt-4 ms-2'>
                  <h2 className='text-lg font-semibold'>
  <a className='text-white'>
    {item.title.length > 25 ? `${item.title.slice(0, 22)}...` : item.title}
  </a>
</h2>

                    <h2 className='text-sm mt-2 mb-4'>
                      <a className='text-white'>{item.description}</a>
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default TrailorSlider;