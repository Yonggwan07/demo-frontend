import { PropTypes } from 'prop-types';
import { memo } from 'react';

const Input = (props) => {
  return (
    <>
      <input
        {...props}
        {...props.form.register(props.name, { required: props.required })}
        title={props.label}
        type={props.type}
        autoComplete="none"
      />
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default memo(Input);
