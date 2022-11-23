import { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

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

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  useEffect(() => {
    if (props.to && props.to !== '') {
      setMax(props.to);
    }
  }, [props.to]);

  useEffect(() => {
    if (props.from && props.from !== '') {
      setMin(props.from);
    }
  }, [props.from]);

  const onChange = (e) => {
    if (e.target.name.includes('_from')) {
      setMin(e.target.value);
    }
    if (e.target.name.includes('_to')) {
      setMax(e.target.value);
    }
  };

  return (
    <div>
      <input
        {...props}
        {...props.form.register(props.name + '_from', {
          required: props.required,
        })}
        defaultValue={props.from}
        type={type}
        title={props.label + ' 시작' + word}
        onChange={onChange}
        max={max}
      />
      <span>~</span>
      <input
        {...props}
        {...props.form.register(props.name + '_to', {
          required: props.required,
        })}
        defaultValue={props.to}
        type={type}
        title={props.label + ' 종료' + word}
        onChange={onChange}
        min={min}
      />
    </div>
  );
};

DateToDate.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default DateToDate;
