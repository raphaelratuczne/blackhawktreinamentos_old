// import React from 'react';
// import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  console.log('home->');
  return (
    <div className="Home">
      <p>Home</p>
      <Link to="/about">About</Link> <Link to="/users">Users</Link>
    </div>
  );
};

export default Home;
