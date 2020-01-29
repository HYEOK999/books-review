import React from 'react';
import uuid from 'uuid';

import styled from 'styled-components';
import { Layout, Button, Icon } from 'antd';

const { Content } = Layout;

const StyledContent = styled(Content)`
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

  div {
    position: absolute;
    width: 30px;
    height: 30px;
    top: -15px;
    left: -15px;
    background-color: #188ef4;
    border-radius: 50%;
  }

  i {
    color: #fff;
    padding: 7px;
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

const StyledButton = styled(Button)`
  position: absolute;
  top: 5px;
  right: 5px;
  border: none;
  box-shadow: none;
`;

const ContentUI = ({ books, deleteBook }) => {
  return (
    <StyledContent>
      <ul>
        {books &&
          books.map(book => (
            <li key={uuid.v4()}>
              <div>
                <Icon type="read" />
              </div>
              <StyledTitleh3>{book.title}</StyledTitleh3>
              <StyledContentP>
                <span>{book.author}</span>
                <span>{book.message}</span>
                <span>{book.url}</span>
              </StyledContentP>
              <StyledButton onClick={() => deleteBook(book.bookId)}>
                <Icon type="delete" />
              </StyledButton>
            </li>
          ))}
      </ul>
    </StyledContent>
  );
};

export default ContentUI;
