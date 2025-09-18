import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const TRENDING_URL = `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`;

const TrendingSlider = () => {
  const [movies, setMovies] = useState([]);
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(TRENDING_URL);
        setMovies(data.results);
      } catch (err) {
        console.error(" Trending movies fetch error:", err);
      }
    };
    fetchMovies();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
    slidesToShow: 4,
    responsive: [
      { breakpoint: 1920, settings: { slidesToShow: 6 } },
      { breakpoint: 1536, settings: { slidesToShow: 6 } },
      { breakpoint: 1280, settings: { slidesToShow: 5 } },
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
      { breakpoint: 320, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="py-3 px-11 max-w-4xl mx-auto bg-neutral-200 dark:bg-gray-800 ">
      <div>
        <h2 className="relative group text-2xl md:text-3xl font-extrabold mb-8  uppercase pl-6 tracking-widest overflow-hidden">
          {/* Sol kırmızı çubuk */}
          <span
            className="absolute left-0 top-0 h-full w-1 bg-red-600
               transition-transform duration-700 ease-in-out
               group-hover:translate-y-full"
          ></span>
          {/* Başlık */}
          <span className="text-red-600 transition-transform duration-700 group-hover:translate-y-1 inline-block">
            Trending
          </span>{" "}
          <span className="text-black dark:text-white transition-transform duration-700 group-hover:translate-y-1 inline-block">
            This Week
          </span>
        </h2>{" "}
      </div>
      <div className="">
        <Slider {...settings}>
          {movies.map(
            ({ id, title, poster_path, vote_average, release_date }) => (
              <div key={id} className="px-1 sm:px-2 max-w-full">
                <div
                  className="relative group cursor-pointer overflow-hidden rounded-xl shadow-lg"
                  onClick={() => navigate(`/details/${id}`)}
                >
                  <img
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : "https://via.placeholder.com/500x750?text=No+Image"
                    }
                    alt={title}
                    className="h-full w-full object-cover rounded-xl transform transition-transform duration-300 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
                    <h3
                      className="
               text-white font-semibold 
                  text-xs sm:text-sm md:text-base lg:text-lg 
                  truncate"
                      title={title}
                    >
                      {title}
                    </h3>
                    <p className="text-yellow-400 font-bold text-xs sm:text-sm">
                      ⭐ {vote_average.toFixed(1)}
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      {release_date}
                    </p>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      </div>
    </div>
  );
};

export default TrendingSlider;
