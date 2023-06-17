// import React from 'react';
// import './Users.scss';
import { Link } from 'react-router-dom';

const Users = () => {
  console.log('users');
  return (
    <div className="Users">
      <p>Users</p>
      <Link to="/about">About</Link> <Link to="/home">Home</Link>
    </div>
  );
};

export default Users;
