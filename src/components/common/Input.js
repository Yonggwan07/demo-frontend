import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledInput = styled.input`
  border: 1px solid ${palette.gray[5]};
  height: 1.25rem;
  font-family: 'Malgun Gothic';

  &:hover {
    border-color: #5585e5;
    background: #f1f8ff;
  }

  ${(props) =>
    props.required &&
    css`
      background: ${palette.required_background};
      &:hover: {
        border-color: #ef684a;
        &:hover {
          background: ${palette.required_background};
          border-color: #ef684a;
        }
      }
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

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Input;
