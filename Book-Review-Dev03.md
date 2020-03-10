# 개발 서적 평가 서비스

## - Redux 적용하기 -

**목차**

1. [라이브러리 인스톨하기](#a1)
2. [action 추가하기](#a2)
3. [Store 생성하기](#a4)
4. [Reducer 추가하기](#a3)
   - [Combine Reducer](#a5)
   - [Loading Reducer](#a6)
   - [Token Reducer](#a7)
   - [Error Reducer](#a8)
5. [Logout 기능 추가](#a9)
6. [HOC(High Order Component) 추가](#a10)
7. [Singin Login Form Container 작성](#a11)
-----------

 ### 라이브러리 인스톨하기 <a id="a1"></a>

- redux 
- react-redux

```bash
npm i react-redux
npm i redux
```

<br/>

### action 추가하기 <a id="a2"></a>

- 토큰 생성 및 제거
- 에러 생성 및 초기화(Clear)
- 로딩 시작 및 끝

```jsx
export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';
export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

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
```

<br/>

### Store 생성하기 <a id="a4"></a>

- Store에 `reducer`, `initialState`, `devtools`를 적용

```jsx
// src/store.js
import { createStore } from 'redux';
import reducer from './reducer';

export default function create(initialState) {
  return createStore(
    reducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
  );
}
```

<br/>

- index.js 에서 `store` 의 `create`함수를 import
- index.js 에서 하위 컴포넌트에게 속성으로 store를 모두 전달

```jsx
// src/index.js
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import create from './store';
import { Provider } from 'react-redux';

const token = localStorage.getItem('token');
const store = create(
  { token },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

<br/>

### Reducer 추가하기 <a id="a3"></a>

####  Combine Reducer <a id="a5"></a>

```jsx
// src/reducer/index.js
import { combineReducers } from 'redux';
import token from './token';
import loading from './loading';
import error from './error';

const reducer = combineReducers({
  token,
  loading,
  error,
});

export default reducer;
```

<br/>

#### Loading Reducer <a id="a6"></a>

- 초기값 : `false`

```jsx
// src/reducer/loading.js
import { START_LOADING, END_LOADING } from '../actions';

const initialState = false;

const loading = (state = initialState, action) => {
  if (action.type === START_LOADING) {
    return true;
  } else if (action.type === END_LOADING) {
    return false;
  }
  return state;
};

export default loading;
```

<br/>

#### Token Reducer <a id="a7"></a>

- 초기값 : `null`

```jsx
// src/reducer/token.js
import { SET_TOKEN, REMOVE_TOKEN } from '../actions';

const initialState = null;

const token = (state = initialState, action) => {
  if (action.type === SET_TOKEN) {
    return action.token;
  } else if (action.type === REMOVE_TOKEN) {
    return null;
  }
  return state;
};

export default token;
```

<br/>

#### Error Reducer <a id="a8"></a>

- 초기값 : `null`

```jsx
// src/reducer/error.js 
import { SET_ERROR, CLEAR_ERROR } from '../actions';

const initialState = null;

const error = (state = initialState, action) => {
  if (action.type === SET_ERROR) {
    return action.error;
  } else if (action.type === CLEAR_ERROR) {
    return null;
  }
  return state;
};

export default error;
```

<br/>

### Logout 기능 추가 <a id="a9"></a>

- Home.jsx에 `useDispatch`, `removeToken` 추가
- 로컬스토리지의 토큰키를 지우는 작업 추가.
- 토큰키를 지우고 `signin`페이지로 강제이동.

```jsx
// src/pages/Home.jsx
import InputBookInfo from '../components/Home/InputBookInfo';
import HeaderUI from '../components/Home/HeaderUI';
import ContentUI from '../components/Home/ContentUI';
import { useDispatch } from 'react-redux';
import { removeToken } from '../actions';

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
  const dispatch = useDispatch();
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

  async function logout() {
    try {
      await axios.delete('https://api.marktube.tv/v1/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error);
    }

    localStorage.removeItem('token');
    history.push('/signin'); // 로그아웃시 보여줄 페이지
    dispatch(removeToken());
  }
...
```

<br/>

### HOC(High Order Component) 추가 <a id="a10"></a>

- displayName 설정 해주어야 함.(display 이름 설정(디버깅시 이름을 유지시켜주기위함.)
- token 키가 없다면 `/signin` 페이지로 리다이렉트 함.

```JSX
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

function withAuth(Component) {
  function WrappedComponent(props) {
    // const token = localStorage.getItem('token');
    const token = useSelector(state => state.token);
    if (token === null) {
      return <Redirect to="/signin" />;
    }
    return <Component {...props} token={token} />;
  }
  WrappedComponent.displayName = `withAuth(${Component.name})`;
  return WrappedComponent;
}
export default withAuth;
// 관련없는 props는 패스해주어라.
```

<br/>

### Singin Login Form Container 작성 <a id="a11"></a>

- `SigninForm` 컴포넌트에서 할 작업들을 Container에서 작업하고 connect를 통해 store와 함께 내려준다.

```jsx
import { connect } from 'react-redux';
import SigninLoginForm from '../components/Signin/SigninForm/SigninLoginForm';
import {
  setToken,
  startLoading,
  endLoading,
  setError,
  clearError,
} from '../actions';
import axios from 'axios';

export default connect(
  state => ({
    loading: state.loading,
    error: state.error,
  }),
  dispatch => ({
    login: async (email, password) => {
      try {
        dispatch(startLoading());
        const response = await axios.post('https://api.marktube.tv/v1/me', {
          email,
          password,
        });
        const { token } = response.data;
        dispatch(endLoading());
        localStorage.setItem('token', token);
        dispatch(setToken(token));
        dispatch(clearError());
      } catch (err) {
        dispatch(endLoading());
        dispatch(setError(err.response.data.error));
        throw err;
      }
    },
  }),
)(SigninLoginForm);
```

