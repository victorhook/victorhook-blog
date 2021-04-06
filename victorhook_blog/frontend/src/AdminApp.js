import React from 'react'
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Navbar from './components/Navbar/Navbar';
import HomeAdmin from './components/Adminpage/HomeAdmin';
import Archive from './components/Archive/Archive';
import Aboutpage from './components/Aboutpage';
import Imagepage from './components/Imagepage/Imagepage';
import Post from './components/Post/Post';


const AdminApp = () => {

    const createPost = () => {};

    return (
        <Router>
        <div>
  
          <Navbar links={[
            {path: '/images/', text: 'images'},
            {path: '/archive/', text: 'archive'},
            {path: '/about/', text: 'about'},
          ]}/>
  
          <Switch>

            <Route path="/images">
              <Imagepage />
            </Route>
  
            <Route path="/about/">
                <Aboutpage />
            </Route>

            <Route path="/archive/">
                <Archive />
            </Route>

            <Route path="/post/:id/">
                <Post edit={true}/>
            </Route>

            <Route path="/">
              <HomeAdmin />
            </Route>
  
          </Switch>
  
        </div>
      </Router>
    )
}

export default AdminApp

const container = document.getElementById("admin-app");
if (container != undefined)
    render(<AdminApp />, container);