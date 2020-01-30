import React, { useState, useEffect } from 'react';
import axios from 'axios';

import styled from 'styled-components';
import { Layout, Menu, Icon, Button, Modal } from 'antd';

import withAuth from '../hocs/withAuth';
import InputBookInfo from '../components/Home/InputBookInfo';
import HeaderUI from '../components/Home/HeaderUI';
import ContentUI from '../components/Home/ContentUI';

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

const Home = ({ token, history }) => {
  const [books, setBooks] = useState([]);
  const [visible, setVisible] = useState(false);
  const titleRef = React.createRef();
  const messageRef = React.createRef();
  const authorRef = React.createRef();
  const urlRef = React.createRef();

  useEffect(() => {
    async function getBookList() {
      try {
        const response = await axios.get('https://api.marktube.tv/v1/book', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBooks(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getBookList();
  }, [token]);

  const logout = () => {
    async function logout() {
      try {
        await axios.delete('https://api.marktube.tv/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        localStorage.clear();
        history.push('/signin'); // 로그아웃시 보여줄 페이지
      } catch (error) {
        console.log(error);
      }
    }

    logout();
  };

  const initValue = () => {
    titleRef.current.state.value = '';
    messageRef.current.state.value = '';
    authorRef.current.state.value = '';
    urlRef.current.state.value = '';
  };

  const addBook = () => {
    const title = titleRef.current.state.value;
    const message = messageRef.current.state.value;
    const author = authorRef.current.state.value;
    const url = urlRef.current.state.value;

    async function addBook() {
      try {
        const response = await axios.post(
          'https://api.marktube.tv/v1/book',
          {
            title,
            message,
            author,
            url,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setBooks([...books, { ...response.data, deletedAt: null }]);
      } catch (error) {
        console.log(error);
      }
    }
    addBook();
    initValue();
    setVisible(false);
  };

  const deleteBook = async id => {
    try {
      const response = await axios.delete(
        `https://api.marktube.tv/v1/book/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success === true) {
        setBooks(books.filter(book => book.bookId !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

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
      {/* header */}
      <HeaderUI logout={logout}></HeaderUI>
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
              <Menu.Item key="1">BooList</Menu.Item>
            </SubMenu>
          </StyledSideMenu>
        </Sider>
        {/* main */}
        <Layout style={{ padding: '52px' }}>
          {/* Open Modal */}
          <Button type="primary" onClick={showModal}>
            Add Book List
          </Button>
          <ContentUI books={books} deleteBook={id => deleteBook(id)} />
        </Layout>
      </Layout>

      {/* Modal */}
      <Modal
        title="Add Book List"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={addBook}>
            Add
          </Button>,
        ]}
      >
        <InputBookInfo info="Title" reference={titleRef} />
        <InputBookInfo info="Message" reference={messageRef} />
        <InputBookInfo info="Author" reference={authorRef} />
        <InputBookInfo info="URL" reference={urlRef} />
      </Modal>
    </Layout>
  );
};

export default withAuth(Home);
