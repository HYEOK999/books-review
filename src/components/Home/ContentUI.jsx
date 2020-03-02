import React, { useState } from 'react';
import uuid from 'uuid';
import styled from 'styled-components';
import { Layout, Button, Icon, Alert } from 'antd';
import { useEffect } from 'react';
import { Spin, Table } from 'antd';
import EditBookContainer from '../../containers/EditBookContainer';
import GetBookModal from './GetBookModal';

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
  div.list {
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

  .ant-pagination {
    position: absolute;
    top: -50px;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const StyledTitleh3 = styled.h3`
  font-weight: 600;
  font-size: 20px;
`;

const StyledContentP = styled.p`
  width: 50vw;
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
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  span:nth-child(3) {
    font-size: 15px;
    color: #1890ff;
  }
`;

const StyledSearchButton = styled(Button)`
  position: absolute;
  font-size: 25px;
  top: 5px;
  right: 85px;
  border: none;
  box-shadow: none;
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

  const [editVisible, setEditVisible] = useState(false);
  const [getVisible, setGetVisible] = useState(false);
  const [book, setBook] = useState({});

  const showEditModal = book => {
    setEditVisible(true);
    setBook(book);
  };

  const showGetModal = book => {
    setGetVisible(true);
    setBook(book);
  };

  const handleOk = e => {
    setEditVisible(false);
  };

  const handleCancel = e => {
    setEditVisible(false);
  };

  const handleOk2 = e => {
    setGetVisible(false);
  };

  const handleCancel2 = e => {
    setGetVisible(false);
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
      <Table
        dataSource={books === null ? [] : books}
        columns={[
          {
            title: 'Book',
            dataIndex: 'book',
            key: 'book',
            render: (text, record) => (
              <div className="list" key={uuid.v4()}>
                <div className="Read">
                  <Icon type="read" />
                </div>
                <StyledTitleh3>{record.title}</StyledTitleh3>
                <StyledContentP>
                  <span>{record.author}</span>
                  <span>{record.message}</span>
                  <span>{record.url}</span>
                </StyledContentP>
                <StyledSearchButton onClick={() => showGetModal(record)}>
                  <Icon type="search" />
                </StyledSearchButton>
                <StyledEditButton onClick={() => showEditModal(record)}>
                  <Icon type="edit" />
                </StyledEditButton>
                <StyledDeleteButton
                  onClick={() => deleteBook(books, record.bookId)}
                >
                  <Icon type="delete" />
                </StyledDeleteButton>
              </div>
            ),
          },
        ]}
        loading={false}
        showHeader={false}
        pagination={{
          size: 'small',
          pageSize: 10,
          align: 'center',
        }}
        bodyStyle={{
          borderTop: '1px solid #e8e8e8',
        }}
        style={{
          marginTop: 30,
        }}
        rowKey="bookId"
      />

      <EditBookContainer
        book={book}
        visible={editVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
      />
      <GetBookModal
        book={book}
        visible={getVisible}
        handleOk={handleOk2}
        handleCancel={handleCancel2}
      />
    </StyledContent>
  );
};

export default ContentUI;
