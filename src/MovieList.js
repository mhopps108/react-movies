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
  const [date, setDate] = useState(moment());
  const [url, setUrl] = useState(discoveryUrlByWeek());
  const [{ data, isLoading, isError }, doFetch] = useDataApi(url, {
    results: []
  });
  const [page, setPage] = useState(1);

  const [rmcvisable, setRMCVisable] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  useEffect(() => {
    setUrl(discoveryUrlByWeek(date, releaseType, page));
    doFetch(url);
    console.log("data");
    console.log(data);
  }, [date, url, doFetch, releaseType, page]);

  useEffect(() => {
    console.log("STATE");
    console.log(`date: ${date}`);
    console.log(`url: ${url}`);
  }, [date, url]);

  const dateRangeStr = () => {
    const s =
      `${moment(date)
        .startOf("week")
        .format("MMM DD YYYY")}` +
      " to " +
      `${moment(date)
        .endOf("week")
        .format("MMM DD YYYY")}`;
    return s;
  };

  return (
    <div className="movie-list-wrapper mx-auto">
      <Row>
        <Col span={10}>
          <WeekPicker
            id={"week-picker"}
            format={"MMM Do YY"}
            onChange={date => setDate(moment(date))}
          />
        </Col>
        <Col span={14}>
          <h4>{dateRangeStr()}</h4>
        </Col>
      </Row>
      <Row>
        <Col>
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
          <Button onClick={() => setDate(moment(date).subtract(7, "d"))}>
            <Icon type="left" />
            Last Week
          </Button>
          {/* <Button onClick={() => setCalendarVisible(true)}>
            <Icon type="calendar" />
            Calendar
          </Button> */}
          <Button onClick={() => setDate(moment())}>
            <Icon type="calendar" />
            Today
          </Button>
          <Button onClick={() => setDate(moment(date).add(7, "d"))}>
            Next Week
            <Icon type="right" />
          </Button>
        </Button.Group>
      </Row>
      <Row>
        <Button.Group size="default">
          <Button
            disabled={data.page - 1 <= 0}
            onClick={() => setPage(page => page - 1)}
          >
            <Icon type="left" />
            {data.page - 1}
          </Button>
          <Button onClick={() => ""}>
            {data.page} of {data.total_pages}
          </Button>
          <Button onClick={() => ""}>
            {data.results.length} / {data.total_results}
          </Button>
          <Button
            disabled={data.page + 1 > data.total_pages}
            onClick={() => setPage(page => page + 1)}
          >
            {data.page + 1}
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
        onClose={() => setCalendarVisible(false)}
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
