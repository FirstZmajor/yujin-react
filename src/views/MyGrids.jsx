import React from 'react';
import GridLayout from 'react-grid-layout';
import { Card, CardHeader, CardBody, Row, Col, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { SizeMe } from 'react-sizeme';

import '../App.css';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

class MyGrids extends React.Component {
  // eslint-disable-next-line
    constructor() {
        super();
        this.state = {color: "red"};
      }
    render() {
      var layout = [
        {i: 'a', x: 0, y: 0, w: 2, h: 2, static: false},
        {i: 'b', x: 1, y: 0, w: 2, h: 2, minW: 2, maxW: 5},
        {i: 'c', x: 4, y: 0, w: 2, h: 2}
      ];
      return (
        <>
          <CardHeader>
            <h5 className="title">100 Awesome Nucleo Icons</h5>
            <p className="category">
              Handcrafted by our friends from{" "}
            </p>
          </CardHeader>
          <CardBody className="all-icons">
          <Row>
              <Col md={12} xs={12}>
                <GridLayout className="layout" layout={layout} cols={12} rowHeight={100} width={1200}>
                  <div key='a' style={{width: '20rem', position: 'absolute'}}>
                    <SizeMe
                      monitorWidth
                      monitorHeight
                      render={({ size }) => 
                        <Card style={{width: '100%', height: '100%'}}>
                          <CardBody>
                              <CardTitle>Card title AAA </CardTitle>
                              <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle>
                              <CardText>My width is {size.width}px & height is {size.height}</CardText>
                          </CardBody>
                        </Card>
                      }
                    />
                  </div>
                  <div key='b' style={{width: '20rem', position: 'absolute'}}>
                    <SizeMe
                      monitorWidth
                      monitorHeight
                      render={({ size }) => 
                        <Card style={{width: '100%', height: '100%'}}>
                          <CardBody>
                              <CardTitle>Card title BBB </CardTitle>
                              <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle>
                              <CardText>My width is {size.width}px & height is {size.height}</CardText>
                          </CardBody>
                        </Card>
                      }
                    />
                  </div><div key='c' style={{width: '20rem', position: 'absolute'}}>
                    <SizeMe
                      monitorWidth
                      monitorHeight
                      render={({ size }) => 
                        <Card style={{width: '100%', height: '100%'}}>
                          <CardBody>
                              <CardTitle>Card title CCC </CardTitle>
                              <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle>
                              <CardText>My width is {size.width}px & height is {size.height}</CardText>
                          </CardBody>
                        </Card>
                      }
                    />
                  </div>
                </GridLayout>
              </Col>
            </Row>
          </CardBody>
            
        </>
      );
    }
  }

  export default MyGrids;