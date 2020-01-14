import React from "react";
import { Row } from "antd";
import MovieListItem from "./MovieListItem";

function MovieList({ movies }) {
  return (
    <div className="movie-list-wrapper mx-auto">
      <div style={{ background: "#ABABAB", padding: "10px" }}>
        <Row gutter={[16, 24]}>
          {(movies || []).map(movie => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </Row>
      </div>
    </div>
  );
}

export { MovieList };
