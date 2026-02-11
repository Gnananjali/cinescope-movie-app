import React from "react";

function MovieCard({ movie }) {
  return (
    <div className="card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450"
        }
        alt={movie.Title}
      />

      <div className="overlay">
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
        <span className="type">{movie.Type}</span>
      </div>
    </div>
  );
}

export default MovieCard;
