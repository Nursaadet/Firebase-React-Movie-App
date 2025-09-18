import React, { useState } from "react";
import { useMovieContext } from "../context/MovieProvider";
import MovieCard from "../components/MovieCard";
import { toastWarnNotify } from "../helpers/ToastNotify";
import { useAuthContext } from "../context/AuthProvider";

const API_KEY = process.env.REACT_APP_TMDB_KEY;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const Main = () => {
  const { movies, loading, getMovies } = useMovieContext();
  const { currentUser } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm && currentUser) {
      getMovies(SEARCH_API + searchTerm);
    } else if (!currentUser) {
      toastWarnNotify("Please log in to search a movie");
    } else {
      toastWarnNotify("Please enter a text");
    }
  };

  console.log({ movies, loading });
  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center p-3 pt-11">
        <input
          type="search"
          className="w-80 h-8 rounded-md p-1 m-2 search-cancel-custom"
          placeholder="Search a movie..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="btn-danger-bordered">Search</button>
      </form>
      <div className="flex justify-center flex-wrap">
        {loading ? (
          <div
            className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
            role="status"
          >
            
          </div>
        ) : (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} />)
        )}
      </div>
    </div>
  );
};

export default Main;
