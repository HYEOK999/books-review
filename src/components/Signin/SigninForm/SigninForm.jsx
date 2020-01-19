import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';
import SigninLoginForm from './SigninLoginForm';
import SigninSupportUl from './SigninSupportUl';

const StyledCol = styled(Col).attrs(() => ({
  span: 12,
}))`
  vertical-align: top;
`;

const StyledLoginTitle = styled.h2`
  text-align: center;
  padding: 50px 0 30px 0px;
  margin: 0;
  font-weight: inherit;
`;

const SigninForm = () => (
  <StyledCol>
    <StyledLoginTitle>LOG IN. START SEARCHING.</StyledLoginTitle>
    <SigninLoginForm></SigninLoginForm>
    <SigninSupportUl></SigninSupportUl>
  </StyledCol>
);

export default SigninForm;
