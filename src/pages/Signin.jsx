import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import SigninBg from '../components/Signin/SigninBg';
import SigninForm from '../components/Signin/SigninForm/SigninForm';
import { Redirect } from 'react-router-dom';

const StyledRow = styled(Row).attrs(() => ({
  type: 'flex',
  align: 'middle',
}))`
  height: 100vh;
`;

const StyledCol = styled(Col).attrs(() => ({
  span: 24,
}))``;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #642828;
  text-transform: uppercase;
`;

const StyledGifImg = styled.img.attrs(() => ({
  src: '/book.gif',
  alt: 'Signin',
}))`
  position: absolute;
  display: block;
  width: 100px;
  height: 90px;
  top: -80px;
  left: calc(50% - 50px);
`;

const StyledSubTitle = styled.div`
  text-align: center;
  font-size: 27px;
  font-weight: normal;
  color: rgb(30, 74, 94);
  text-transform: uppercase;
`;

const StyledUnderline = styled.div`
  width: 200px;
  height: 8px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  background: linear-gradient(to right, #803b32, #ddb49b);
`;

const StyledContents = styled(Row).attrs(() => ({
  type: 'flex',
}))`
  margin-top: 50px;
  background-color: #f3f7f8;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
`;

const Signin = () => {
  const token = localStorage.getItem('token');

  if (token) {
    console.log('로그인 중 입니다.');
    return <Redirect to="/" />;
  }

  return (
    <StyledRow>
      <StyledCol>
        <StyledTitle>
          Review Service For Books
          <StyledGifImg />
        </StyledTitle>
        <StyledSubTitle>
          Please Share Your Opinion on Web Development Books.
        </StyledSubTitle>
        <StyledUnderline />
        <StyledContents>
          <SigninBg />
          <SigninForm />
        </StyledContents>
      </StyledCol>
    </StyledRow>
  );
};

export default Signin;
