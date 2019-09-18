import React from "react";
import PerfectScrollbar from "perfect-scrollbar";
import { Route, Switch } from "react-router-dom";
import DemoNavbar from "../components/Navbars/DemoNavbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Sidebar from "../components/Sidebar/Sidebar.jsx";
import FixedPlugin from "../components/FixedPlugin/FixedPlugin.jsx";
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";
import { Card, Row, Col } from 'reactstrap';


import routes from "../routes.js";

var ps;

class Dashboard extends React.Component {
  state = {
    backgroundColor: "blue"
  };
  mainPanel = React.createRef();
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.mainPanel.current);
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
      document.body.classList.toggle("perfect-scrollbar-on");
    }
  }
  componentDidUpdate(e) {
    if (e.history.action === "PUSH") {
      this.mainPanel.current.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
    }
  }
  handleColorClick = color => {
    this.setState({ backgroundColor: color });
  };
  render() {
    return (
      <div className="wrapper">
        <Sidebar
          {...this.props}
          routes={routes}
          backgroundColor={this.state.backgroundColor}
        />
        
        <div className="main-panel" ref={this.mainPanel}>
          <DemoNavbar {...this.props} />
          <PanelHeader size="sm" />
          <div className="content">
            <Row>
              <Col md={12} xs={12}>
              <Card>
                <Switch>
                  {routes.map((prop, key) => {
                    return (
                      <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                      />
                    );
                  })}
                </Switch>
                </Card>
              </Col>
            </Row>
          </div>
          <Footer fluid />
        </div>
        <FixedPlugin
          bgColor={this.state.backgroundColor}
          handleColorClick={this.handleColorClick}
        />

      </div>
    );
  }
}

export default Dashboard;
