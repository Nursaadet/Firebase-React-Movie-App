import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";

// Slick CSS (index.js veya App.js’de global import etmeyi unutma)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const TrendingSlider = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(TRENDING_URL);
        setMovies(res.data.results);
      } catch (err) {
        console.error("Trending movies fetch error:", err);
      }
    };
    fetchMovies();
  }, []);

  // Slider settings
  const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: true,
  slidesToShow: 2,
  
  responsive: [
  { breakpoint: 1920, settings: { slidesToShow: 8, slidesToScroll: 1 } },
  { breakpoint: 1536, settings: { slidesToShow: 7, slidesToScroll: 1 } },
  { breakpoint: 1280, settings: { slidesToShow: 6, slidesToScroll: 1 } },
  { breakpoint: 1024, settings: { slidesToShow: 4, slidesToScroll: 1 } },
  { breakpoint: 768, settings: { slidesToShow: 3, slidesToScroll: 1 } },
  { breakpoint: 480, settings: { slidesToShow: 3, slidesToScroll: 1, centerMode: true, centerPadding: '10px' } },
  { breakpoint: 360, settings: { slidesToShow: 2, slidesToScroll: 1, centerMode: true, centerPadding: '5px' } },
  { breakpoint: 320, settings: { slidesToShow: 1, slidesToScroll: 1, centerMode: true, centerPadding: '3px' } },
]


  };

  return (
    <div className="py-6 px-9 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-red-900">
        Trending This Week
      </h2>
      <Slider {...settings}>
        {movies.map((movie) => (
          <div key={movie.id} className="px-1 sm:px-2 ">
            <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title || movie.name}
                className="
                  h-full w-full w-50 h-50
    object-cover object-center block overflow-hidden
    rounded-xl
    transform transition-transform duration-300
    group-hover:scale-105
                "
              />
              {/* Hover Overlay */}
              <div
                className="
                absolute inset-0 
                bg-black bg-opacity-50 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 
                flex flex-col justify-end p-3 
              "
              >
                <h3 className="text-white font-semibold text-sm sm:text-base md:text-lg">
                  {movie.title || movie.name}
                </h3>
                <p className="text-yellow-400 font-bold text-xs sm:text-sm">
                  ⭐ {movie.vote_average.toFixed(1)}
                </p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  {movie.release_date || movie.first_air_date}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TrendingSlider;
