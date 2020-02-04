import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function withAuth(Component) {
  function WrappedComponent(props) {
    // const token = localStorage.getItem('token');
    const token = useSelector(state => state.token);
    if (token === null) {
      return <Redirect to="/signin" />;
    }
    return <Component {...props} token={token} />;
  }

  WrappedComponent.displayName = `withAuth(${Component.name})`;

  return WrappedComponent;
}

export default withAuth;

// 관련없는 props는 패스해주어라.
// display 이름 설정을 해주어라. (디버깅시 이름을 유지시켜주기위함.)
