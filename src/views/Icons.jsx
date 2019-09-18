
import React from "react";
import { CardHeader, CardBody, Row, Col } from "reactstrap";

import icons from "../variables/icons";

class Icons extends React.Component {
  render() {
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
            {icons.map((prop, key) => {
              return (
                <Col
                  lg={2}
                  md={3}
                  sm={4}
                  xs={6}
                  className="font-icon-list"
                  key={key}
                >
                  <div className="font-icon-detail">
                    <i className={"now-ui-icons " + prop} />
                    <p>{prop}</p>
                  </div>
                </Col>
              );
            })}
          </Row>
        </CardBody>
      </>
    );
  }
}

export default Icons;
