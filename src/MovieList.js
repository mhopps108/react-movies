import React from "react";
import { Row } from "antd";
import MovieListItem from "./MovieListItem";
import moment from "moment";

function MovieSectionList({ movies }) {
  // console.log("movie section list - movies");
  // console.log(movies);

  return (
    <div className="movie-list-wrapper mx-auto">
      <div style={{ background: "", padding: "10px" }}>
        <Row gutter={[16, 24]}>
          {Object.entries(movies).map(([date, list]) => (
            <>
              <h3
                style={{
                  color: "",
                  margin: "20px 0px 0px 15px",
                  fontWeight: 600
                }}
              >
                {moment(date).format("ddd MMM Do")}
              </h3>
              <MovieList key={date} movies={list} />
            </>
          ))}
        </Row>
      </div>
    </div>
  );
}

function MovieList({ movies }) {
  // console.log("movie list - movies");
  // console.log(movies);
  return (
    <div className="movie-list-wrapper mx-auto">
      <div style={{ background: "", padding: "10px" }}>
        <Row gutter={[16, 24]}>
          {(movies || []).map(movie => (
            <MovieListItem key={movie.id} movie={movie} />
          ))}
        </Row>
      </div>
    </div>
  );
}

// function MovieList({ movies }) {
//   return (
//     <div className="movie-list-wrapper mx-auto">
//       <div style={{ background: "#ABABAB", padding: "10px" }}>
//         <Row gutter={[16, 24]}>
//           {(movies || []).map(movie => (
//             <MovieListItem key={movie.id} movie={movie} />
//           ))}
//         </Row>
//       </div>
//     </div>
//   );
// }

export { MovieList, MovieSectionList };
