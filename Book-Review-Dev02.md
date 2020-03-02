# 개발 서적 평가 서비스

## -로그인 화면 디자인-

**목차**

1. [라이브러리 인스톨하기](#a1)
2. [Ant Design 초기설정](#a2)
3. [Font 설정하기](#a3)
4. [App.js에서 `<Link>`를 Home.jsx로 이동하기](#a4)
5. [Signin 페이지 스타일링 하기](#a5)
6. [Component 폴더 및 파일 생성하기](#a6)
7. [Component 추가하기 -SigninBg-](#a7)
8. [Component 추가하기 -SigninForm-](#a8)
9. [Component 추가하기 -SigninLoginForm-](#a9)
10. [Component 추가하기 -SigninSupportUl-](#a10)
11. [설정한 스타일 컴포넌트를 Signin에서 불러오기](#a11)

---------

### 라이브러리 인스톨하기  <a id="a1"></a>

- Styled-components

- Ant Design

- npm ci 

  - [CI(Continous Integration) 환경을 위한 npm ci command 모듈 설명](https://medium.com/@trustyoo86/ci-환경을-위한-npm-ci-npm-ci-for-continous-integration-850fc48dd4cc)  

  - [공식 npm ci](https://docs.npmjs.com/cli/ci.html)

```bash
nvm use (옵션 : 설정된 노드 버전을 이용.)
npm i ci
npm i styled-components antd
```

<br/>

### Ant Design 초기설정  <a id="a2"></a>

- Ant Design 라이브러리에서 css 전역 설정해주기 

**index.js**

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css'; // 추가
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();
```

<br/>

### Font 설정하기  <a id="a3"></a>

- `Roboto`폰트 적용하기 ▶︎ [구글 폰트 - Roboto](https://fonts.google.com/specimen/Roboto)
- 설정 해주기 ( index.html / index.css )

**index.html**

```jsx
<!DOCTYPE html>
<html lang="en">
  <head>
    ...
    <link
      href="https://fonts.googleapis.com/css?family=Roboto&display=swap"
      rel="stylesheet"
    />
    ...
  </head>
  <body>...</body>
</html>
```

<br/>

**index.css**

```css
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

<br/>

### App.js에서 `<Link>`를 Home.jsx로 이동하기  <a id="a4"></a>

`App.js`에서 아래 부분을 제거(혹은 잘라내기) 한다.

```jsx
// App.js 아래 부분 잘라내기.
<ul>
  <li>
    <Link to="/">홈</Link>
  </li>
  <li>
    <Link to="/signin">로그인</Link>
  </li>
 </ul>
```

<br/>

`src/pages/Home.jsx` 에서 잘라낸 부분을 붙여넣는다.

```jsx
// src/pages/Home.jsx 
import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => {
  return (
    <ul>
      <li>
        <Link to="/">홈</Link>
      </li>
      <li>
        <Link to="/signin">로그인</Link>
      </li>
    </ul>
  );
};

export default Home;
```

<br/>

### Signin 페이지 스타일링 하기   <a id="a5"></a>

<img src="https://user-images.githubusercontent.com/31315644/72699569-4c501b80-3b8c-11ea-93f6-41c02decb175.jpeg" alt="LoginPage" style="zoom:50%;" />

`Signin.jsx` 부분을 스타일링 한다.

- antd 가 지원해주는 그리드 레이아웃을 이용한다. ( Row, Col )
- 스타일 컴포넌트를 이용해 디자인한다.

```jsx
import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';

const StyledRow = styled(Row).attrs(() => ({
  type: 'flex',
  align: 'middle',
}))`
  height: 100vh;
`;

const StyledCol = styled(Col).attrs(() => ({
  span: 24,
}))``;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #642828;
  text-transform: uppercase;
`;

const StyledSubTitle = styled.div`
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledUnderline = styled.div`
  width: 200px;
  height: 8px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  background: linear-gradient(to right, #803b32, #ddb49b);
`;

const StyledContents = styled(Row).attrs(() => ({
  type: 'flex',
}))`
  margin-top: 50px;
  background-color: #f3f7f8;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
`;

const Signin = () => (
  <StyledRow>
    <StyledCol>
      <StyledTitle>Review Service For Books</StyledTitle>
      <StyledSubTitle>
        Please Share Your Opinion on Web Development Books.
      </StyledSubTitle>
      <StyledUnderline />
      <StyledContents>
      </StyledContents>
    </StyledCol>
  </StyledRow>
);

export default Signin;
```

<br/>

### Component 폴더 및 파일 생성하기   <a id="a6"></a>

![components](https://user-images.githubusercontent.com/31315644/72699904-8d94fb00-3b8d-11ea-8f0e-505a15c3869c.jpeg)

1. `src` 하위에 `components`라는 파일을 추가한다.
2. `components`폴더 안에 `Signin`이라는 폴더를 생성한다.
3. `Signin` 폴더 안에 `SigninBg.jsx`파일을 생성한다. (메인 - 왼쪽)
4. `Signin` 폴더 안에  `SigninForm`이라는 폴더를 생성한다.
5. `SigninForm`폴더 안에 `SigninForm.jsx`파일을 생성한다. (메인 - 오른쪽)
6. `SigninForm`폴더 안에 `SigninLoginForm.jsx`파일을 생성한다.
7. `SigninForm`폴더 안에 `SigninSupportUl.jsx`파일을 생성한다.

<br/>

### Component 추가하기 -SigninBg-   <a id="a7"></a>

- 위 `LoginPage`이미지 중 왼쪽에 해당되는 그림을 추가한다.
- `public` 폴더에 이미지를 추가해준다. (나는 book.jpg 라는 이미지를 추가함.)
- 스타일 컴포넌트를 이용하여 스타일링 하고 반환한다.

`src/components/Signin/SigninBg.jsx`

```jsx
import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';

const StyledCol = styled(Col).attrs(() => ({
  span: 12,
}))``;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
`;

const SigninBg = () => (
  <StyledCol>
    <StyledImg src="/book.jpg" alt="Signin" />
  </StyledCol>
);

export default SigninBg;
```

<br/>

### Component 추가하기 -SigninForm-   <a id="a8"></a>

- 스타일 컴포넌트를 이용하여 스타일링 하고 반환한다.
- 크게 두 단락으로 나뉘어서 진행한다.
  1. Form 태그로 묶은 단락( 로그인, 패스워드 입력창과 버튼 )
  2. Ul로 태그로 묶은 단락( 설명문구, 버튼 )

`src/components/Signin/SigninForm/SigninForm.jsx`

```jsx
// SigninForm.jsx
import React from 'react';
import { Col } from 'antd';
import styled from 'styled-components';
import SigninLoginForm from './SigninLoginForm';
import SigninSupportUl from './SigninSupportUl';

const StyledCol = styled(Col).attrs(() => ({
  span: 12,
}))`
  padding: 30px;
  font-weight: 600;
  vertical-align: top;
`;

const StyledLoginTitle = styled.h2`
  text-align: center;
  padding: 50px 0 30px 0px;
  margin: 0;
  font-weight: inherit;
`;

const SigninForm = () => (
  <StyledCol>
    <StyledLoginTitle>LOG IN. START SEARCHING.</StyledLoginTitle>
    <SigninLoginForm></SigninLoginForm>
    <SigninSupportUl></SigninSupportUl>
  </StyledCol>
);

export default SigninForm;
```

<br/>

### Component 추가하기 -SigninLoginForm-   <a id="a9"></a>

- Form 태그로 묶은 단락( 로그인, 패스워드 입력창과 버튼 )을 구현하고 스타일링 하여 반환한다.
- 스타일 컴포넌트로 스타일링 하는 방법은 여러가지 있지만 여기서는 styled(컴포넌트)를 이용한다.

```jsx
import React from 'react';
import styled from 'styled-components';

const SigninLoginForm = ({ className }) => {
  return (
    <form className={className}>
      <fieldset>
        <div>
          <label>Email</label>
          <input autoFocus type="email" placeholder="Enter your E-mail" />
        </div>
        <div>
          <label>Password</label>
          <input type="password" placeholder="Enter your Password" />
        </div>
        <button>SIGN IN</button>
      </fieldset>
    </form>
  );
};

const StyledLoginForm = styled(SigninLoginForm)`
  padding: 50px 0 25px 0;
  label,
  input,
  button {
    font-weight: inherit;
  }
  label::after {
    content: '*';
    color: red;
  }
  input {
    margin: 10px 0 20px;
    display: block;
    width: 100%;
    height: 30px;
    background-color: rgb(227, 238, 253);
    border: rgba(117, 117, 117, 0.2) solid 1px;
  }

  input::placeholder {
    font-style: italic;
    color: rgba(19, 19, 19, 0.3);
    font-weight: 600;
    padding-left: 10px;
  }

  input:focus {
    background-color: #fff;
    outline: none !important;
    border-color: #719ece;
    box-shadow: 0 0 10px #719ece;
  }

  button {
    background-color: rgb(30, 74, 94);
    border: none;
    color: rgb(241, 246, 247);
    font-size: 16px;
    padding: 6px 30px;
  }

  button:hover {
    color: rgb(30, 74, 94);
    background-color: rgb(241, 246, 247);
    box-shadow: 1px 1px rgb(30, 74, 94), -1px -1px rgb(30, 74, 94),
      1px -1px rgb(30, 74, 94), -1px 1px rgb(30, 74, 94);
  }
`;

export default StyledLoginForm;
```

<br/>

### Component 추가하기 -SigninSupportUl-   <a id="a10"></a>

- Ul로 태그로 묶은 단락( 설명문구, 버튼 )을 구현하고 스타일링 하여 반환한다.
- 스타일 컴포넌트로 스타일링 하는 방법은 여러가지 있지만 여기서는 styled(컴포넌트)를 이용한다.

```jsx
import React from 'react';
import styled from 'styled-components';

const SigninSupportUl = ({ className }) => {
  return (
    <ul className={className}>
      <li>
        <span>Need to create an account?</span>
        <button>SIGN UP</button>
      </li>
      <li>
        <span>Forgot your password</span>
        <button>RECOVERY</button>
      </li>
    </ul>
  );
};

const StyledSupportUl = styled(SigninSupportUl)`
  list-style: none;
  padding: 25px 0 0;
  margin: 0;
  border-top: rgba(233, 233, 233) solid 1px;
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  li:nth-child(2) {
    margin-top: 25px;
  }
  span {
    margin: 0;
    margin-bottom: 0;
    font-size: 15px;
  }
  button {
    background-color: inherit;
    padding: 5px 20px;
    border: rgb(29, 74, 93) 2px solid;
    color: rgb(71, 107, 123);
    font-weight: 600;
  }

  button:hover {
    color: rgb(241, 246, 247);
    background-color: rgb(29, 74, 93);
  }
`;

export default StyledSupportUl;
```

<br/>

### 설정한 스타일 컴포넌트를 Signin에서 불러오기   <a id="a11"></a>

- `SigninBg`
- `SigninForm`
- 두 컴포넌트를 불러와서 `Signin`에 삽입한다.

```jsx
import React from 'react';
import styled from 'styled-components';
import { Row, Col } from 'antd';
import SigninBg from '../components/Signin/SigninBg';
import SigninForm from '../components/Signin/SigninForm/SigninForm';

const StyledRow = styled(Row).attrs(() => ({
  type: 'flex',
  align: 'middle',
}))`
  height: 100vh;
`;

const StyledCol = styled(Col).attrs(() => ({
  span: 24,
}))``;

const StyledTitle = styled.div`
  text-align: center;
  font-size: 40px;
  font-weight: bold;
  color: #642828;
  text-transform: uppercase;
`;

const StyledSubTitle = styled.div`
  text-align: center;
  font-size: 27px;
  font-weight: bold;
  text-transform: uppercase;
`;

const StyledUnderline = styled.div`
  width: 200px;
  height: 8px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 20px;
  background: linear-gradient(to right, #803b32, #ddb49b);
`;

const StyledContents = styled(Row).attrs(() => ({
  type: 'flex',
}))`
  margin-top: 50px;
  background-color: #f3f7f8;
  margin-left: auto;
  margin-right: auto;
  width: 800px;
`;

const Signin = () => (
  <StyledRow>
    <StyledCol>
      <StyledTitle>
        Review Service For Books
      </StyledTitle>
      <StyledSubTitle>
        Please Share Your Opinion on Web Development Books.
      </StyledSubTitle>
      <StyledUnderline />
      <StyledContents>
        <SigninBg />
        <SigninForm />
      </StyledContents>
    </StyledCol>
  </StyledRow>
);

export default Signin;
```

<br/>