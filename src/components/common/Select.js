import styled, { css } from 'styled-components';

const StyledSelect = styled.select`
  ${(props) =>
    props.mendatory &&
    css`
      background: lightyellow;
    `}
`;
const StyledOption = styled.option``;

const Select = (props) => (
  <StyledSelect {...props} title={props.label}>
    {props.nullvalue && (
      <StyledOption key={'nullvalue'} value={''}>
        {props.nullvalue}
      </StyledOption>
    )}
    {props.options &&
      props.options.map((option) => (
        <StyledOption key={option.id} value={option.comdCode}>
          {option.comdCdnm}
        </StyledOption>
      ))}
  </StyledSelect>
);

export default Select;
