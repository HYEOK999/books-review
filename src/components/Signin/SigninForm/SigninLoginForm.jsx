import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Button, message } from 'antd';
import axios from 'axios';

const SigninLoginForm = ({ className }) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();

  function click() {
    console.log(emailRef);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    axios
      .post(
        //경로, 바디, 헤더(옵션)
        'https://api.marktube.tv/v1/me',
        {
          email, // email: email
          password, // password: password
        },
      )
      .then(response => {
        console.log(response.data);
        const { token } = response.data;
        console.log(token);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <form className={className}>
      <fieldset>
        <div>
          <label>Email</label>
          <input
            autoFocus
            type="email"
            placeholder="Enter your E-mail"
            autoComplete="email"
            name="email"
            ref={emailRef}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            autoComplete="current-password"
            placeholder="Enter your Password"
            ref={passwordRef}
          />
        </div>
        <StyledButton size="large" onClick={click}>
          Sign In
        </StyledButton>
      </fieldset>
    </form>
  );
};

const StyledLoginForm = styled(SigninLoginForm)`
  padding: 50px 0 25px 0;
  label,
  input,
  button {
    font-weight: inherit;
  }
  label::after {
    content: '*';
    color: red;
  }
  input {
    margin: 10px 0 20px;
    display: block;
    width: 100%;
    height: 30px;
    background-color: rgb(227, 238, 253);
    border: rgba(117, 117, 117, 0.2) solid 1px;
  }

  input::placeholder {
    font-style: italic;
    color: rgba(19, 19, 19, 0.3);
    font-weight: 600;
    padding-left: 10px;
  }

  input:focus {
    background-color: #fff;
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
  }
`;

const StyledButton = styled(Button)`
  background-color: rgb(30, 74, 94);
  border: none;
  color: rgb(241, 246, 247);
  font-size: 16px;
  padding: 6px 30px;

  &:hover {
    color: rgb(30, 74, 94);
    background-color: rgb(241, 246, 247);
    box-shadow: 1px 1px rgb(30, 74, 94), -1px -1px rgb(30, 74, 94),
      1px -1px rgb(30, 74, 94), -1px 1px rgb(30, 74, 94);
  }
`;

export default StyledLoginForm;
