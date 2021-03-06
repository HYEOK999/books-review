import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';

const StyledCol = styled(Col).attrs(() => ({
  span: 12,
}))``;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SigninBg = () => (
  <StyledCol>
    <StyledImg src="/book.jpg" alt="Signin" />
  </StyledCol>
);

export default SigninBg;
