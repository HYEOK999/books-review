import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/signin">로그인</Link>
      </li>
    </ul>
  );
};

export default Home;
