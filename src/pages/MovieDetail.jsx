import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});
  const [videoKey, setVideoKey] = useState("");

  const {
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    vote_count,
  } = movieDetail;

  const API_KEY = process.env.REACT_APP_TMDB_KEY;
  const movieDetailBaseUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;
  const baseImageUrl = "https://image.tmdb.org/t/p/w1280";
  const defaultImage =
    "https://images.unsplash.com/photo-1581905764498-f1b60bae941a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80";
  const videoUrl = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`;

  useEffect(() => {
    axios
      .get(movieDetailBaseUrl)
      .then((res) => setMovieDetail(res.data))
      .catch((err) => console.log(err));
    
  }, []);

  return (
    <div className="md:container px-10 mx-auto pt-5 pb-8">
      <h1 className="text-center text-gray-900 dark:text-white text-4xl p-4 font-['Oswald'] ">{title}</h1>
     


      <div className="md:container flex justify-center px-5">
        <div className=" flex flex-col lg:flex-row max-w-6xl rounded-lg bg-gray-100 dark:bg-gray-dark-second shadow-lg">
          <img
            className=" lg:w-1/3 h-96 lg:h-[600px] object-cover rounded-t-lg md:rounded-none md:rounded-l-lg"
            src={poster_path ? baseImageUrl + poster_path : defaultImage}
            alt="poster"
          />
          <div className="p-6 flex flex-col justify-between">
            <div>
              <h5 className="text-gray-900 dark:text-gray-50 text-xl font-semibold mt-4 mb-2">
                Overview
              </h5>
              <p className=" font-sans tracking-wide leading-relaxed text-lg text-gray-700 dark:text-gray-200 mb-6">
                {overview}
              </p>
            </div>
            <ul className=" font-sans text-lg tracking-wide rounded-lg border border-gray-400 text-black dark:text-white">
              <li className="px-6 py-2 border-b border-gray-400 w-full rounded-t-lg">
                {"Release Date : " + release_date}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {"Rate : " + vote_average}
              </li>
              <li className="px-6 py-2 border-b border-gray-400 w-full">
                {"Total Vote : " + vote_count}
              </li>
              <li className="px-6 py-2 border-gray-400 w-full rounded-t-lg">
                <Link
                  to={-1}
                  className="text-blue-600 hover:text-blue-700 transition duration-300 ease-in-out mb-4"
                >
                  Go Back
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;