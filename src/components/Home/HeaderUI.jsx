import React from 'react';
import styled from 'styled-components';
import { Layout, Menu, Icon } from 'antd';
const { Header } = Layout;

const StyledNavMenu = styled(Menu).attrs(() => ({
  theme: 'dark',
  mode: 'horizontal',
  defaultSelectedKeys: ['1'],
}))`
  line-height: 64px;
`;

const StyledLogoH1 = styled.h1`
  position: absolute;
  left: 30px;
  display: inline-block;
  background: url(/BookLogoImg.png) no-repeat;
  background-size: contain;
  height: 64px;
  width: 100px;
  text-indent: 100px;
  white-space: nowrap;
  overflow: hidden;
`;

const StyledLogoutButton = styled.button`
  position: absolute;
  top: -6px;
  right: 12px;
  color: #fff;
  background-color: inherit;
  border: none;
  height: 0px;
  font-size: 30px;

  &:hover {
    color: #1890ff;
  }

  &::after {
    content: 'Logout';
    position: absolute;
    top: 22px;
    right: 4px;
    font-size: 12px;
    height: 45px;
  }
`;

const HeaderUI = ({ logout }) => {
  return (
    <Header style={{ padding: '0 122px' }} className="header">
      <StyledLogoH1>Books</StyledLogoH1>
      <StyledLogoutButton onClick={logout}>
        <Icon type="logout" />
      </StyledLogoutButton>
      <StyledNavMenu>
        <Menu.Item key="1"> Home </Menu.Item>
      </StyledNavMenu>
    </Header>
  );
};

export default HeaderUI;
