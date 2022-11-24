import { PropTypes } from 'prop-types';
import { memo, useCallback, useEffect, useState } from 'react';

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

const Select = ({form, ...props}) => {
  const nullvalue = setNullValue(props.nullvalue);
  const { options, name, defaultValue } = props;
  const { register, setValue: propsSetValue } = form;
  const watch = form.watch(name);
  const [value, setValue] = useState('');

  const onChange = useCallback(
    (e) => {
      e.target.name = name;

      setValue(e.target.value);
      propsSetValue(name, e.target.value);

      if (props.onChange !== undefined) {
        props.onChange(e);
      }
    },
    [name, props, propsSetValue],
  );

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
        {...props}
        title={props.label}
        value={value}
        onChange={onChange}
        disabled={props.readOnly}
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
        {...register(props.name)}
      />
    </>
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(Select);
