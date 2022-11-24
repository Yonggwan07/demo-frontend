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

const DateToDate = ({form, to, from, label, ...props}) => {
  const [type, word] = setType(props);

  const [min, setMin] = useState('');
  const [max, setMax] = useState('');

  useEffect(() => {
    if (to && to !== '') {
      setMax(to);
    }
  }, [to]);

  useEffect(() => {
    if (from && from !== '') {
      setMin(from);
    }
  }, [from]);

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
        {...form.register(props.name + '_from')}
        defaultValue={from}
        type={type}
        title={props.label + ' 시작' + word}
        onChange={onChange}
        max={max}
      />
      <span>~</span>
      <input
        {...props}
        {...form.register(props.name + '_to')}
        defaultValue={to}
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
