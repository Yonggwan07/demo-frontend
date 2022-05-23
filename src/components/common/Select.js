import { PropTypes } from 'prop-types';

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

  return (
    <select
      {...props.register(props.name, { required: props.required })}
      className={props.className}
      style={props.style}
      title={props.label}
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
  );
};

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default Select;
