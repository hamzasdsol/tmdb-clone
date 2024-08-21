import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ColorThief from 'color-thief-browser';
import { FaListUl } from "react-icons/fa";
import { IoIosHeart } from "react-icons/io";
import { IoBookmarkSharp } from "react-icons/io5";
import { FaPlay } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const TrendingDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [textColor, setTextColor] = useState('text-white');
  const [trendingItems, setTrendingItems] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const fetchTrendingItems = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/trending/all/day?api_key=${API_KEY}`);
        setTrendingItems(response.data.results);
      } catch (error) {
        console.error("Error fetching trending items:", error);
      }
    };

    fetchTrendingItems();
  }, []);

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

  // Helper function to format the release date
  const formatReleaseDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // Function to draw the percentage in the canvas
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

  useEffect(() => {
    if (movie) {
      drawPercentage(movie.vote_average * 10);
    }
  }, [movie]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="relative h-[600px] bg-gray-900 ">
      <div
        className="absolute inset-0 bg-cover bg-center pt-20"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.poster_path})`,
          backgroundSize: 'cover',
          top: '0',
          bottom: '0',
          right: '0',
          left: '0',
         
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
        <div className="relative z-10 p-6 max-w-3xl mx-auto">
          <h1 className={`text-5xl font-bold mb-2 ${textColor}`}>
            {movie.title}
          </h1>
          <div className={`text-lg mb-4 flex gap-4 ${textColor}`}>
            <span>{formatReleaseDate(movie.release_date)} (US)</span>
            <span>{movie.genres.map(genre => genre.name).join(', ')}</span>
            <span>{Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m</span>
          </div>
          <canvas
            ref={canvasRef}
            width="50"
            height="50"
            style={{ backgroundColor: 'rgb(3, 37, 65)' }}
            className="mb-4 rounded-full"
          ></canvas>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 flex justify-center items-center rounded-full" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
              <FaListUl className="text-white text-xl" />
            </div>
            <div className="w-12 h-12 flex justify-center items-center rounded-full" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
              <IoIosHeart className="text-white text-xl" />
            </div>
            <div className="w-12 h-12 flex justify-center items-center rounded-full" style={{ backgroundColor: 'rgb(3, 37, 65)' }}>
              <IoBookmarkSharp className="text-white text-xl" />
            </div>
            <div className=" flex">
            <FaPlay className="text-white text-sm ml-6 cursor-pointer mt-2" />
            <span className="text-white text-lg cursor-pointer ms-4 font-semibold">Play Trailors</span> 
            </div>
          </div>
          <h2 className={`text-2xl font-semibold mb-2 ${textColor}`}>
            Overview
          </h2>
          <p className={`text-lg ${textColor}`}>
            {movie.overview}
          </p>
        </div>
      </div>

      <div className="absolute mt-20 left-20 top-4 w-64 h-auto bg-white rounded-lg shadow-lg overflow-hidden lg:mx-110px">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TrendingDetail;
