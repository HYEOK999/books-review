import React from 'react';
import styled from 'styled-components';
import { Input } from 'antd';

const StyledInput = styled(Input)`
  margin: 15px 0;
`;

const InputBookInfo = ({ info, reference, value }) => {
  return (
    <>
      <label>{info}</label>
      <StyledInput
        type="text"
        placeholder={`Add the book ${info}`}
        ref={reference}
        defaultValue={value ? value : null}
      />
    </>
  );
};

export default InputBookInfo;
