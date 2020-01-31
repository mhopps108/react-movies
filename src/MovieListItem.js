import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import tmdbData from "./tmdb-data.js";
import moment from "moment";

import { useMovieDetails } from "./useMovieDetails";
import { useImdbRating } from "./useImdbRating";

const { Title, Paragraph, Text } = Typography;

function MovieListItem({ movie }) {
  // console.log("a movie");
  // console.log(movie);
  const {
    id,
    title,
    poster_path,
    release_date = "0000",
    vote_average,
    genre_ids,
    vote_count
  } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4) || "0000";

  const [imdbRating, setImdbRating] = useState();

  const allGenres = tmdbData.genres;

  const [data, isLoading, isError] = useMovieDetails(id);
  const [rating, isRatingLoading, isRatingError, setImdbId] = useImdbRating();

  const genresToString = () => {
    const a = allGenres.filter(item => {
      return genre_ids.includes(item.id);
    });
    return a.map(item => item.name).join(", ");
  };

  useEffect(() => {
    console.log(`MovieData: ${id} - ${title}`);
    console.log(data);
    if (data && data.imdb_id) {
      setImdbId(data.imdb_id);
    }
  }, [data]);

  useEffect(() => {
    console.log("movie - rating");
    console.log(rating);
  }, [rating]);

  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      lg={{ span: 8 }}
      style={{ paddingBottom: "0px" }}
    >
      <div
        style={{
          background: "white",
          padding: "6px",
          height: "150px",
          // maxWidth: "300px",
          display: "flex",
          borderRadius: "5px",
          border: "1px solid rgba(0,0,0,0.25)",
          // boxShadow: "3px 3px 3px 0px rgba(0,0,0,0.25)"
          boxShadow: "0 2px 4px 2px rgba(0,0,0,.25)"
        }}
      >
        {/* <div style={{ overflow: "hidden", width: "92px", height: "auto" }}> */}
        {/* <div style={{ width: "92px", height: "auto", alignSelf: "center" }}> */}
        <div
          style={{
            minWidth: "92px",
            height: "138px",
            // height: "auto",
            backgroundImage: `url(${imgUrl})`,
            // objectFit: "contain"
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius: "5px"
          }}
        >
          {/* <img
            style={{
              width: "100%",
              height: "100%",
              // objectFit: "contain",
              borderRadius: "5px"
            }}
            src={imgUrl}
            alt={"no-poster"}
          /> */}
        </div>
        <div style={{ paddingLeft: "1rem", paddingTop: "0.5rem" }}>
          <h4 style={{ fontSize: "1.1rem" }}>{title}</h4>
          <div>
            <p style={{ margin: 0 }}>
              {moment(release_date).format("MMM DD YYYY")}
            </p>
            <p style={{ margin: 0 }}>
              {vote_average} / 10 ({vote_count} votes) -- {rating}
            </p>
            {/* <p style={{ margin: 0 }}>
              {rating} / 10 ({vote_count} votes)
            </p> */}
            <p style={{ margin: 0 }}>{genresToString()}</p>
          </div>
        </div>
      </div>
    </Col>
  );
}
/*
function MovieListItem({ movie }) {
  const { id, title, poster_path, release_date, vote_average } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4);

  return (
    <Col style={{ padding: "10px" }}>
      <Card title={title}>
        <Row>
          <Col span={8}>
            <img src={imgUrl} alt={title} />
          </Col>
          <Col span={16}>
            <Col className="card-text w-25">Release: {release_date}</Col>
            <Col className="card-text w-25">tmdbid: {id}</Col>
            <Col className="card-text w-25">Vote: {vote_average}/10</Col>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
*/

export default MovieListItem;

{
  /*
  <span class="imdbRatingPlugin" data-user="ur25742841" data-title="tt0371746" data-style="p3">
  <a href="https://www.imdb.com/title/tt0371746/?ref_=plg_rt_1">
  <img src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/images/imdb_37x18.png" alt=" Iron Man (2008) on IMDb" />
  
</a>
</span>
<script>
(function(d,s,id){var js,stags=d.getElementsByTagName(s)[0];
  if(d.getElementById(id)){return;}
  js=d.createElement(s);
  js.id=id;
  js.src="https://ia.media-imdb.com/images/G/01/imdb/plugins/rating/js/rating.js";
  stags.parentNode.insertBefore(js,stags);})
(document,"script","imdb-rating-api");
</script> 
*/
}
