import React, { useState } from 'react';

import styled from 'styled-components';
import { Layout, Menu, Icon, Button } from 'antd';

import withAuth from '../hocs/withAuth';
import HeaderContainer from '../containers/HeaderContainer';
import BooksContainer from '../containers/BooksContainer';
import AddBookContainer from '../containers/AddBookContainer';
import Head from '../components/Head';

const { SubMenu } = Menu;
const { Sider } = Layout;

const StyledSideMenu = styled(Menu).attrs(() => ({
  mode: 'inline',
  defaultSelectedKeys: ['1'],
  defaultOpenKeys: ['sub1'],
}))`
  height: 100%;
  border-right: 0;
`;

const Home = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  return (
    <Layout>
      <Head />
      {/* header */}
      <HeaderContainer />
      <Layout>
        {/* side */}
        <Sider width={200} style={{ background: '#fff' }}>
          <StyledSideMenu>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="book" />
                  Book
                </span>
              }
            >
              <Menu.Item key="1">BookList</Menu.Item>
            </SubMenu>
          </StyledSideMenu>
        </Sider>
        {/* main */}
        <Layout style={{ padding: '52px', minHeight: '100vh' }}>
          {/* Open Modal */}
          <Button type="primary" onClick={showModal}>
            Add Book List
          </Button>
          {/* <ContentUI /> */}
          <BooksContainer />
        </Layout>
      </Layout>
      {/* <AddBookModal /> */}
      <AddBookContainer
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </Layout>
  );
};

export default withAuth(Home);
