import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const Checkbox = (props) => {
  const { defaultValue, name, setValue: propsSetValue, watch } = props;
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    setChecked(e.target.checked);
    propsSetValue(props.name, e.target.checked ? '1' : '0');
  };

  useEffect(() => {
    setChecked(watch === '1' ? true : false);
  }, [watch]);

  useEffect(() => {
    if (defaultValue === true || defaultValue === '1') {
      setChecked(true);
      propsSetValue(name, '1');
    }
  }, [defaultValue, name, propsSetValue]);

  return (
    <>
      <input
        type="checkbox"
        className={props.className}
        onChange={onChange}
        title={props.label}
        style={props.style}
        checked={checked}
        disabled={props.readOnly}
      />
      <input {...props.register(props.name)} type={'hidden'} />
    </>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Checkbox;
