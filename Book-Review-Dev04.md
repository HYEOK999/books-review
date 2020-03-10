# 개발 서적 평가 서비스

## - 미들웨어 추가하기 : Redux Thunk -

**목차**

1. [라이브러리 인스톨하기](#a1)

2. [action에 dispatch 추가하기 + redux-thunk 적용](#a2)

3. [Store 수정하기](#a3)

4. [리듀서 추가 및 수정](#a4)

   - [Books Reducer 추가](#a5)

   - [Combine Reducer 수정 - books 리듀서 추가](#a6)
   - [Loading Reducer 수정](#a7)

5. [Services 추가](#a8)

6. [HOC Code 수정](#a9)

7. [Container 추가하기](#a10)

   - [SigninLoginFormContainer](#a11)
   - [AddBookContainer](#a12)
   - [BooksContainer](#a13)
   - [HeaderContainer](#a14)

8. [Home 관련 Component 추가하기](#a15)

   - [AddBookModal Component](#a16)
   - [ContentUI Component](#a17)
   - [Header Component](#a18)

9. [SigninLoginForm 에 thunk 도입하기](#a19)
-----------

 ### 라이브러리 인스톨하기 <a id="a1"></a>

- redux-thunk
- redux-devtools-extension

```bash
npm i redux-thunk
npm i redux-devtools-extension
```

<br/>

### action에 dispatch 추가하기 + redux-thunk 적용 <a id="a2"></a>

- 액션 타입과, 액션, 리듀서 한 세트(**Ducks 패턴**)를 만드는 작업 추가
- 미들웨어 `redux-thunk` 적용

```jsx
// src/actions.js
import axios from 'axios';
import BookService from './services/BookService';

export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const SET_BOOKS = 'SET_BOOKS';

export const setToken = token => ({
  type: SET_TOKEN,
  token,
});
export const removeToken = () => ({
  type: REMOVE_TOKEN,
});
export const startLoading = () => ({
  type: START_LOADING,
});
export const endLoading = () => ({
  type: END_LOADING,
});
export const setError = error => ({
  type: SET_ERROR,
  error,
});
export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const setBooks = books => ({
  type: SET_BOOKS,
  books,
});

// Thunk
export const loginThunk = (email, password) => async dispatch => {
  try {
    dispatch(clearError());
    dispatch(startLoading());
    const response = await axios.post('https://api.marktube.tv/v1/me', {
      email,
      password,
    });
    const { token } = response.data;
    dispatch(endLoading());
    localStorage.setItem('token', token);
    dispatch(setToken(token));
  } catch (err) {
    dispatch(endLoading());
    dispatch(setError(err.response.data.error));
    throw err;
  }
};

export const logoutThunk = token => async dispatch => {
  try {
    await axios.delete('https://api.marktube.tv/v1/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log(error);
  }

  localStorage.removeItem('token'); // 토큰 지우기

  dispatch(removeToken()); // 리덕스 토큰 지우기
};

export const setBooksThunk = token => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    const res = await BookService.getBooks(token);
    dispatch(endLoading());
    dispatch(setBooks(res.data));
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};

export const addBookThunk = (token, books, book) => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    const res = await BookService.addBook(token, book);
    dispatch(endLoading());
    dispatch(setBooks([...books, { ...res.data, deletedAt: null }]));
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};

export const deleteBookThunk = (token, books, bookId) => async dispatch => {
  try {
    dispatch(startLoading());
    dispatch(clearError());
    const res = await BookService.deleteBook(token, bookId);
    dispatch(endLoading());
    if (res.data.success === true) {
      dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
    }
  } catch (error) {
    dispatch(endLoading());
    dispatch(setError(error));
  }
};
```

<br/>

### Store 수정하기 <a id="a3"></a>

- `create`함수의 2번째 인자 제거

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import create from './store';
import { Provider } from 'react-redux';

const token = localStorage.getItem('token');
const store = create({ token });

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

<br/>

- `applyMiddleware` 에 redux-thunk 추가 

```jsx
// src/store.js
import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

export default function create(initialState) {
  return createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
```

<br/>

### 리듀서 추가 및 수정 <a id="a4"></a>

#### Books Reducer 추가 <a id="a5"></a>

```jsx
// src/reducer/books.js
import { SET_BOOKS } from '../actions';

const initialState = [];

const books = (state = initialState, action) => {
  switch (action.type) {
    case SET_BOOKS:
      return [...action.books];
    default:
      return state;
  }
};

export default books;
```

<br/>

#### Combine Reducer 수정 - books 리듀서 추가 <a id="a6"></a>

```jsx
// src/reducer/index.js
import token from './token';
import loading from './loading';
import error from './error';
import books from './books';

const reducer = combineReducers({
  token,
  loading,
  error,
  books,
});

export default reducer;
```

<br/>

#### Loading Reducer 수정 <a id="a7"></a>

- 초기값을 `null`로 변경
- 로딩이 끝날 경우 `false`아닌 `null`로 변경

```jsx
// src/reducer/loading.js
import { START_LOADING, END_LOADING } from '../actions';

const initialState = null;

const loading = (state = initialState, action) => {
  if (action.type === START_LOADING) {
    return true;
  } else if (action.type === END_LOADING) {
    return null;
  }
  return state;
};
```

<br/>

### Services 추가 <a id="a8"></a>

- XHR 부분을 따로 Service로 만들어 별도 관리한다.
- 전체 조회 : `getBooks`
- 단일 조회 : `getBook`
- 삭제 : `deleteBook`
- 추가 : `addBook`
- 수정 : `editBook` 

```jsx
// src/services/BookService.js
import axios from 'axios';

const BOOK_API_URL = 'https://api.marktube.tv/v1/book';

export default class BookService {
  static async getBooks(token) {
    return axios.get(BOOK_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async getBook(token, bookId) {
    return axios.get(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async deleteBook(token, bookId) {
    return axios.delete(`${BOOK_API_URL}/${bookId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async addBook(token, book) {
    return axios.post(BOOK_API_URL, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static async editBook(token, bookId, book) {
    return axios.patch(`${BOOK_API_URL}/${bookId}`, book, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  static;
}
```

<br/>

### HOC Code 수정 <a id="a9"></a>

- `withAuth` 의 코드를 수정한다.

```jsx
// src/hocs/withAuth.js
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function withAuth(Component, loggedin = true) {
  function WrappedComponent(props) {
    const token = useSelector(state => state.token);
    if (loggedin) {
      if (token === null) {
        return <Redirect to="/signin" />;
      }
      return <Component {...props} token={token} />;
    } else {
      if (token !== null) {
        return <Redirect to="/" />;
      }
      return <Component {...props} />;
    }
  }

  WrappedComponent.displayName = `withAuth(${Component.name})`;
  return WrappedComponent;
}
export default withAuth;
```

<br/>

### Container 추가하기 <a id="a10"></a>

- 컴포넌트에서 화면에 뿌려질 데이터만을 작성한다.
- 모든 로직, 데이터 가공은 Container에서 처리하여 컴포넌트에게 전달한다.

#### SigninLoginFormContainer <a id="a11"></a>

```jsx
// src/containers/SigninLoginFormContainer.jsx
import { connect } from 'react-redux';
import SigninLoginForm from '../components/Signin/SigninForm/SigninLoginForm';
import { loginThunk } from '../actions';

export default connect(
  state => ({
    loading: state.loading,
    error: state.error,
  }),
  dispatch => ({
    loginThunk: (email, password) => {
      dispatch(loginThunk(email, password));
    },
  }),
)(SigninLoginForm);
```

<br/>

#### AddBookContainer <a id="a12"></a>

```jsx
// src/containers/AddBookContainer.jsx
import { connect } from 'react-redux';
import { addBookThunk } from '../actions';
import AddBookModal from '../components/Home/AddBookModal';

const mapStateToProps = state => ({
  books: state.books,
  token: state.token,
});

const mapDispatchToProps = dispatch => ({
  addBook: async (token, books, book) => {
    dispatch(addBookThunk(token, books, book));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);
```

<br/>

#### BooksContainer <a id="a13"></a>

```jsx
// src/containers/BooksContainer.jsx
import { connect } from 'react-redux';
import { setBooksThunk, deleteBookThunk } from '../actions';
import ContentUI from '../components/Home/ContentUI';

const mapStateToProps = state => ({
  books: state.books,
  token: state.token,
  loading: state.loading,
  error: state.error,
});

const mapDispatchToProps = dispatch => ({
  setBooks: async token => {
    dispatch(setBooksThunk(token));
  },
  deleteBook: async (token, books, bookId) => {
    dispatch(deleteBookThunk(token, books, bookId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ContentUI);
```

<br/>

#### HeaderContainer <a id="a14"></a>

```jsx
// src/containers/HeaderContainer.jsx

import { connect } from 'react-redux';
import Header from '../components/Home/Header';
import { logoutThunk } from '../actions';

export default connect(
  state => ({ token: state.token }),
  dispatch => ({
    logoutThunk: token => {
      dispatch(logoutThunk(token));
    },
  }),
)(Header);
```

<br/>

### Home 관련 Component 추가하기. <a id="a15"></a>

#### AddBookModal Component <a id="a16"></a>

````jsx
// src/components/Home/AddBookModal.jsx
import React from 'react';
import { Button, Modal } from 'antd';

import InputBookInfo from './InputBookInfo';

const AddBookModal = ({
  visible,
  handleOk,
  handleCancel,
  addBook,
  token,
  books,
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

  const click = () => {
    const book = {
      title: titleRef.current.state.value,
      message: messageRef.current.state.value,
      author: authorRef.current.state.value,
      url: urlRef.current.state.value,
    };

    async function add(token, book) {
      try {
        await addBook(token, books, {
          title: book.title,
          message: book.message,
          author: book.author,
          url: book.url,
        });
      } catch (error) {
        console.log(error);
      }
    }
    add(token, book);
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
````

<br/>

#### ContentUI Component  <a id="a17"></a>

- 기존 ContentUI Component를 수정.

```jsx
// src/components/Home/ContentUI.jsx
import React from 'react';
import uuid from 'uuid';

import styled from 'styled-components';
import { Layout, Button, Icon } from 'antd';
import { useEffect } from 'react';

const { Content } = Layout;

... // style components

const ContentUI = ({ token, books, setBooks, deleteBook, editBook }) => {
  useEffect(() => {
    setBooks(token);
  }, [token, setBooks]);

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
              <StyledDeleteButton
                onClick={() => deleteBook(token, books, book.bookId)}
              >
                <Icon type="delete" />
              </StyledDeleteButton>
            </li>
          ))}
      </ul>
```

<br/>

#### Header Component  <a id="a18"></a>

```jsx
// src/components/Home/Header.jsx
import React from 'react';
import HeaderUI from './HeaderUI';

const Header = ({ token, logoutThunk }) => {
  function logout() {
    logoutThunk(token);
  }

  return (
    <>
      <HeaderUI logout={logout}></HeaderUI>
    </>
  );
};
export default Header;
```

<br/>

### SigninLoginForm 에 thunk 도입하기  <a id="a19"></a>

- **주석 친 부분은 제거한다.**
- redux-thunk를 도입한다. 
- 기존 코드들은 `Container`에서 대부분 처리하고 미들웨어인 thunk에서 서비스를 처리한다.

```jsx
// src/components/Signin/SigninForm/SigninLoginForm.jsx
import { useHistory } from 'react-router-dom';
import { Button, message } from 'antd';

// const SigninLoginForm = ({ className, loading, login, error }) => {
const SigninLoginForm = ({ className, loading, loginThunk, error }) => {
  const history = useHistory();
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  
  async function click() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await loginThunk(email, password);
      history.push('/');
    } catch {}
    // try {
    //   // setLoading(true);
    // await login(email, password);
    // history.push('/');
    //   await login(email, password);
    //   // history.push('/');
    // } catch (error) {}
  }

  useEffect(() => {
    if (error === null) return;
    if (error === 'USER_NOT_EXIST') {
      message.error('유저가 없습니다.');
      
  ... // 동일
```

