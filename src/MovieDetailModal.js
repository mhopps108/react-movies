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

const ReleaseDates = ({ datesData }) => {
  if (!datesData) return null;
  const releaseTypes = {
    1: "Premiere",
    2: "Theatrical (Limited)",
    3: "Theatrical",
    4: "Digital",
    5: "Physical",
    6: "TV"
  };
  const usReleaseDates = datesData.find(item => item.iso_3166_1 === "US");
  const releaseDates = usReleaseDates.release_dates.sort(
    (a, b) => a.type - b.type
  );

  return releaseDates.map(release => (
    <p key={release.type}>
      <span>({releaseTypes[release.type]})</span>
      {"  "}
      {moment(release.release_date).format("MMM DD YYYY")}
    </p>
  ));
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

  // useEffect(() => {
  //   if (data) {
  //     const releaseDatesData =
  //       data && data.release_dates && data.release_dates.results;
  //     setReleaseDates(filterReleaseDates(releaseDatesData));
  //   }
  // }, [data]);

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
            <p style={{ margin: 0 }}>{data ? data.runtime : ""} mins</p>
            <p style={{ margin: 0 }}>
              {data?.budget.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </p>
            <p style={{ margin: 0 }}>
              {data?.revenue.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0
              })}
            </p>

            <a href={`https://imdb.com/title/${data?.imdb_id}`}>IMDb</a>
            <p style={{ margin: 0 }}>{data?.overview}</p>
            <ReleaseDates datesData={data?.release_dates?.results} />
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default MovieDetailModal;

// id: 453405
// imdb_id: "tt1025100"

// title: "Gemini Man"
// release_date: "2019-10-02"
// runtime: 117
// genres: Array[2]
// budget: 138000000
// revenue: 173469516
// vote_average: 5.8
// vote_count: 1382
// popularity: 57.957
// overview: "Ageing assassin, Henry Brogen tries to..."

// backdrop_path: "/sfW7GcOuwZFuCxVoU5ULlkiDJ7Q.jpg"
// poster_path: "/uTALxjQU8e1lhmNjP9nnJ3t2pRU.jpg"

// status: "Released"
// tagline: "Who will save you from yourself?"
// homepage: "http://skydance.com/film/gemini-man/"

// spoken_languages: Array[1]

// videos: Object
// images: Object
// release_dates: Object
// credits: Object
// similar: Object
// recommendations: Object

// original_title: "Gemini Man"
// original_language: "en"
// adult: false
// belongs_to_collection: null
// production_companies: Array[4]
// production_countries: Array[2]
