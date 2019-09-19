import React from "react";
import RGL, { WidthProvider} from "react-grid-layout";
import { Card, CardHeader, CardBody, CardTitle, CardSubtitle, CardText, Button, Row, Col } from 'reactstrap';
import _ from "lodash";
import '../App.css';
import firebase from "firebase/app"
import "firebase/firestore"

const ReactGridLayout = WidthProvider(RGL);
// const originalLayout = getFromLS("layout") || [];

class LocalStorageLayout extends React.PureComponent {
  static defaultProps = {
    className: "layout",
    cols: 12,
    rowHeight: 30,
    onLayoutChange: function() {}
  };

  constructor(props) {
    super(props);
    this.state = {
      // layout: JSON.parse(JSON.stringify(originalLayout))
      layout: []
    };
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.saveLayout = this.saveLayout.bind(this);
  }

  saveLayout() {
    let firestore = firebase.firestore();
    let layout = this.state.layout
    _.forEach(layout, function (doc, i) {
      console.log('forEach', doc.i)
      let washingtonRef = firestore.collection("layout").doc(doc.i);
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

  onLayoutChange(layout) {
    /*eslint no-console: 0*/
    // saveToLS("layout", layout);
    this.setState({ layout });
    this.props.onLayoutChange(layout); // updates status display
    console.log('move  ', this.state.layout)

  }

  componentDidMount() {
    let firestore = firebase.firestore();
    firestore.collection("layout").get().then((snapshot) => {
      const listCollect = snapshot.docs.map(v => {
        return {
          // cid: v.id,
          ...v.data()
        }
      })
      this.setState({
        layout: listCollect
      })
      console.log('componentDidMount ',  this.state.layout)

    });
  }

  createElement(el) {
    return (
      <div key={el.i} data-grid={el} style={{width: 'auto', height: 'auto'}}>
        <Card style={{width: '100%', height: '100%', top: 0,bottom: 0}}>
            <CardBody>
                <CardTitle>Card title {el.i} </CardTitle>
                <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText><span >1</span></CardText>
            </CardBody>
          </Card>
      </div>
    );
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
        <CardBody>         
          <Row>
            <Col md={12} xs={12}>
              <Button color="primary" className="btn-round" onClick={this.saveLayout}>
                  <i className="media-1_camera-compact"></i> Save Layout
              </Button>
              <ReactGridLayout
                {...this.props}
                layout={this.state.layout}
                onLayoutChange={this.onLayoutChange} >
                {_.map(this.state.layout, el => this.createElement(el))}
              </ReactGridLayout>
            </Col>
          </Row>
        </CardBody>

        
      </>

    );
  }
}

// function getFromLS(key) {
//   let ls = {};
//   if (global.localStorage) {
//     try {
//       ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
//     } catch (e) {
//       /*Ignore*/
//     }
//   }
//   return ls[key];
// }

// function saveToLS(key, value) {
//   if (global.localStorage) {
//     global.localStorage.setItem(
//       "rgl-7",
//       JSON.stringify({
//         [key]: value
//       })
//     );
//   }
// }

// module.exports = LocalStorageLayout;

// if (require.main === module) {
//   require("../test-hook.jsx")(module.exports);
// }
export default LocalStorageLayout;
