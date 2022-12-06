import { Controller } from 'react-hook-form';

const ComCheckbox = ({ control, props }) => {
  const handleChange = (isChecked, field) => {
    field.onChange(isChecked ? '1' : '0');
  };

  return (
    <Controller
      key={props.name}
      name={props.name}
      control={control}
      defaultValue={props.defaultChecked ? '1' : '0'}
      render={({ field }) => (
        <input
          type={'checkbox'}
          {...field}
          {...props}
          onChange={(e) => handleChange(e.target.checked, field)}
        />
      )}
    />
  );
};

export default ComCheckbox;
