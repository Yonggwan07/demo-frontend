import React, { memo } from 'react';
import { PropTypes } from 'prop-types';
import { useController } from 'react-hook-form';

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
  defaultValue: PropTypes.string,
};

export default memo(ComCheckbox);
