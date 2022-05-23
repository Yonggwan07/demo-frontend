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
    if (props.valueFrom && props.valueFrom !== '') {
      setMin(props.valueFrom);
    }
    if (props.valueTo && props.valueTo !== '') {
      setMax(props.valueTo);
    }
  }, [props.valueFrom, props.valueTo]);

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
        {...props.register(props.name + '_from', { required: props.required })}
        className={props.className}
        defaultValue={props.valueFrom}
        required={props.required}
        type={type}
        title={props.label + ' 시작' + word}
        style={props.style}
        onChange={(e) => onChange(e)}
        max={max}
      />
      <span>~</span>
      <input
        {...props.register(props.name + '_to', { required: props.required })}
        className={props.className}
        defaultValue={props.valueTo}
        required={props.required}
        type={type}
        title={props.label + ' 종료' + word}
        style={props.style}
        onChange={(e) => onChange(e)}
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
