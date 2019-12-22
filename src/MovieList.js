import React, { useState, useEffect } from "react";
import { Card, Row, Col, DatePicker, InputNumber } from "antd";
import { Drawer, Button, Radio, Calendar, Checkbox, Slider } from "antd";
import SingleSelect from "./useAntSelect";
import { discoveryUrlByWeek, buildDiscoveryUrl, movieLists } from "./tmdb-api";
import { useDataApi } from "./use-data-api.js";
import MovieListItem from "./MovieListItem";
import tmdbData from "./tmdb-data.js";
import NamedTag from "./useCheckableTag.js";
import moment from "moment";
import { Calendar as RMCCalendar } from "rmc-calendar";
import enUS from "rmc-calendar/lib/locale/en_US";
import "rmc-calendar/assets/index.css";
const { WeekPicker } = DatePicker;

function MovieList() {
  // const url = buildDiscoveryUrl(11);
  const [date, setDate] = useState(new Date());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });
  const [releaseType, setReleaseType] = useState(4);
  const [genres, setGenres] = useState([]);

  const [visible, setVisible] = useState(false);

  const allGenres = tmdbData.genres.map(g => g.name);
  const releaseTypes = tmdbData.releaseTypes; //.map(type => type.name);
  const certifications = tmdbData.certifications.US.map(type => type.name);

  const [plainOptions, setPlainOptions] = useState(allGenres);
  const [checkedList, setCheckedList] = useState([]);
  const [indeterminate, setIndeterminate] = useState(true);
  const [checkAll, setCheckAll] = useState(false);

  const [rmcvisable, setRMCVisable] = useState(false);

  useEffect(() => {
    setUrl(discoveryUrlByWeek(date));
    doFetch(url);
  }, [date, url, doFetch]);

  useEffect(() => {
    console.log("STATE");
    console.log(`releaseType: ${releaseType}`);
    console.log(`date: ${date}`);
  }, [releaseType, date]);

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

  function onPanelChange(value, mode) {
    console.log(value, mode);
  }

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

  const onDatePickerChange = date => {
    const selector = document.getElementById("week-picker");
    if (selector) selector.blur();
    setDate(moment(date));
  };

  return (
    <div className="movie-list-wrapper mx-auto">
      <h1 className="text-center">Now Playing ({data.results.length})</h1>
      <Row>
        <Col span={4}>
          <WeekPicker
            id={"week-picker"}
            // format={"MMM Do YY"}
            format={""}
            // onChange={date => setDate(moment(date))}
            onChange={onDatePickerChange}
            onFocus={() => {
              this.preventDefault();
              const selector = document.getElementById("week-picker");
              if (selector) selector.blur();
            }}
            style={{ width: "40px" }}
          />
        </Col>
        <Col span={12}>
          <h4>Date: {dateRangeStr()}</h4>
        </Col>
        <Col span={8}>
          <Button type="primary" onClick={() => setVisible(true)}>
            Open
          </Button>
          <Button type="primary" onClick={() => setRMCVisable(true)}>
            Cal
          </Button>
        </Col>
      </Row>

      <div>
        <RMCCalendar
          locale={enUS}
          visible={rmcvisable}
          onCancel={() => setRMCVisable(false)}
          onConfirm={""}
        />
      </div>

      <Drawer
        title="Filter"
        placement={"right"}
        closable={true}
        onClose={visable => setVisible(!visable)}
        visible={visible}
        // height={"100%"}
        width={"375"}
      >
        {"Release "}
        <Radio.Group
          size={"small"}
          defaultValue={releaseType}
          onChange={e => setReleaseType(e.target.value)}
          buttonStyle="solid"
        >
          {releaseTypes.map(item => (
            <Radio.Button value={item.id}>{item.name}</Radio.Button>
          ))}
        </Radio.Group>
        <div style={{ borderBottom: "1px solid #E9E9E9", marginTop: "10px" }}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          <Row gutter={(4, 4)}>
            {allGenres.map(item => (
              <Col span={8}>
                <Checkbox value={item}>{item}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        <div style={{ borderBottom: "1px solid #E9E9E9", marginTop: "10px" }}>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Check all
          </Checkbox>
        </div>
        <br />
        <Checkbox.Group style={{ width: "100%" }} onChange={onChange}>
          <Row gutter={(4, 4)}>
            {certifications.map(item => (
              <Col span={8}>
                <Checkbox value={item}>{item}</Checkbox>
              </Col>
            ))}
          </Row>
        </Checkbox.Group>
        {"Vote Average"}
        <Slider range defaultValue={[20, 50]} />
        {"Minimum Votes"}
        <Slider range defaultValue={[20, 50]} />
        <Button type="primary" onClick={() => setVisible(true)}>
          Submit
        </Button>
      </Drawer>

      <div>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          <div style={{ background: "#696969", padding: "10px" }}>
            <Row gutter={[16, 16]}>
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
