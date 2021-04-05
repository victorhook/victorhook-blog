import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { render } from "react-dom";

import Homepage from './components/Homepage';
import Aboutpage from './components/Aboutpage';
import Navbar from './components/Navbar/Navbar';
import Archive from './components/Archive/Archive';


const App = () => {

  return (
    <Router>
      <div>

        <Navbar />

        <Switch>

          <Route path="/about">
            <Aboutpage />
          </Route>

          <Route path="/archive">
            <Archive />
          </Route>

          <Route path="/">
            <Homepage />
          </Route>

        </Switch>

      </div>
    </Router>
  )
}

export default App;

const container = document.getElementById("app");
render(<App />, container);