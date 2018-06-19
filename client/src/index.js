import React from "react";
import ReactDOM from "react-dom";
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

import "./index.css";
import Nav from "./components/Nav.js";
import Home from "./components/Home.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import ProfilePage from "./components/ProfilePage.js";

var destination = document.querySelector("#container");

/* Currently handle frontend routing here, may be a better way to do this */

ReactDOM.render(
  <div className="container wrapper">
    <div className="row">
      <Nav/>
    <Router history={browserHistory}>
      <Route path='/' component={Home}>
      </Route>
      <Route path={"login"} component={Login}>
      </Route>
      <Route path={"register"} component={Register}>
      </Route>
      <Route path={"profile"} component={ProfilePage}>
      </Route>
    </Router>
      </div>
      <div className="row">

      </div>
    </div>,
    destination
);
