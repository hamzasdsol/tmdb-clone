import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ColorThief from 'color-thief-browser';
import { FaListUl, FaPlay } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import { IoBookmarkSharp } from 'react-icons/io5';

// Define the formatReleaseDate function
const formatReleaseDate = (dateString) => {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const TrendingDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [textColor, setTextColor] = useState('text-white');
  const [trailer, setTrailer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const canvasRef = useRef(null);
  const modalRef = useRef(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  useEffect(() => {
    if (movie) {
      const img = document.createElement('img');
      img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      img.crossOrigin = 'Anonymous';
      img.onload = () => {
        const colorThief = new ColorThief();
        const dominantColor = colorThief.getColor(img);
        const isDark = dominantColor[0] * 0.299 + dominantColor[1] * 0.587 + dominantColor[2] * 0.114 < 186;
        setTextColor(isDark ? 'text-white' : 'text-black');
      };
    }
  }, [movie]);

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
        if (response.data.results.length > 0) {
          setTrailer(response.data.results[0]);
        }
      } catch (error) {
        console.error("Error fetching trailers:", error);
      }
    };

    if (movie) {
      fetchTrailer();
    }
  }, [movie, id]);

  useEffect(() => {
    if (movie) {
      drawPercentage(movie.vote_average * 10);
    }
  }, [movie]);

  const drawPercentage = (percentage) => {
    const canvas = canvasRef.current;
    if (canvas) {
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
    }
  };

  const handlePlayTrailers = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showModal]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="relative flex flex-col cursor-pointer lg:flex-row bg-cover bg-center bg-no-repeat lg:px-110px py-20" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`, zIndex: 1 }}>
      <div
        style={{
          background: 'linear-gradient(78deg, #5c5c5ca6, #5c5c5ca6)',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
        }}
      />
      <div className="flex justify-center items-center w-full lg:w-auto lg:flex-1 mt-6 lg:mt-0 lg:mr-10 cursor-pointer" style={{ zIndex: 2 }}>
        <div className="w-full max-w-md lg:w-[25rem] h-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full"
            style={{ zIndex: 3 }}
          />
        </div>
      </div>
      {/* right portion */}
      <div className="z-10 p-4 cursor-pointer sm:p-6 lg:p-8 lg:mx-0 lg:flex-1 text-left mt-6 lg:mt-0 lg:ml-10" style={{ zIndex: 2 }}>
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 ${textColor}`}>
          {movie.title}
        </h1>
        <div className={`text-sm sm:text-base cursor-pointer md:text-lg mb-4 flex flex-wrap gap-4 ${textColor}`}>
          <span>{formatReleaseDate(movie.release_date)} (US)</span>
          <span>{movie.genres.map((genre) => genre.name).join(', ')}</span>
          <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
        </div>
        <canvas
          ref={canvasRef}
          width="50"
          height="50"
          style={{ backgroundColor: 'rgb(3, 37, 65)' }}
          className="mb-4 rounded-full"
        ></canvas>
        <div className="flex flex-wrap items-center gap-4 mb-4">
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
            <FaListUl className="text-white text-xl" />
          </div>
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
            <IoIosHeart className="text-white text-xl" />
          </div>
          <div className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-full" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
            <IoBookmarkSharp className="text-white text-xl" />
          </div>
          <div className="flex items-center zIndex-5 gap-2 sm:gap-4 cursor-pointer" onClick={handlePlayTrailers} style={{ zIndex: 2 }}>
            <FaPlay className="text-white text-2xl " />
            <span className="text-white text-base font-semibold cursor-pointer">Play Trailer</span>
          </div>
        </div>
        <h2 className={`text-xl sm:text-2xl font-semibold mb-2 ${textColor}`}>
          Overview
        </h2>
        <p className={`text-base sm:text-lg ${textColor}`}>
          {movie.overview}
        </p>
      </div>

      {/* Modal */}
      {showModal && trailer && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-70 z-50" onClick={handleClickOutside}>
          <div
            ref={modalRef}
            className="bg-white rounded-lg overflow-hidden w-full max-w-6xl relative z-60"
            style={{ height: '80%' }} // Adjust height here
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-900"
              style={{ zIndex: 1000 }}
            >
              ×
            </button>
            <iframe
              width="100%"
              height="100%" // Adjust height here
              src={`https://www.youtube.com/embed/${trailer.key}`}
              title={trailer.name}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingDetail;
