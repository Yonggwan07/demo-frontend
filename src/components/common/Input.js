import { PropTypes } from 'prop-types';

const Input = (props) => {
  return (
    <>
      <input
        {...props.register(props.name, { required: props.required })}
        // TODO: checkbox WIP
        className={props.className}
        defaultValue={props.defaultValue}
        title={props.label}
        type={props.type}
        required={props.required}
        autoComplete="none"
        style={props.style}
      />
    </>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default Input;
