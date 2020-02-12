import React from "react";
import { Row, Icon } from "antd";
import MovieListItem from "./MovieListItem";
import moment from "moment";
function MovieSectionList({ movies }) {
  return (
    <div className="movie-list-wrapper mx-auto">
      <div
        style={{
          background: "#3f4c6b",
          // background: "linear-gradient(90deg, #4b6cb7 0%, #182848 100%)",
          // background: "linear-gradient(to bottom, #606c88 0%,#3f4c6b 100%)",
          // background: "linear-gradient(135deg, #eeeeee 0%,#cccccc 100%)",
          padding: "10px"
        }}
      >
        <Row gutter={[16, 24]}>
          {Object.entries(movies).map(([date, list]) => (
            <div key={moment(date).format("YYYYMMDD")}>
              <h3
                style={{
                  color: "#eee",
                  margin: "20px 0px 0px 15px",
                  fontWeight: 600
                }}
              >
                <Icon type="calendar" /> {moment(date).format("ddd MMM Do")}
              </h3>
              <MovieList key={date} movies={list} />
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
}

function MovieList({ movies }) {
  return (
    <div className="movie-list-wrapper mx-auto">
      <div style={{ background: "", padding: "10px 10px 40px 10px" }}>
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
