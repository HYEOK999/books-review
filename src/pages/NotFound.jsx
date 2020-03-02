import React from 'react';
import styled from 'styled-components';

const StyledBackgroundWrapper = styled.div`
  background-image: url('/404NotFound.jpg');
  width: 100vw;
  height: 100vh;

  button {
    position: absolute;
    transform: rotateZ(-32deg);
    font-size: 25px;
    border: none;
    background: none;
    font-weight: bold;

    &:hover {
      color: #1890ff;
    }
  }

  .back {
    top: 500px;
    left: 413px;
  }

  .home {
    top: 402px;
    left: 586px;
  }
`;

const StyledHeader = styled.div`
  position: absolute;
  top: 235px;
  left: 259px;
  font-size: 50px;
  transform: rotateZ(-32deg);
`;

const StyledMain = styled.div`
  position: absolute;
  top: 313px;
  left: 274px;
  font-size: 21px;
  transform: rotateZ(-32deg);
`;

const NotFound = ({ history }) => {
  const goBack = () => {
    history.goBack();
  };

  const goHome = () => {
    history.push('/');
  };

  return (
    <StyledBackgroundWrapper>
      <StyledHeader>
        <h1>404 Not Found</h1>
      </StyledHeader>
      <StyledMain>
        <p>The page you are looking for is not found</p>
      </StyledMain>
      <button className="back" onClick={goBack}>
        뒤로가기
      </button>
      <button className="home" onClick={goHome}>
        홈으로
      </button>
    </StyledBackgroundWrapper>
  );
};

export default NotFound;
