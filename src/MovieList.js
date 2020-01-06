import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import MovieListItem from "./MovieListItem";
import moment from "moment";

function MovieList({ movies }) {
  // console.log("MoviesList - Moives:");
  // console.log(movies);
  return (
    <div className="movie-list-wrapper mx-auto">
      <div style={{ background: "white", padding: "10px" }}>
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
