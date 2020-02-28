import React from 'react';
import { Button, Modal } from 'antd';

import InputBookInfo from './InputBookInfo';

const EditBookModal = ({
  visible,
  handleOk,
  handleCancel,
  books,
  book,
  editBook,
}) => {
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

  const clickBtn = () => {
    const bookRef = {
      title: titleRef.current.state.value,
      message: messageRef.current.state.value,
      author: authorRef.current.state.value,
      url: urlRef.current.state.value,
    };

    function edit(bookRef) {
      editBook(books, book.bookId, {
        title: bookRef.title,
        message: bookRef.message,
        author: bookRef.author,
        url: bookRef.url,
      });
    }
    edit(bookRef);
    initValue();
    handleCancel();
  };

  const cancelBtn = () => {
    initValue();
    handleCancel();
  };

  return (
    <Modal
      title="Edit Book"
      visible={visible}
      onOk={handleOk}
      onCancel={cancelBtn}
      footer={[
        <Button key="back" onClick={cancelBtn}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={clickBtn}>
          Edit
        </Button>,
      ]}
    >
      <InputBookInfo info="Title" reference={titleRef} value={book.title} />
      <InputBookInfo
        info="Message"
        reference={messageRef}
        value={book.message}
      />
      <InputBookInfo info="Author" reference={authorRef} value={book.author} />
      <InputBookInfo info="URL" reference={urlRef} value={book.url} />
    </Modal>
  );
};

export default EditBookModal;
