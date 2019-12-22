import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography } from "antd";

const { Title, Paragraph, Text } = Typography;

/*
MM dd     Title     btn
Year  Runtime  Cert
Ratings Imdb tmdb?
Genres(3)
*/
function MovieListItem({ movie }) {
  const { id, title, poster_path, release_date, vote_average } = movie;
  const imgUrl = `https://image.tmdb.org/t/p/w92/${poster_path}`;
  const year = release_date.substring(0, 4);

  return (
    <Col
      xs={{ span: 24 }}
      sm={{ span: 12 }}
      lg={{ span: 8 }}
      style={{ paddingBottom: "10px" }}
    >
      <Card bodyStyle={{ padding: "5px" }}>
        <Row type="flex" justify="space-around" align="middle">
          <Col xs={{ span: 7 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <img src={imgUrl} alt={title} />
          </Col>
          <Col xs={{ span: 17 }} sm={{ span: 16 }} lg={{ span: 18 }}>
            <Title level={4}>{title}</Title>
            <Text type="secondary">Release: {release_date}</Text>
            <br />
            <Text type="secondary">tmdbid: {id}</Text>
            <br />
            <Text type="secondary">Vote: {vote_average}/10</Text>
            <br />
          </Col>
        </Row>
      </Card>
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
