# 개발 서적 평가 서비스

## - 프로젝트 마무리 -

**목차**

1. [새로고침되는 것처럼 보이는 에러 해결하기](#a1)
2. [Edit Saga 추가하기](#a2)
3. [Edit Book Container 추가하기](#a3)
4. [Get Book Modal Component 추가하기](#b1)
5. [thunk 코드 삭제하기](#b2)
6. [페이지네이션 추가하기](#b3)
7. [라이브러리 인스톨하기](#a5)
8. [Head Component 추가하기](#a6)
9. [Home에 Head 추가하기](#a7)

-----------

### 새로고침되는 것처럼 보이는 에러 해결하기 <a id="a1"></a>

- 문제 : 서적 추가했을 경우, 새로고침되듯 화면이 깜박이면서 렌더링
- 원인 : `PENDING` 상태일 때, books 스토어가 일시적으로 빈배열(`[]`)로 초기화됨.
- 해결 ▿

```jsx
// src/redux/modules/books.js

const books = handleActions(
  {
    // PENDING: (state, action) => ({ books: [], loading: true, error: null }),
    PENDING: (state, action) => ({
      books: state.books ? state.books : [],
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      books: [],
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);
export default books;
```

<br/>

### Edit Saga 추가하기 <a id="a2"></a>

```jsx
// src/redux/modules/books.js
export const editBookSaga = createAction('EDIT_BOOK_SAGA');

...

function* editBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    const res = yield call(
      BookService.editBook,
      token,
      books.payload.bookId,
      books.payload.book,
    );
    console.log('aaa는용: ', res);
    // dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
    yield put(
      success(
        books.payload.books.map(book =>
          book.bookId === books.payload.bookId
            ? {
                ...books.payload.book,
              }
            : book,
        ),
      ),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

const initialState = {
  books: [],
  books: null,
  loading: false,
  error: null,
};


const books = handleActions(
  {
    PENDING: (state, action) => ({
      books: state.books ? state.books : [],
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      books: action.payload.books,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      books: [],
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);
export default books;
```

<br/>

### Edit Book Container 추가하기  <a id="a3"></a>

```jsx
// src/containers/EditBookContainer.jsx
import { connect } from 'react-redux';
import { editBookSaga } from '../redux/modules/books';
import EditBookModal from '../components/Home/EditBookModal';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  editBook: (books, bookId, book) => {
    dispatch(editBookSaga({ books, bookId, book }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EditBookModal);
```

<br/>

### Edit Book Modal Component 추가하기  <a id="a4"></a>

```jsx
// src/components/Home/EditBookModal.jsx
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
```

<br/>

### Get Book Modal Component 추가하기 <a id="b1"></a>

- 단일 조회는 따로 서비스를 이용하지않고 자체 필터를 이용해서 보여준다.

```jsx
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
```

<br/>

### thunk 코드 삭제하기 <a id="b2"></a>

```jsx
import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
// import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga'; // 1. import
import rootSaga from './modules/saga';
export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware(); // 2. saga 미들웨어 생성
const create = () => {
  const token = localStorage.getItem('token');
  const store = createStore(
    reducer(history),
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(
      // applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware),
      applyMiddleware(routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);
  return store;
};
// 지연 초기화 방식 : 함수 실행 시점을 직접 결정하기 위해서 사용한다.
export default create;
```

<br/>

### 페이지네이션 추가하기 <a id="b3"></a>

- `antd`의 `Table`컴포넌트를 이용하여 페이지네이션을 추가한다.
- `setEditVisible` , `setGetVisible`도 동시에 추가한다.
- `setEditVisible` : 수정 Modal을 보여주는 상태를 관리해주는 useSetState
- `setGetVisible` : 단일 Modal을 보여주는 상태를 관리해주는 useSetState

```jsx
// src/components/Home/ContentUI.jsx
import { Spin, Table } from 'antd';
import GetBookModal from './GetBookModal';
	
...
  
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
...
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
```

<br/>

 ### 라이브러리 인스톨하기   <a id="a5"></a>

- react-helmet

```bash
npm i react-helmet
```

<br/>

### Head Component 추가하기  <a id="a6"></a>

```jsx
// src/components/Head.jsx
import React from 'react';
import { Helmet } from 'react-helmet';

// default document 정보
const Head = () => (
  <Helmet>
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <meta charSet="utf-8" />
    <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />
    <title>Hyeok999's Books Review</title>
    <meta name="description" content="description" />
    <meta name="keyword" content="marktube" />
    <meta property="og:url" content="https://" />
    <meta property="og:title" content="title" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="description" />
    <meta property="og:image" content="" />
    <meta property="og:image:width" content="600" />
    <meta property="og:image:height" content="315" />
  </Helmet>
);

export default Head;
```

<br/>

### Home에 Head 추가하기  <a id="a7"></a>

```jsx
// src/pages/Home.jsx
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
      <Head /> {/* 추가 */}
      <HeaderContainer />
      <Layout>
        ...
```

