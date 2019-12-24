import React, { useState, useEffect } from "react";
import {
  Card,
  Calendar,
  Row,
  Col,
  DatePicker,
  Button,
  Icon,
  Drawer
} from "antd";
import { discoveryUrlByWeek, buildDiscoveryUrl, movieLists } from "./tmdb-api";
import { useDataApi } from "./use-data-api.js";
import MovieListItem from "./MovieListItem";
import moment from "moment";
import { Calendar as RMCCalendar } from "rmc-calendar";
import enUS from "rmc-calendar/lib/locale/en_US";
import "rmc-calendar/assets/index.css";

const { WeekPicker } = DatePicker;

// NEEDED: data, isLoading, isError

function MovieList({ setVisible, releaseType }) {
  // const url = buildDiscoveryUrl(11);
  const [date, setDate] = useState(moment());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });

  const [rmcvisable, setRMCVisable] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    setUrl(discoveryUrlByWeek(date, releaseType));
    doFetch(url);
  }, [date, url, doFetch, releaseType]);

  useEffect(() => {
    console.log("STATE");
    console.log(`date: ${date}`);
    console.log(`url: ${url}`);
  }, [date, url]);

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

  const handleNextWeek = () => {
    // const thisDate = moment(date);
    // setDate(thisDate.subtract(7, "d"));

    setDate(moment(date).subtract(7, "d"));
  };

  const onDatePickerChange = date => {
    const selector = document.getElementById("week-picker");
    if (selector) selector.blur();
    setDate(moment(date));
  };

  return (
    <div className="movie-list-wrapper mx-auto">
      {/* <h1 className="text-center">Now Playing ({data.results.length})</h1> */}
      <Row>
        <Col span={4}>
          <WeekPicker
            id={"week-picker"}
            // format={"MMM Do YY"}
            format={""}
            // onChange={date => setDate(moment(date))}
            onChange={onDatePickerChange}
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
      <Row>
        <Button.Group size="default">
          <Button onClick={handleNextWeek}>
            <Icon type="left" />
            Last Week
          </Button>
          <Button onClick={() => setCalendarVisible(true)}>
            <Icon type="calendar" />
            Calendar
          </Button>
          <Button onClick={() => setDate(moment(date).add(7, "d"))}>
            Next Week
            <Icon type="right" />
          </Button>
        </Button.Group>
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
        title="Select Week"
        placement={"bottom"}
        closable={true}
        onClose={() => ""}
        visible={calendarVisible}
        height={450}
        zIndex={100}
      >
        <div
          style={{
            width: "100%",
            border: "1px solid #d9d9d9",
            borderRadius: 4
          }}
        >
          <Calendar fullscreen={false} onPanelChange={() => ""} />
        </div>
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
