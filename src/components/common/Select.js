import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledSelect = styled.select`
  border: 1px solid ${palette.gray[5]};
  height: 1.5rem;
  font-family: 'Malgun Gothic';

  &:hover {
    border-color: #5585e5;
    background: #f1f8ff;
  }

  ${(props) =>
    props.mendatory &&
    css`
      background: ${palette.required_background};
      &:hover {
        background: ${palette.required_background};
        border-color: #ef684a;
      }
    `}
`;
const StyledOption = styled.option``;

const setNullValue = (nullvalue) => {
  switch (nullvalue) {
    case 'all':
    case 'ALL':
    case 'a':
    case 'A':
      return '- 전체 -';

    case 'select':
    case 'SELECT':
    case 's':
    case 'S':
      return '- 선택 -';

    default:
      return null;
  }
};

const Select = (props) => {
  const nullvalue = setNullValue(props.nullvalue);

  return (
    <StyledSelect {...props} title={props.label}>
      {nullvalue && (
        <StyledOption key={'nullvalue'} value={''}>
          {nullvalue}
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
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,

  nullvalue: PropTypes.string,
};

export default Select;
