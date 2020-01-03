import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";
import tmdbData from "./tmdb-data.js";
import moment from "moment";
const { Title, Paragraph, Text } = Typography;

/*
MM dd     Title     btn
Year  Runtime  Cert
Ratings Imdb tmdb?
Genres(3)
*/

function MovieListItem({ movie }) {
  const {
    id,
    title,
    poster_path,
    release_date,
    vote_average,
    genre_ids,
    vote_count
  } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4);

  const allGenres = tmdbData.genres;

  const genresToString = () => {
    const a = allGenres.filter(item => {
      return genre_ids.includes(item.id);
    });
    return a.map(item => item.name).join(", ");
  };

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
          padding: "5px",
          height: "150px",
          // maxWidth: "300px",
          display: "flex",
          borderRadius: "5px"
        }}
      >
        <div>
          <img
            style={{
              width: "92px",
              height: "auto",
              objectFit: "contain",
              borderRadius: "5px"
            }}
            src={imgUrl}
            alt={"no-poster"}
          />
        </div>
        <div style={{ paddingLeft: "0.5rem" }}>
          <h4 style={{ fontSize: "1.1rem" }}>{title}</h4>
          <div>
            <p style={{ margin: 0 }}>
              {moment(release_date).format("MMM DD YYYY")}
            </p>
            <p style={{ margin: 0 }}>
              {vote_average} / 10 ({vote_count} votes)
            </p>
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
