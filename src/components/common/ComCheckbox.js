import React, { memo } from 'react';
import { PropTypes } from 'prop-types';
import { useController } from 'react-hook-form';

const ComCheckbox = ({ control, defaultValue, ...props }) => {
  const { field } = useController({
    name: props.name,
    control,
    defaultValue: defaultValue ? true : false,
  });

  const handleChange = (isChecked, field) => {
    field.onChange(isChecked ? true : false);
  };

  return (
    <input
      type={'checkbox'}
      {...field}
      {...props}
      checked={field.value}
      onChange={(e) => handleChange(e.target.checked, field)}
    />
  );
};

ComCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.bool,
};

export default memo(ComCheckbox);
