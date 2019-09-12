import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Card, CardHeader, CardBody, Row, Col, CardTitle, CardSubtitle, CardText, Button } from 'reactstrap';
import { SizeMe } from 'react-sizeme';
import _ from "lodash";
import PanelHeader from "../components/PanelHeader/PanelHeader.jsx";
import '../App.css';

const ResponsiveReactGridLayout = WidthProvider(Responsive);

class AddGrids extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 },
    rowHeight: 100
  };

  constructor(props) {
    super(props);

    this.state = {
      items: [0, 1, 2, 3, 4].map(function(i, key, list) {
        return {
          i: i.toString(),
          x: i * 2,
          y: 0,
          h: 2,
          w: 2,
          minH:2, 
          minW: 2, 
          add: i === (list.length - 1).toString()
        };
      }),
      newCounter: 0
    };

    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: 5,
      top: 5,
      cursor: "pointer"
    };
    const i = el.add ? "+" : el.i;
    return (
      <div key={i} data-grid={el} style={{width: '100%', height: '100%'}} >
      <SizeMe monitorWidth monitorHeight>
      {({ size }) => 
        <Card style={{width: '100%', height: '100%', position: 'absolute',top: 0,bottom: 0}}>
          <CardBody>
              <CardTitle>Card Number: {i} </CardTitle>
              <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle>
              <CardText>
              <span className="text">width of {i} is {size.width} px</span><br/>
              <span className="text">height of {i} is {size.height} px</span>
              <i className="remove now-ui-icons ui-1_simple-remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, i)}></i>
              </CardText>
          </CardBody>
        </Card>
      }
      </SizeMe>
      </div>

    );
  }

  onAddItem() {
    /*eslint no-console: 0*/
    console.log("adding", "n" + this.state.newCounter);
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat({
        i: "n" + this.state.newCounter,
        x: (this.state.items.length * 2) % (this.state.cols || 12),
        y: Infinity, // puts it at the bottom
        w: 2,
        h: 2
      }),
      // Increment the counter to ensure key is always unique.
      newCounter: this.state.newCounter + 1
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(layout) {
    // console.log(layout);
    this.props.onLayoutChange(layout);
    this.setState({ layout: layout });
  }

  onRemoveItem(i) {
    console.log("removing", i);
    this.setState({ items: _.reject(this.state.items, { i: i }) });
  }

  render() {
    return (
        <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
            <Card style={{height: '1000px'}}>
                <CardHeader>
                  <h5 className="title">Develop React-Grid-Layout</h5>
                  <p className="category">
                  For Learning &Practice Labs
                  </p>
                </CardHeader>
                <CardBody>
                  <Row>
                  <Col md={12} xs={12}>
                    <div>
                      <Button color="primary" className="btn-round" onClick={this.onAddItem}>
                          <i className="now-ui-icons ui-1_simple-add"></i> Add Item
                      </Button>
                      <ResponsiveReactGridLayout
                        // onLayoutChange={this.onLayoutChange}
                        onBreakpointChange={this.onBreakpointChange}
                        {...this.props}
                        style={{height: '100%'}}
                      >
                        {_.map(this.state.items, el => this.createElement(el))}
                      </ResponsiveReactGridLayout>
                    </div>
                  </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
        </>



    );
  }
}
export default AddGrids;

// module.exports = AddGrids;

// if (require.main === module) {
//   require("../test-hook.jsx")(module.exports);
// }