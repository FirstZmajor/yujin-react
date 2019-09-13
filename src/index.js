import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";


import "bootstrap/dist/css/bootstrap.css";
import "./assets/scss/now-ui-dashboard.scss?v1.2.0";
import "./assets/css/demo.css";

import MainLayout from "./layouts/Main.jsx";

import firebase from "firebase/app"
import "firebase/firestore"

const hist = createBrowserHistory();

var config = {
  apiKey: "AIzaSyCH7pDqZY9CI-kemQMhvPSl31p5hZiUCWU",
  databaseURL: "https://yujin-react.firebaseio.com",
  projectId: "my-react-app-b70b5"
};
firebase.initializeApp(config);

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <Route path="/home" render={props => <MainLayout {...props} />} />
      <Redirect to="/home/mygrids" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
