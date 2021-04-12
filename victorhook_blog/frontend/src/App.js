import React from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Homepage from './components/Homepage';
import Aboutpage from './components/Aboutpage';
import Navbar from './components/Navbar';
import Archive from './components/Archive';
import Post from './components/Post';

 
const App = () => {

  return (
    <Router>

        <Navbar links={[
          {path: '/archive/', text: 'archive'},
          {path: '/about/', text: 'about'},
        ]}/>

        <div className="content">
          <Switch>
              <Route path="/about/">
                <Aboutpage />
              </Route>

              <Route path="/archive/">
                <Archive />
              </Route>

              <Route path="/post/:id/">
                <Post />
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
if (container != undefined)
  render(<App />, container);