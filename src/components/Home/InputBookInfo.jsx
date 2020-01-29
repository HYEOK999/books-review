import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const StyledInput = styled(Input)`
  margin: 15px 0;
`;

const InputBookInfo = ({ info, reference }) => {
  return (
    <>
      <label>{info}</label>
      <StyledInput
        type="text"
        placeholder={`Add the book ${info}`}
        ref={reference}
      />
    </>
  );
};

export default InputBookInfo;
