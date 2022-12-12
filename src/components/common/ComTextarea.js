import Tooltip from '@mui/material/Tooltip';
import { PropTypes } from 'prop-types';
import { useController } from 'react-hook-form';

const ComTextarea = ({ control, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
    defaultValue: props.initialvalue ? props.initialvalue : '',
    rules: props.rules,
  });

  return (
    <Tooltip
      open={error === undefined ? false : true}
      arrow
      disableFocusListener
      disableHoverListener
      disableTouchListener
      title={error?.message ? error.message : ''}
    >
      <textarea
        {...field}
        {...props}
        value={field.value ? field.value : ''}
        mendatory={props.rules?.required}
        error={error}
      />
    </Tooltip>
  );
};

ComTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default ComTextarea;
