import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

const Checkbox = (props) => {
  const { defaultValue, name } = props;
  const { register, setValue: propsSetValue } = props.form;
  const watch = props.form.watch(name);
  const [checked, setChecked] = useState(false);

  const onChange = (e) => {
    e.target.name = props.name;
    e.target.value = e.target.checked ? '1' : '0';

    setChecked(e.target.checked);
    propsSetValue(e.target.name, e.target.value);

    if (props.onChange !== undefined) {
      props.onChange(e);
    }
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
      <input {...register(name)} type={'hidden'} />
    </>
  );
};

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Checkbox;
