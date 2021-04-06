import React from 'react'
import { render } from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
  } from "react-router-dom";

import Navbar from './components/Navbar';
import Archive from './components/Archive/Archive';
import Homepage from './components/Homepage';
import Aboutpage from './components/Aboutpage';
import Post from './components/Post';

// Admin only
import HomeAdmin from './components/Adminpage/HomeAdmin';
import Imagepage from './components/Adminpage/Imagepage';
import NewPost from './components/Adminpage/NewPost';


const AdminApp = () => {

    const createPost = () => {};

    return (
        <Router>
        <div>
  
          <Navbar links={[
            {path: '/newpost/', text: 'new post'},
            {path: '/images/', text: 'images'},
            {path: '/archive/', text: 'archive'},
            {path: '/about/', text: 'about'},
          ]}/>
  
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

            <Route path="/archive/">
                <Archive isAdmin={true}/>
            </Route>

            <Route path="/post/:id/">
                <Post edit={true}/>
            </Route>

            <Route path="/">
              <Homepage />
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