import React from 'react';
import HeaderUI from './HeaderUI';

const Header = ({ signOut }) => {
  function logout() {
    signOut();
  }

  return (
    <>
      <HeaderUI logout={logout}></HeaderUI>
    </>
  );
};

export default Header;
