import { useController } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { memo } from 'react';

const ComCheckbox = ({ control, defaultValue, ...props }) => {
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: defaultValue ? '1' : '0',
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

export default memo(ComCheckbox);
