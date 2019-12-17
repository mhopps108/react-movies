import React, { useState, useEffect } from "react";
import { Card, Row, Col, DatePicker } from "antd";
import { Drawer, Button, Radio, Calendar, Checkbox } from "antd";
import SingleSelect from "./useAntSelect";
import { discoveryUrlByWeek, buildDiscoveryUrl, movieLists } from "./tmdb-api";
import { useDataApi } from "./use-data-api.js";
import MovieListItem from "./MovieListItem";
import tmdbData from "./tmdb-data.js";
import NamedTag from "./useCheckableTag.js";
import moment from "moment";
const { WeekPicker } = DatePicker;

function MovieList() {
  // const url = buildDiscoveryUrl(11);
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });
  const [visible, setVisible] = useState(false);
  const [genres, setGenres] = useState([]);

  const allGenres = tmdbData.genres.map(g => g.name);
  console.log(`${genres}`);
  const [plainOptions, setPlainOptions] = useState(allGenres);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  useEffect(() => {
    setUrl(discoveryUrlByWeek(date));
    doFetch(url);
  }, [date, url, doFetch]);

  // console.log("data");
  // console.log(data);

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

  const dateRangeStr = () => {
    const s =
      `${moment(date)
        .startOf("week")
        .format("YYYY-MM-DD")}` +
      " -- " +
      `${moment(date)
        .endOf("week")
        .format("YYYY-MM-DD")}`;
    return s;
  };

  const onChange = checkedList => {
    setCheckedList(checkedList);
    setIndeterminate(
      !!checkedList.length && checkedList.length < plainOptions.length
    );
    setCheckAll(checkedList.length === plainOptions.length);
  };

  const onCheckAllChange = e => {
    setCheckedList(e.target.checked ? plainOptions : []);
    setIndeterminate(false);
    setCheckAll(e.target.checked);
  };

  return (
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing ({data.results.length})</h1>

      <WeekPicker
        format={"MMM Do YY"}
        onChange={date => setDate(moment(date))}
        // style={{ width: "300px" }}
      />
      <h4>Date: {dateRangeStr()}</h4>
      <Button type="primary" onClick={() => setVisible(true)}>
        Open
      </Button>

      <Drawer
        title="Basic Drawer"
        placement={"bottom"}
        closable={false}
        onClose={visable => setVisible(!visable)}
        visible={visible}
        // height={"200"}
      >
        <div style={{ borderBottom: "1px solid #E9E9E9" }}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <Checkbox.Group
          options={plainOptions}
          value={checkedList}
          onChange={onChange}
        />
      </Drawer>

      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div style={{ background: "#696969", padding: "30px" }}>
            <Row>
              {data.results.map(movie => (
                <MovieListItem key={movie.id} movie={movie} />
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
}

export { MovieList };
