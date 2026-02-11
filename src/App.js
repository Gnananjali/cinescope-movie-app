import React, { useState, useEffect } from "react";
import "./App.css";
import MovieCard from "./components/MovieCard";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const API_KEY = "e4de0495";

  const searchMovies = async () => {
    if (!search.trim()) return;

    setLoading(true);

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${search}&type=movie&apikey=${API_KEY}`
      );

      const data = await response.json();
      console.log("API DATA:", data);

      if (data.Response === "True") {
        const sortedMovies = data.Search.sort(
  (a, b) => parseInt(b.Year) - parseInt(a.Year)
);

setMovies(sortedMovies);

      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }

    setLoading(false);
  };

useEffect(() => {
  fetch(`https://www.omdbapi.com/?s=Avengers&type=movie&apikey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      if (data.Response === "True") {
        setMovies(data.Search);
      }
    });
}, []);


return (
  <div className="app">
    <div className="hero">
      <div className="hero-content">
        <h1>🎬 CineScope</h1>
        <p>Discover movies instantly</p>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search for movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchMovies()}
          />
          <button onClick={searchMovies}>Search</button>
        </div>
      </div>
    </div>

    {loading && <h2 className="loading">Loading...</h2>}

    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard key={movie.imdbID} movie={movie} />
      ))}
    </div>
  </div>
);


}

export default App;
