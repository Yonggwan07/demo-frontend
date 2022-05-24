import { PropTypes } from 'prop-types';

const Input = ({
  register,
  name,
  required,
  className,
  defaultValue,
  label,
  type,
  style,
  readOnly
}) => {
  return (
    <>
      <input
        {...register(name, { required: required })}
        className={className}
        defaultValue={defaultValue}
        title={label}
        type={type}
        required={required}
        autoComplete="none"
        style={style}
        readOnly={readOnly}
      />
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
