import React from 'react';
import { Button, Modal } from 'antd';
import styled from 'styled-components';

const GetBookModal = ({ visible, handleOk, handleCancel, book }) => {
  const clickBtn = () => {
    handleCancel();
  };

  const cancelBtn = () => {
    handleCancel();
  };

  const StyledAuthor = styled.p`
    font-style: italic;
    position: absolute;
    top: 16px;
    right: 60px;
    color: rgba(0, 0, 0, 0.3);
  `;

  const StyledMessage = styled.p`
    font-size: 15px;
  `;

  const StyledUrl = styled.a.attrs(({ url }) => ({
    target: '_blank',
    rel: 'noopener noreferrer',
    href: 'https://' + url,
  }))`
    color: #1890ff;
    font-size: 12px;
  `;

  return (
    <Modal
      title={book.title}
      visible={visible}
      onOk={handleOk}
      onCancel={cancelBtn}
      footer={[
        <Button key="submit" type="primary" onClick={clickBtn}>
          Ok
        </Button>,
      ]}
    >
      <StyledAuthor>{book.author}</StyledAuthor>
      <StyledMessage>{book.message}</StyledMessage>
      <StyledUrl url={book.url}>{book.url}</StyledUrl>
    </Modal>
  );
};

export default GetBookModal;
