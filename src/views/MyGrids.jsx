import React from 'react';
import GridLayout from 'react-grid-layout';
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";
// core components
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";
import '../App.css';

class MyGrids extends React.Component {
    constructor() {
        super();
        this.state = {color: "red"};
      }

    render() {
      var layout = [
        {i: 'a', x: 0, y: 0, w: 1, h: 2, static: false},
        {i: 'b', x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4},
        {i: 'c', x: 4, y: 0, w: 1, h: 2}
      ];
      return (
        <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12}>
            <Card>
                <CardHeader>
                  {/* <h5 className="title">Now Ui Table Heading</h5>
                  <p className="category">
                    Created using Montserrat Font Family
                  </p> */}
                </CardHeader>
                <CardBody>
                  <GridLayout className="layout" layout={layout} cols={12} rowHeight={30} width={1200}>
                    <div className="my-arias" key="a">a</div>
                    <div className="my-arias" key="b">b</div>
                    <div className="my-arias" key="c">c</div>
                  </GridLayout>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
      );
    }
  }

  export default MyGrids;