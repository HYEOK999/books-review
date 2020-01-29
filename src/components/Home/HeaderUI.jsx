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
  }
`;

const HeaderUI = ({ logout }) => {
  return (
    <Header className="header">
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
