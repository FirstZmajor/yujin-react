import React from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Card, CardHeader, CardBody, Row, Col, CardTitle, CardText, Button } from 'reactstrap';
import { SizeMe } from 'react-sizeme';
import _ from "lodash";
import '../App.css';

import firebase from "firebase/app"
import "firebase/firestore"



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
      items: [],
      layout: []
      // newCounter: 0
    }
    this.onAddItem = this.onAddItem.bind(this);
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
  }

  createElement(el) {
    const removeStyle = {
      position: "absolute",
      right: 5,
      top: 5,
      cursor: "pointer"
    };
    const i = el.cid;
    return (
      <div key={i} data-grid={el} style={{width: '100%', height: '100%'}} >
      <SizeMe monitorWidth monitorHeight>
      {({ size }) => 
        <Card style={{width: '100%', height: '100%', position: 'absolute',top: 0,bottom: 0}}>
          <CardBody>
              <CardTitle className="text-info">i: {el.cid} </CardTitle>
              {/* <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle> */}
              <CardText>
              <span className="text">width = {size.width} px</span><br/>
              <span className="text">height = {size.height} px</span><br/>
              {/* <span className="text">X = {el.x} px</span><br/>
              <span className="text">Y = {el.y} px</span> */}
              <i className="remove now-ui-icons ui-1_simple-remove"
              style={removeStyle}
              onClick={this.onRemoveItem.bind(this, el.cid)}></i>
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
    let firestore = firebase.firestore();
    const ref = firestore.collection('store').doc()
    let newItem = {
      x: (this.state.items.length * 2) % (this.state.cols || 12),
      y: Infinity, // puts it at the bottom
      w: 2,
      minW: 2,
      h: 2,
      minH:2, 
      age: 16,
      color: "#567ace",
      name: "YujMin ",
      rank: 115,
      dateCreate: new Date().getTime()
    }
    ref.set(newItem)  // sets the contents of the doc using the id
    .then(() => {  // fetch the doc again and show its data
        ref.get().then(doc => {
            console.log(doc.data())
        })
    })
    newItem.cid = ref.id
    this.setState({
      // Add a new item. It must have a unique key!
      items: this.state.items.concat(newItem)
    });
  }

  // We're using the cols coming back from this to calculate where to add new items.
  onBreakpointChange(breakpoint, cols) {
    this.setState({
      breakpoint: breakpoint,
      cols: cols
    });
  }

  onLayoutChange(items) {
    let firestore = firebase.firestore();
    _.forEach(items, function (doc, i) {
      let washingtonRef = firestore.collection("store").doc(doc.i);
      return washingtonRef.update({
        h: +doc.h,
        i: doc.i,
        minH: +doc.minH,
        minW: +doc.minW,
        w: +doc.w,
        x: +doc.x,
        y: +doc.y
      })
      .then(function() {
        console.log("Document successfully updated!");
      })
      .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
    })
  }

  onRemoveItem(cid) {
    let firestore = firebase.firestore();    
    firestore.collection("store").doc(cid).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
    const updateItems = this.state.items.filter(item => item.cid !== cid);
    this.setState({ items: updateItems })

  }

  componentDidMount() {
    let firestore = firebase.firestore();
    firestore.collection("store").get().then((snapshot) => {
      const map = snapshot.docs.map(v => {
        return {
          cid: v.id,
          ...v.data()
        }
      })
      this.setState({
        items: map
      })
  });
  }

  render() {
    return (
        <>
        <CardHeader>
          <h5 className="title">Develop React-Grid-Layout</h5>
          <p className="category">
          For Learning &Practice Labs
          </p>
        </CardHeader>
        <CardBody style={{height: '1000px'}}>
          <Row>
            <Col md={12} xs={12}>
              <div>
                <Button color="primary" className="btn-round" onClick={this.onAddItem}>
                    <i className="now-ui-icons ui-1_simple-add"></i> Add Item
                </Button>
                <ResponsiveReactGridLayout
                  {...this.props}
                  items={this.state.items}
                  onLayoutChange={this.onLayoutChange}
                  onBreakpointChange={this.onBreakpointChange}
                  style={{height: '100%'}}
                >
                  {_.map(this.state.items, el => this.createElement(el))}
                </ResponsiveReactGridLayout>
              </div>
            </Col>
          </Row>
        </CardBody>
        </>
    );
  }
}
export default AddGrids;

// module.exports = AddGrids;

// if (require.main === module) {
//   require("../test-hook.jsx")(module.exports);
// }