import { PropTypes } from 'prop-types';
import { memo } from 'react';

const Input = ({ form: { register }, ...props }) => {
  return (
    <>
      <input
        {...props}
        {...register(props.name)}
        title={props.label}
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
