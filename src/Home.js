import App from './App'
import Covid19 from './components/covid19'
import Map2 from './components/Map2'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Map3 from './components/Map3'
import Nav from "./Nav";
import Login from './components/LoginButton';
import Logout from './components/LogoutButton'
import React, { useEffect, useState } from "react";


function Home() {
  return (

    <div>
     
      <Router>
        <div>
          <Nav />
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/App" component={App} />
            <Route path="/Covid19" component={Covid19} />
            <Route path="/Map2" component={Map2} />
            <Route path="/Map3" component={Map3} />
          </Switch>
        </div>
      </Router>

    </div>


  );
}

export default Home;