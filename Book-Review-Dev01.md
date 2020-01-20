# 개발 서적 평가 서비스

## -라우팅 설정하기-

**목차**

1. [프로젝트 생성](#a1)
2. [라이브러리 인스톨하기](#a2)
3. [nvm 설정파일 생성하기](#a3)
4. [package.json 설정 추가하기](#a4)
5. [prettier 설정파일 생성하기](#a5)
6. [라우터 설정하기](#a6)
7. [pages 폴더 만들고 컴포넌트 설정하기](#a7)

---------

### 프로젝트 생성 <a id="a1"></a>

```bash
npx create-react-app books-review
```

<br/>

### 라이브러리 인스톨하기  <a id="a2"></a>

```bash
cd books-review
npm i react-router-dom
npm i react-error-boundary
npm i prettier eslint-config-prettier husky lint-staged -D
```

<br/>

### nvm 설정파일 생성하기 <a id="a3"></a>

**.nvmrc** 파일 생성 (위치 : .gitignore 랑 같은 위치)

```js
12.11.1
```

<br/>

### package.json 설정 추가하기 <a id="a4"></a>

`"scripts": {...}` 아래에 삽입

```json
"eslintConfig": {
  "extends": [
    "react-app",
    "prettier"
  ]
},
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "**/*.{js,jsx}": [
    "eslint --fix",
    "prettier --write",
    "git add"
  ]
},
```

<br/>

### prettier 설정파일 생성하기 <a id="a5"></a>

**.prettierrc** 파일 생성 (위치 : .gitignore 랑 같은 위치)

```json
{
  "trailingComma": "all",
  "singleQuote": true
}
```

<br/>

### 라우터 설정하기 <a id="a6"></a>

1. path 에러가 날 경우 특정 컴포넌트로 이동하도록  

   `<ErrorBoundary FallbackComponent={ErrorFallbackComponent}>`를 설정한다.

2. BrowserRouter 로 Route 들을 감싸준다. (브라우저 라우팅을 위한 react-router-dom에서 지원해주는 jsx 태그)

3. 브라우저에서 요청한 경로에 Route 의 path 가 들어있으면(매치가 되면) 해당 component 를 보여준다.

4. `exact` :  주어진 경로와 정확히 맞아 떨어져야만 설정한 컴포넌트를 보여준다.

5. `<Link>` 리액트에서 사용되는 `<a>` (단, 서버와 통신을 하지않고 단순히 URL을 바꾸는 역할)

6.  `Switch` 컴포넌트에 감싸면 매칭되는 첫번째 라우트만 보여주고 나머지는 보여주지 않는다.

```jsx
// App.js

import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import ErrorBoundary from 'react-error-boundary';

const ErrorFallbackComponent = ({ error }) => <div>{error.message}</div>;

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallbackComponent}>
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/signin">로그인</Link>
        </li>
      </ul>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
```

<br/>

### pages 폴더 만들고 컴포넌트 설정하기 <a id="a7"></a>

![dev01](https://user-images.githubusercontent.com/31315644/72698830-3856ea80-3b89-11ea-9a39-84c5684e6b26.jpeg)

- 구체적으로 설정은 안하고 초기 설정만 해준다.

```jsx
// Home.jsx
import React from 'react';

const Home = props => {
  return <div>Home</div>;
};

export default Home;
```

```jsx
// NotFound.jsx
import React from 'react';

const NotFound = props => {
  return <div>NotFound</div>;
};

export default NotFound;
```

```jsx
// Signin.jsx
import React from 'react';

const Signin = props => {
  return <div>Signin</div>;
};

export default Signin;
```

<br/>