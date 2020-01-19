import React from 'react';
import styled from 'styled-components';

const SigninSupportUl = ({ className }) => {
  return (
    <ul className={className}>
      <li>
        <span>Need to create an account?</span>
        <button>SIGN UP</button>
      </li>
      <li>
        <span>Forgot your password</span>
        <button>RECOVERY</button>
      </li>
    </ul>
  );
};

const StyledSupportUl = styled(SigninSupportUl)`
  list-style: none;
  padding: 25px 0 0;
  margin: 0;
  border-top: rgba(233, 233, 233) solid 1px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li:nth-child(2) {
    margin-top: 25px;
  }
  span {
    margin: 0;
    margin-bottom: 0;
    font-size: 15px;
  }
  button {
    background-color: inherit;
    padding: 5px 20px;
    border: rgb(29, 74, 93) 2px solid;
    color: rgb(71, 107, 123);
    font-weight: 600;
  }

  button:hover {
    color: rgb(241, 246, 247);
    background-color: rgb(29, 74, 93);
  }
`;

export default StyledSupportUl;
