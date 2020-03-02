import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, message } from 'antd';

const SigninLoginForm = ({ className, loading, signIn, error }) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  // const [loading, setLoading] = useState(false);

  async function click() {
    // async function click() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signIn(email, password);

    // try {
    //   await login(email, password);
    //   // history.push('/');
    // } catch (error) {}
  }

  useEffect(() => {
    if (error === null) return;
    if (error === 'USER_NOT_EXIST') {
      message.error('유저가 없습니다.');
    } else if (error === 'PASSWORD_NOT_MATCH') {
      message.error('비밀번호가 틀렸습니다.');
    } else {
      message.error('로그인에 문제가 있습니다.');
    }
  }, [error]);

  async function press(e) {
    if (e.key !== 'Enter') return;
    click();
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
            onKeyPress={e => press(e)}
          />
        </div>
        <StyledButton size="large" loading={loading} onClick={click}>
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
    padding-left: 20px;
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
