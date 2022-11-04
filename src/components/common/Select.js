import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

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
  const { options, name, defaultValue } = props;
  const { register, setValue: propsSetValue } = props.form;
  const watch = props.form.watch(name);
  const [value, setValue] = useState('');

  const onChange = (e) => {
    e.target.name = name;

    setValue(e.target.value);
    propsSetValue(name, e.target.value);

    if (props.onChange !== undefined) {
      props.onChange(e);
    }
  };

  useEffect(() => {
    setValue(watch ? watch : '');
  }, [watch]);

  useEffect(() => {
    if (options && options.length > 0) {
      const val = nullvalue ? '' : options[0]['comdCode'];
      setValue(val);
      propsSetValue(name, val);
    }

    if (defaultValue) {
      for (const key in options) {
        if (
          options[key].comdCode === defaultValue ||
          options[key].comdCdnm === defaultValue
        ) {
          const val = options[key].comdCode;
          setValue(val);
          propsSetValue(name, val);
          return;
        }
      }
    }
  }, [defaultValue, name, nullvalue, options, propsSetValue]);

  return (
    <>
      <select
        className={props.className}
        style={props.style}
        title={props.label}
        value={value}
        onChange={onChange}
        disabled={props.readOnly}
        required={props.required}
      >
        {nullvalue && (
          <option key={'nullvalue'} value={''}>
            {nullvalue}
          </option>
        )}
        {props.options &&
          props.options.map((option) => (
            <option key={option.id} value={option.comdCode}>
              {option.comdCdnm}
            </option>
          ))}
      </select>
      <input
        type={'hidden'}
        {...register(props.name, { required: props.required })}
      />
    </>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Select;
