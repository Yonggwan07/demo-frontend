import { useEffect } from 'react';
import { PropTypes } from 'prop-types';
import styled, { css } from 'styled-components';
import palette from '../../lib/styles/palette';

const StyledInput = styled.input`
  border: 1px solid ${palette.gray[5]};
  font-family: 'Malgun Gothic';

  &:hover {
    border-color: #5585e5;
    background: #f1f8ff;
  }

  ${(props) =>
    props.type === 'date' &&
    css`
      height: 1.375rem;
    `}

  ${(props) =>
    props.type === 'number' &&
    css`
      height: 1.25rem;
    `}

  ${(props) =>
    props.required &&
    css`
      background: ${palette.required_background};
      &:hover {
        background: ${palette.required_background};
        border-color: #ef684a;
      }
    `}
`;

const _onChange = (e, { name, onChange }) => {
  const from = document.getElementsByClassName(name + '_from')[0];
  const to = document.getElementsByClassName(name + '_to')[0];

  if (e.target.name === from.name) {
    to.setAttribute('min', e.target.value);
  }

  if (e.target.name === to.name) {
    from.setAttribute('max', e.target.value);
  }

  onChange(e);
};

const setType = ({ type }) => {
  switch (type) {
    case 'dateToDate':
      return ['date', '일'];
    case 'monthToMonth':
      return ['month', '월'];
    case 'yearToYear':
      return ['number', '년'];
    default:
      return ['', ''];
  }
};

const DateToDate = (props) => {
  const [type, word] = setType(props);

  useEffect(() => {
    const from = document.getElementsByClassName(props.name + '_from')[0];
    const to = document.getElementsByClassName(props.name + '_to')[0];

    if (props.value_from) {
      to.setAttribute('min', props.value_from);
    }
    if (props.value_to) {
      from.setAttribute('max', props.value_to);
    }
  }, [props.name, props.value_from, props.value_to]);

  return (
    <div>
      <StyledInput
        {...props}
        className={props.name + '_from'}
        title={props.label + ' 시작' + word}
        name={props.name + '_from'}
        type={type}
        value={props.value_from}
        onChange={(e) => _onChange(e, props)}
      />{' '}
      ~{' '}
      <StyledInput
        {...props}
        className={props.name + '_to'}
        title={props.label + ' 종료' + word}
        name={props.name + '_to'}
        type={type}
        value={props.value_to}
        onChange={(e) => _onChange(e, props)}
      />
    </div>
  );
};

DateToDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default DateToDate;
