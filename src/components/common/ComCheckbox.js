import { useController } from 'react-hook-form';
import { PropTypes } from 'prop-types';

const ComCheckbox = ({ control, ...props }) => {
  const {
    field,
    //fieldState: { error },
  } = useController({
    name: props.name,
    control,
    defaultValue: props.defaultChecked ? '1' : '0',
    rules: props.rules,
  });

  const handleChange = (isChecked, field) => {
    field.onChange(isChecked ? '1' : '0');
  };

  return (
    <input
      type={'checkbox'}
      {...field}
      {...props}
      checked={field.value === '1'}
      onChange={(e) => handleChange(e.target.checked, field)}
    />
  );
};

ComCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default ComCheckbox;
