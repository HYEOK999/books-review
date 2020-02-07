import React from 'react';
import { Button, Modal } from 'antd';

import InputBookInfo from './InputBookInfo';

const AddBookModal = ({ visible, handleOk, handleCancel, addBook, books }) => {
  const titleRef = React.createRef();
  const messageRef = React.createRef();
  const authorRef = React.createRef();
  const urlRef = React.createRef();

  const initValue = () => {
    titleRef.current.state.value = '';
    messageRef.current.state.value = '';
    authorRef.current.state.value = '';
    urlRef.current.state.value = '';
  };

  const click = () => {
    const book = {
      title: titleRef.current.state.value,
      message: messageRef.current.state.value,
      author: authorRef.current.state.value,
      url: urlRef.current.state.value,
    };

    async function add(book) {
      try {
        await addBook(books, {
          title: book.title,
          message: book.message,
          author: book.author,
          url: book.url,
        });
      } catch (error) {
        console.log(error);
      }
    }
    add(book);
    initValue();
    handleCancel();
  };

  return (
    <Modal
      title="Add Book List"
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={click}>
          Add
        </Button>,
      ]}
    >
      <InputBookInfo info="Title" reference={titleRef} />
      <InputBookInfo info="Message" reference={messageRef} />
      <InputBookInfo info="Author" reference={authorRef} />
      <InputBookInfo info="URL" reference={urlRef} />
    </Modal>
  );
};

export default AddBookModal;
