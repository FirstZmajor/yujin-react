import React from 'react'
import { CardHeader, CardBody, Button, Row, Col } from 'reactstrap';
import * as d3 from 'd3';
import _ from "lodash";

import ProgressArc from '../visualization/ProgressArc';
import BubbleChart from '../visualization/BubbleChart';


class MyChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      percentComplete: 0.3
    };
    this.togglePercent = this.togglePercent.bind(this);
  }
  dateParse = d3.timeParse("%d %b %Y");


  togglePercent() {
    const percentage = this.state.percentComplete === 0.3 ? 0.7 : 0.3;
    this.setState({percentComplete: percentage});
  }

  render() {
      return (
        <>
          <CardHeader>
            <h5 className="title">Lab for D3 Charts</h5>
            <p className="category">
              dddddddd
            </p>
          </CardHeader>
          <CardBody className="all-icons">
          <Row>
            <Col md={12} xs={12}>
              <Button color="primary" className="btn-round" onClick={this.togglePercent}>
                Toggle Arc 
              </Button>
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
            <ProgressArc
              height={300}
              width={300}
              innerRadius={100}
              outerRadius={110}
              id="d3-arc"
              backgroundColor="#e6e6e6"
              foregroundColor="#00ff00"
              percentComplete={this.state.percentComplete}
            />
            
            <BubbleChart
              width={800}
              height={800}
              fontFamily="Arial"
              data={[
                { label: 'CRM', value: 1 },
                { label: 'API', value: 1 },
                { label: 'Data', value: 1 },
                { label: 'Commerce', value: 1 },
                { label: 'AI', value: 3 },
                { label: 'Management', value: 5 },
                { label: 'Testing', value: 6 },
                { label: 'Mobile', value: 9 },
                { label: 'Conversion', value: 9 },
                { label: 'Misc', value: 21 },
                { label: 'Databases', value: 22 },
                { label: 'DevOps', value: 22 },
                { label: 'Javascript', value: 23 },
                { label: 'Languages / Frameworks', value: 25 },
                { label: 'Front End', value: 26 },
                { label: 'Content', value: 26 },
              ]}
            />

            </Col>
          </Row>
          </CardBody>
        </>  
      );
  }
}

export default MyChart