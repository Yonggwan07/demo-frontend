import styled, { css } from 'styled-components';

const StyledInput = styled.input`
  ${(props) =>
    props.mendatory &&
    css`
      background: lightyellow;
    `}
`;

const onChange = (e, pOnChange) => {
  if (e.target.type === 'checkbox') {
    e.target.value = e.target.checked ? 1 : 0;
  }
  pOnChange(e);
};

const Input = (props) => (
  <div>
    <StyledInput
      {...props}
      title={props.label}
      autoComplete="none"
      onChange={(e) => onChange(e, props.onChange)}
    />
  </div>
);

export default Input;
