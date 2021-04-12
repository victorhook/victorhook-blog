import React from 'react'
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Navbar from './components/Navbar';
import Archive from './components/Archive';
import Homepage from './components/Homepage';
import Aboutpage from './components/Aboutpage';
import Post from './components/Post';

// Admin only
import HomeAdmin from './components/Adminpage/HomeAdmin';
import Imagepage from './components/Adminpage/Imagepage';
import NewPost from './components/Adminpage/NewPost';
import EditPost from './components/Adminpage/EditPost';

 
const AdminApp = () => {

    const createPost = () => {};

    return (
        <Router>
  
          <Navbar links={[
            {path: '/newpost/', text: 'new post'},
            {path: '/images/', text: 'images'},
            {path: '/archive/', text: 'archive'},
            {path: '/about/', text: 'about'},
          ]}/>
  

          <div className="content">
            <Switch>

              <Route path="/images">
                <Imagepage />
              </Route>

              <Route path="/newpost">
                <NewPost />
              </Route>

              <Route path="/about/">
                <Aboutpage />
              </Route>

              <Route path="/post_all_raw/:id/">
                <EditPost />
              </Route>

              <Route path="/post/:id/">
                <Post />
              </Route>

              <Route path="/archive/">
                <Archive isAdmin={true}/>
              </Route>

              <Route path="/post_all/:id/">
                <Post isAdmin={true}/>
              </Route>

              <Route path="/">
                <Homepage isAdmin={true}/>
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