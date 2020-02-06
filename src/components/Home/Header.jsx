import React from 'react';
import HeaderUI from './HeaderUI';

const Header = ({ token, logoutThunk }) => {
  function logout() {
    logoutThunk(token);
  }

  return (
    <>
      <HeaderUI logout={logout}></HeaderUI>
    </>
  );
};

export default Header;
