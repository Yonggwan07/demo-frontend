import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';

const ComInput = ({ control, props }) => {
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
            mendatory={props.rules?.required}
            error={error}
            autoComplete="false"
          />
        </Tooltip>
      )}
    />
  );
};

export default ComInput;