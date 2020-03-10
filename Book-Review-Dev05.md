# 개발 서적 평가 서비스

## - 미들웨어 추가하기 : Redux Saga -

**목차**

1. [라이브러리 인스톨하기](#a1)
2. [action, reducer, store 파일 삭제](#a2)
3. [모듈 만들기](#a3)
   - [auth.js](#a4)
   - [books.js](#a5)
   - [saga.js](#a7)
   - [create.js](#a8)
4. [HOC 수정하기](#a9)
5. [서비스 추가하기](#a10)
6. [Container 수정하기](#a11)
   - [AddBookContainer](#a12)
   - [BooksContainer](#a13)
   - [HeaderContainer](#a14)
7. [SigninLoginForm Saga 적용하기](#a16)
8. [connected-react-router 적용하기](#a17)
   - [App.js](#a18)
   - [index.js](#a19)
-----------

 ### 라이브러리 인스톨하기 <a id="a1"></a>

- redux-action
- redux-saga
- connected-react-router

```bash
npm i redux-action
npm i redux-saga
npm i connected-react-router
```

<br/>

### action, reducer, store 파일 삭제 <a id="a2"></a>

삭제할 파일들

- src/actions.js
- src/reducer/**.js
- src/store.js

<br/>

### 모듈 만들기  <a id="a3"></a>

- Redux Saga 적용.
- redux-actions으로 간편하게 액션 과 액션 함수 만들기.

#### auth.js <a id="a4"></a>

```jsx
// src/redux/modules/auth.js
import UserService from '../../services/UserService';
import { push } from 'connected-react-router';
import { createAction, createActions, handleActions } from 'redux-actions';
import { put, call, select, takeEvery, takeLatest } from 'redux-saga/effects';

const options = {
  prefix: 'books-review/auth',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: token => ({ token }),
  },
  'PENDING',
  'FAIL',
  options,
);

export const loginSaga = createAction('LOG_IN_SAGA');
export const logoutSaga = createAction('LOG_OUT_SAGA');

function* login(auth) {
  try {
    yield put(pending());
    const res = yield call(
      UserService.login,
      auth.payload.email,
      auth.payload.password,
    );
    const { token } = res.data;
    localStorage.setItem('token', token);
    yield put(success(token));
    yield put(push('/'));
  } catch (error) {
    yield put(fail(error));
  }
}

function* logout() {
  const token = yield select(state => state.auth.token);
  try {
    yield call(UserService.logout, token);
  } catch (error) {
    yield put(fail(error));
  }
  yield put(success(null)); // 리덕스 토큰 지우기
  localStorage.removeItem('token'); // 토큰 지우기
}

// saga 함수를 등록하는 saga
// 내가 만든 비동기로직 (나의 사가 함수 : getBooksSaga)을 동록하는 사가 함수
export function* authSaga() {
  // 인자 1. 액션타입 , 2. 사가함수
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeEvery('LOG_IN_SAGA', login);
  yield takeLatest('LOG_OUT_SAGA', logout);
}

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const auth = handleActions(
  {
    PENDING: (state, action) => ({ token: null, loading: true, error: null }),
    SUCCESS: (state, action) => ({
      token: action.payload.token,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      token: null,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options,
);

export default auth;
```

<br/>

#### books.js  <a id="a5"></a>

```jsx
// src/redux/modules/books.js
import BookService from '../../services/BookService';
import { createAction, createActions, handleActions } from 'redux-actions';
import { put, delay, call, select, takeLatest } from 'redux-saga/effects';

const options = {
  prefix: 'books-review/books',
};

const { success, pending, fail } = createActions(
  {
    SUCCESS: books => ({ books }),
  },
  'PENDING',
  'FAIL',
  options,
);

export const getBooksSaga = createAction('GET_BOOKS_SAGA');
export const deleteBookSaga = createAction('DELETE_BOOK_SAGA');
export const addBookSaga = createAction('ADD_BOOK_SAGA');

function* getBooks() {
  // 비동기 로직을 수행가능하다.
  // const token = action.payload.token;
  const token = yield select(state => state.auth.token);
  try {
    // dispatch(pending());
    yield put(pending());
    // await sleep(2000);
    yield delay(2000);
    // const res = await BookRequest.getBooks(token);
    const res = yield call(BookService.getBooks, token);
    // dispatch(success(res.data));
    yield put(success(res.data));
  } catch (error) {
    // dispatch(fail(error));
    yield put(fail(error));
  }
}

function* deleteBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    const res = yield call(BookService.deleteBook, token, books.payload.bookId);
    if (res.data.success === true) {
      // dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
      yield put(
        success(
          books.payload.books.filter(
            book => book.bookId !== books.payload.bookId,
          ),
        ),
      );
    }
  } catch (error) {
    yield put(fail(error));
  }
}

function* addBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(pending());
    console.log('5', books);
    const res = yield call(BookService.addBook, token, books.payload.book);
    yield put(
      success([...books.payload.books, { ...res.data, deletedAt: null }]),
    );
  } catch (error) {
    yield put(fail(error));
  }
}

// saga 함수를 등록하는 saga
// 내가 만든 비동기로직 (나의 사가 함수 : getBooksSaga)을 동록하는 사가 함수
export function* booksSaga() {
  // 인자 1. 액션타입 , 2. 사가함수
  // yield takeEvery(START_BOOKS_SAGA, getBooksSaga);
  // yield takeLatest(START_BOOKS_SAGA, getBooksSaga);
  yield takeLatest('GET_BOOKS_SAGA', getBooks);
  yield takeLatest('DELETE_BOOK_SAGA', deleteBook);
  yield takeLatest('ADD_BOOK_SAGA', addBook);
}

// 초기값
const initialState = {
  books: [],
  loading: false,
  error: null,
};

const books = handleActions(
  {
    PENDING: (state, action) => ({ books: [], loading: true, error: null }),
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

#### reducer.js <a id="a6"></a>

- 리듀서를 모아놓은 리듀서 (즉, combineReducer)

```jsx
// src/redux/modules/reducer.js
import { combineReducers } from 'redux';
import books from './books';
import auth from './auth';
import { connectRouter } from 'connected-react-router';

const reducer = history =>
  combineReducers({
    books,
    auth,
    router: connectRouter(history),
  });

export default reducer;
```

<br/>

#### saga.js <a id="a7"></a>

```jsx
// src/redux/modules/saga.js
// 전체 사가를 모은다.

import { all } from 'redux-saga/effects';
import { booksSaga } from './books';
import { authSaga } from './auth';

export default function* rootSaga() {
  yield all([booksSaga(), authSaga()]);
}
```

<br/>

#### create.js <a id="a8"></a>

```jsx
// src/redux/create.js

import { createStore, applyMiddleware } from 'redux';
import reducer from './modules/reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// react-router-dom 설치할떄 설치됨.
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
      applyMiddleware(thunk, routerMiddleware(history), sagaMiddleware),
    ),
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
// 지연 초기화 방식 : 함수 실행 시점을 직접 결정하기 위해서 사용한다.

export default create;
```

<br/>

### HOC 수정하기 <a id="a9"></a>

- store가 변경되었으므로 코드를 수정한다.

```jsx
// src/hocs/withAuth.js
const token = useSelector(state => state.token); // 전
const token = useSelector(state => state.auth.token); // 후
```

<br/>

### 서비스 추가하기 <a id="a10"></a>

- login, logout 서비스를 추가한다.

```jsx
// src/services/UserService.js
import axios from 'axios';

const USER_API_URL = 'https://api.marktube.tv/v1/me';

export default class UserService {
  static login(email, password) {
    return axios.post(USER_API_URL, {
      email,
      password,
    });
  }

  static logout(token) {
    return axios.delete(USER_API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
```

<br/>

### Container 수정하기 <a id="a11"></a>

- thunk 제거 
- saga 추가

#### AddBookContainer  <a id="a12"></a>

```jsx
// src/containers/AddBookContainer.jsx

import { connect } from 'react-redux';
import { addBookSaga } from '../redux/modules/books';
import AddBookModal from '../components/Home/AddBookModal';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  addBook: (books, book) => {
    dispatch(addBookSaga({ books, book }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AddBookModal);

```

<br/>

#### BooksContainer <a id="a13"></a>

```jsx
// src/containers/BooksContainer.jsx

import { connect } from 'react-redux';
import { getBooksSaga, deleteBookSaga } from '../redux/modules/books';
import ContentUI from '../components/Home/ContentUI';

const mapStateToProps = state => ({
  books: state.books.books,
  token: state.books.token,
  loading: state.books.loading,
  error: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  getBooks: () => {
    dispatch(getBooksSaga());
  },
  deleteBook: (books, bookId) => {
    dispatch(deleteBookSaga({ books, bookId }));
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
import { logoutSaga } from '../redux/modules/auth';

export default connect(
  state => ({ token: state.auth.token }),
  dispatch => ({
    signOut: () => {
      dispatch(logoutSaga());
    },
  }),
)(Header);
```

<br/>

#### SigninLoginFormContainer <a id="a15"></a>

```jsx
// src/containers/SigninLoginFormContainer.jsx

import { connect } from 'react-redux';
import SigninLoginForm from '../components/Signin/SigninForm/SigninLoginForm';
import { loginSaga } from '../redux/modules/auth';

export default connect(
  state => ({
    loading: state.auth.loading,
    error: state.auth.error,
  }),
  dispatch => ({
    signIn: (email, password) => {
      dispatch(loginSaga({ email, password }));
    },
  }),
)(SigninLoginForm);
```

<br/>

### SigninLoginForm Saga 적용하기 <a id="a16"></a>

```jsx
// src/components/Signin/SigninForm/SigninLoginForm.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button, message } from 'antd';

const SigninLoginForm = ({ className, loading, signIn, error }) => {
  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  
  async function click() {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    signIn(email, password);
  }
  useEffect(() => {
    if (error === null) return;
    if (error === 'USER_NOT_EXIST') {
      message.error('유저가 없습니다.');
    } else if (error === 'PASSWORD_NOT_MATCH') {
      message.error('비밀번호가 틀렸습니다.');
    } else {
      message.error('로그인에 문제가 있습니다.');
    }
  }, [error]);
  async function press(e) {
    if (e.key !== 'Enter') return;
    click();
  }
... // 동일
```

<br/>

### connected-react-router 적용하기 <a id="a17"></a>

> Redux에서 주소를 변경 및 확인하기 위해 history객체를 관리하며 필요에 의해 꺼내쓸 수 있는 유용한 라이브러리

- 특징 ▿
- 단방향 흐름을 통해 리덕스에서 router상태를 동기화 할 수 있다. (history객체 -> store-> router-> component)
- react Router 버전 v4, v5를 지원한다. 
- 함수형 컴포넌트를 지원한다. 
- redux-thunk나 redux-saga를 통해 히스토리 객체를 dispatch할 수 있다. 

#### App.js <a id="a18"></a>

```jsx
// src/App.js
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import ErrorBoundary from 'react-error-boundary';

import { ConnectedRouter } from 'connected-react-router';
import { history } from './redux/create';
const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
  </ErrorBoundary>
);

export default App;
```

<br/>

#### index.js <a id="a19"></a>

```jsx
// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './index.css';
import App from './App';
import create from './redux/create';
import { Provider } from 'react-redux';

const store = create();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

