import React, { useState } from 'react';
import uuid from 'uuid';
import styled from 'styled-components';
import { Layout, Button, Icon, Alert } from 'antd';
import { useEffect } from 'react';
import { Spin } from 'antd';
import EditBookContainer from '../../containers/EditBookContainer';

const { Content } = Layout;

// const StyledSpinnerImg = styled.img`
//   display: block;
//   margin: 0 auto;
//   width: 40px;
//   height: 40px;
//   /* transform: translateY(-100px); */
// `;

const StyledContent = styled(Content)`
  position: relative;
  opacity: 0.7;
  background-color: inherit;
  padding: 24px 0;
  margin: 0;
  min-height: 280px;
  height: calc(100vh - 210px);
  li {
    border-radius: 4px;
    position: relative;
    padding: 20px;
    margin-bottom: 24px;
    background-color: #fff;
    box-shadow: #d2d2d2 0px 0px 15px;
  }

  div.Read {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -15px;
    left: -15px;
    background-color: #188ef4;
    border-radius: 50%;
    i {
      color: #fff;
      padding: 7px;
    }
  }
`;

const StyledTitleh3 = styled.h3`
  font-weight: 600;
  font-size: 20px;
`;

const StyledContentP = styled.p`
  span {
    display: block;
    padding-top: 10px;
  }

  span:nth-child(1) {
    font-size: 15px;
    font-style: italic;
    padding: 0;
  }

  span:nth-child(2) {
    font-size: 18px;
  }

  span:nth-child(3) {
    font-size: 15px;
    color: #1890ff;
  }
`;
const StyledEditButton = styled(Button)`
  position: absolute;
  font-size: 25px;
  top: 5px;
  right: 45px;
  border: none;
  box-shadow: none;
`;

const StyledErrorAlert = styled.div`
  padding-top: 10px;
`;

const StyledDeleteButton = styled(Button)`
  position: absolute;
  font-size: 25px;
  top: 5px;
  right: 5px;
  border: none;
  box-shadow: none;
  padding-left: 0;
`;

const StyledSpin = styled(Spin)`
  position: absolute;
  top: -73px;
  right: 50%;
  transform: translateX(50%);
`;

const ContentUI = ({ error, loading, books, getBooks, deleteBook }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  const [visible, setVisible] = useState(false);
  const [book, setBook] = useState({});

  const showModal = book => {
    setVisible(true);
    setBook(book);
  };

  const handleOk = e => {
    setVisible(false);
  };

  const handleCancel = e => {
    setVisible(false);
  };

  if (error !== null) {
    return (
      <StyledErrorAlert>
        <Alert
          message="Error Text"
          description={error.message}
          type="error"
          closable
          onClose={() => {}}
        />
      </StyledErrorAlert>
    );
  }
  return (
    <StyledContent>
      {loading && <StyledSpin size="large" />}
      <ul>
        {books &&
          books.map(book => (
            <li key={uuid.v4()}>
              <div className="Read">
                <Icon type="read" />
              </div>
              <StyledTitleh3>{book.title}</StyledTitleh3>
              <StyledContentP>
                <span>{book.author}</span>
                <span>{book.message}</span>
                <span>{book.url}</span>
              </StyledContentP>
              <StyledEditButton onClick={() => showModal(book)}>
                <Icon type="edit" />
              </StyledEditButton>
              <StyledDeleteButton
                onClick={() => deleteBook(books, book.bookId)}
              >
                <Icon type="delete" />
              </StyledDeleteButton>
            </li>
          ))}
      </ul>
      <EditBookContainer
        book={book}
        visible={visible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
    </StyledContent>
  );
};

export default ContentUI;
