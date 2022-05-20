import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledButton = styled.button`
  border: 1px solid #5585e5;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: bold;
  padding: 0.25rem 1rem;
  color: #3264c8;
  outline: none;
  cursor: pointer;

  background: white;
  &:hover {
    background: #5585e5;
    color: white;
  }

  /*
  ${(props) =>
    props.fullWidth &&
    css`
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      width: 100%;
      font-size: 1.125rem;
    `}

  ${(props) =>
    props.cyan &&
    css`
      background: ${palette.cyan[5]};
      &:hover {
        background: ${palette.cyan[4]};
      }
    `}
    */
`;

const Button = (props) => <StyledButton {...props} />;

export default Button;
