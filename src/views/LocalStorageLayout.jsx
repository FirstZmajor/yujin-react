import React from "react";
import RGL, { WidthProvider} from "react-grid-layout";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import _ from "lodash";
import '../App.css';
import firebase from "firebase/app"
import "firebase/firestore"

const ReactGridLayout = WidthProvider(RGL);
const originalLayout = getFromLS("layout") || [];
/**
 * This layout demonstrates how to sync to localstorage.
 */
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
      layout: JSON.parse(JSON.stringify(originalLayout))
      // layout: []
    };

    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.resetLayout = this.resetLayout.bind(this);
  }

  resetLayout() {
    this.setState({
      layout: []
    });
  }

  onLayoutChange(layout) {
    /*eslint no-console: 0*/

    // const firestore = firebase.firestore();
    // const washingtonRef = firestore.collection("layout").doc("DC");
    // // Set the "capital" field of the city 'DC'
    // return washingtonRef.update({
    //     capital: true
    // })
    // .then(function() {
    //     console.log("Document successfully updated!");
    // })
    // .catch(function(error) {
    //     // The document probably doesn't exist.
    //     console.error("Error updating document: ", error);
    // });
    console.log('layout  ', layout)
    // saveToLS("layout", layout);
    // this.setState({ layout });
    // this.props.onLayoutChange(layout); // updates status display
    console.log('move  ', this.state.layout)

  }

  componentDidMount() {
    let firestore = firebase.firestore();
    firestore.collection("layout").get().then((snapshot) => {
      const listCollect = snapshot.docs.map(v => {
        return {
          cid: v.id,
          ...v.data()
        }
      })
      // console.log('Layout ', this.state.layout)
      this.setState({
        layout: listCollect
      })
      console.log('mount ', listCollect)

  });
  }

  createElement(el) {
    // const i = el.cid;

    console.log('Create ', el)
    return (
      <div key={el.i} data-grid={el} style={{width: '100%', height: '100%'}}>
        <div className="content">

          <Card style={{width: '100%', height: '100%', position: 'absolute',top: 0,bottom: 0}}>
            <CardBody>
                <CardTitle>Card title {el.cid} </CardTitle>
                <CardSubtitle className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText><span >1</span></CardText>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.resetLayout}>Reset Layout</button>
        <ReactGridLayout
          {...this.props}
          layout={this.state.layout}
          onLayoutChange={this.onLayoutChange} >
          {_.map(this.state.layout, el => this.createElement(el))}
        </ReactGridLayout>
      </div>

    );
  }
}

function getFromLS(key) {
  let ls = {};
  if (global.localStorage) {
    try {
      ls = JSON.parse(global.localStorage.getItem("rgl-7")) || {};
    } catch (e) {
      /*Ignore*/
    }
  }
  return ls[key];
}

function saveToLS(key, value) {
  if (global.localStorage) {
    global.localStorage.setItem(
      "rgl-7",
      JSON.stringify({
        [key]: value
      })
    );
  }
}

// module.exports = LocalStorageLayout;

// if (require.main === module) {
//   require("../test-hook.jsx")(module.exports);
// }
export default LocalStorageLayout;
