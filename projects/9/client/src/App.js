import './App.css';
import React from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import Home from './pages/Home'
import { Link } from 'react-router-dom'
import { useState } from 'react';

const App = () => {
  
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

  const posts = [
      {'id':'1', 
      'title': 'Cartwheel in Chelsea 🤸🏽‍♀️',
      'author':'Harvey Milian', 
      'description': descr},
      {'id':'2', 
      'title': 'Love Lock in Paris 🔒',
      'author':'Beauford Delaney', 
      'description':descr},
      {'id':'3', 
      'title': 'Wear Pink on Fridays 🎀',
      'author':'Onika Tonya', 
      'description':descr},
      {'id':'4', 
      'title': 'Adopt a Dog 🐶',
      'author':'Denise Michelle', 
      'description':descr},
  ]
 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<Home data={posts}/>
    },
    {
      path: "/read",
      element:<ReadPosts/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    }
  ]);
  console.log("Posts being rendered:", posts);

  return ( 
    <div className="App">
      <div className="navigation">
        <Link to="/"><button className="headerBtn">Home</button></Link>
        <Link to="/read"><button className="headerBtn"> Crew Gallery</button></Link>
        <Link to="/new"><button className="headerBtn">Create a Character</button></Link>
      </div>

      <div className="mainContent">
        <div className="header">
          <h1>👾 Create a Character👾</h1>
          <h2>Welcome to Create a Character! Use the navigation bar to your left to create, edit, delete, or view your character!!</h2>
        </div>
        {element}
      </div>
    </div>
  );
}

export default App;
