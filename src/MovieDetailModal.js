import React, { useState, useEffect } from "react";
import { Card, Row, Col, Typography, Button, Modal } from "antd";
import tmdbData from "./tmdb-data.js";
import moment from "moment";

import { useMovieDetails } from "./useMovieDetails";
import { useImdbRating } from "./useImdbRating";

const genresToString = genreIds => {
  const a = tmdbData.genres.filter(item => {
    return genreIds.includes(item.id);
  });
  return a.map(item => item.name).join(", ");
};

const filterReleaseDates = datesData => {
  // release_dates?.results

  const dates = datesData.find(item => item.iso_3166_1 === "US");
  console.log("dates");
  console.log(dates);
  return dates.release_dates.map(release => (
    <p key={release.type}>
      <span>({release.type})</span>
      {"  "}
      {moment(release.release_date).format("MM DD YYYY")}
    </p>
  ));
  // return dates;
};

function MovieDetailModal({ movie, isOpen, setIsOpen }) {
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
  const [releaseDates, setReleaseDates] = useState([]);

  const { data, isLoading, isError, setTmdbId } = useMovieDetails();
  // const [imdbRating, setImdbId] = useImdbRating();

  useEffect(() => {
    if (isOpen) {
      setTmdbId(id);
    }
  }, [setTmdbId, isOpen, id]);

  // useEffect(() => {
  // console.log(`MovieData: ${id} - ${title}`);
  // console.log(data);
  // if (isOpen) {
  //   if (data && data.imdb_id) {
  //     setImdbId(data.imdb_id);
  //   }
  // }
  // }, [data, setImdbId]);

  useEffect(() => {
    if (data) {
      const releaseDatesData =
        data && data.release_dates && data.release_dates.results;
      setReleaseDates(filterReleaseDates(releaseDatesData));
    }
  }, [data]);

  return (
    <Modal
      title={title}
      visible={isOpen}
      onOk={() => setIsOpen(false)}
      onCancel={() => setIsOpen(false)}
      width={"100%"}
      // bodyStyle={{ height: "90vh" }}
      style={{ top: 10 }}
    >
      <div
        style={{
          // background: "white",
          // padding: "6px",
          // height: "150px",
          // maxWidth: "300px",
          display: "flex"
          // borderRadius: "5px",
          // border: "1px solid rgba(0,0,0,0.25)",
          // boxShadow: "3px 3px 3px 0px rgba(0,0,0,0.25)"
          // boxShadow: "0 2px 4px 2px rgba(0,0,0,.25)"
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
        />
        <div style={{ paddingLeft: "1rem", paddingTop: "0.5rem" }}>
          <div>
            <p style={{ margin: 0 }}>
              {moment(release_date).format("MMM DD YYYY")}
            </p>
            <p style={{ margin: 0 }}>
              {vote_average} / 10 ({vote_count} votes)
            </p>
            {/* <p style={{ margin: 0 }}>
              IMDb: {imdbRating || "X"} / 10 ({""} votes)
            </p> */}
            <p style={{ margin: 0 }}>{genresToString(genre_ids)}</p>
            <p style={{ margin: 0 }}>{data ? data.runtime : ""}</p>
            <p style={{ margin: 0 }}>{data?.revenue}</p>

            <a href={`https://imdb.com/title/${data?.imdb_id}`}>IMDb</a>
            <p style={{ margin: 0 }}>{data?.overview}</p>
            {releaseDates}
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MovieDetailModal;
