import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';
import { PropTypes } from 'prop-types';

const ComInput = ({ control, ...props }) => {
  return (
    <Controller
      key={props.name}
      name={props.name}
      control={control}
      defaultValue=""
      rules={props.rules}
      render={({ field, fieldState: { error } }) => (
        <Tooltip
          open={error === undefined ? false : true}
          arrow
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={error?.message ? error.message : ''}
        >
          <input
            {...field}
            {...props}
            value={field.value ? field.value : ''}
            mendatory={props.rules?.required}
            error={error}
            autoComplete="false"
          />
        </Tooltip>
      )}
    />
  );
};

ComInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default ComInput;
