import React, { useState, useEffect } from "react";
import { Row, Col, InputNumber, Icon } from "antd";
import { Drawer, Button, Radio, Checkbox, Slider } from "antd";
import tmdbData from "./tmdb-data.js";

/*
// NEEDED: allGenres, allReleaseTyles, allCertifications
*/

function Filterer({ visible, setVisible, releaseType, setReleaseType }) {
  // const allGenres = tmdbData.genres.map(g => g.name);
  const allGenres = tmdbData.genres;
  const releaseTypes = tmdbData.releaseTypes; //.map(type => type.name);
  const allCertifications = tmdbData.certifications.US; //.map(type => type.name);

  // const [releaseType, setReleaseType] = useState(4);
  const [genres, setGenres] = useState([]);
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    console.log("FILTERER-STATE");
    // console.log(`releaseType: ${releaseType}`);
    console.log(`genres: ${genres}`);
    console.log(`ratings: ${ratings}`);
  }, [genres, ratings]);

  return (
    <div className="drawer-container">
      <Drawer
        title="Filter"
        placement={"right"}
        closable={true}
        visible={visible}
        onClose={visable => setVisible(!visable)}
        // height={"100%"}
        width={"375"}
      >
        <div style={{ marginBottom: "15px" }}>
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
        </div>

        <div style={{ marginBottom: "15px" }}>
          {"Genres"}

          <Button.Group style={{ paddingLeft: "15px" }}>
            <Button
              size="small"
              onClick={() => setGenres(allGenres.map(item => item.id))}
            >
              All
            </Button>
            <Button size="small" onClick={() => setGenres([])}>
              Clear
            </Button>
          </Button.Group>

          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={checkedList => setGenres(checkedList)}
            value={genres}
          >
            <Row gutter={(4, 4)}>
              {allGenres.map(genre => (
                <Col span={8}>
                  <Checkbox value={genre.id}>{genre.name}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>

        <div style={{ marginBottom: "15px" }}>
          {"Ratings"}

          <Button.Group style={{ paddingLeft: "15px" }}>
            <Button
              size="small"
              onClick={() => setRatings(allCertifications.map(item => item.id))}
            >
              All
            </Button>
            <Button size="small" onClick={() => setRatings([])}>
              Clear
            </Button>
          </Button.Group>

          <Checkbox.Group
            style={{ width: "100%" }}
            onChange={checkedList => setRatings(checkedList)}
            value={ratings}
          >
            <Row gutter={(4, 4)}>
              {allCertifications.map(cert => (
                <Col span={8}>
                  <Checkbox value={cert.id}>{cert.name}</Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>

        {"Vote Average"}
        <Slider range defaultValue={[20, 50]} />
        {"Minimum Votes"}
        <Slider range defaultValue={[20, 50]} />
        <Button type="primary">Submit</Button>
      </Drawer>
    </div>
  );
}

export { Filterer };
