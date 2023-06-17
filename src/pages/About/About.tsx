// import React from 'react';
// import './About.scss';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="About">
      <p>About</p>
      <Link to="/home">Home</Link> <Link to="/users">Users</Link>
    </div>
  );
};

export default About;
