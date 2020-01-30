import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';
import SigninLoginForm from './SigninLoginForm';
import SigninSupportUl from './SigninSupportUl';

const StyledCol = styled(Col).attrs(() => ({
  span: 12,
}))`
  padding: 30px;
  font-weight: 600;
  vertical-align: top;
`;

const StyledLoginTitle = styled.h2`
  text-align: center;
  padding: 50px 0 30px 0px;
  margin: 0;
  font-weight: inherit;
`;

const StyledLogoH1 = styled.h1`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-33%);
  display: inline-block;
  background: url(/BookLogoImg.png) no-repeat;
  background-size: contain;
  height: 64px;
  width: 100px;
  text-indent: 100px;
  white-space: nowrap;
  overflow: hidden;
`;

const SigninForm = () => (
  <StyledCol>
    <StyledLogoH1>Books</StyledLogoH1>
    <StyledLoginTitle>LOG IN. START SEARCHING.</StyledLoginTitle>
    <SigninLoginForm></SigninLoginForm>
    <SigninSupportUl></SigninSupportUl>
  </StyledCol>
);

export default SigninForm;
