import Tooltip from '@mui/material/Tooltip';
import { PropTypes } from 'prop-types';
import { useController } from 'react-hook-form';

const ComSelect = ({ control, ...props }) => {
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
    props.options && (
      <Tooltip
        open={error === undefined ? false : true}
        arrow
        disableFocusListener
        disableHoverListener
        disableTouchListener
        title={error?.message ? error.message : ''}
      >
        <select
          {...field}
          {...props}
          onChange={(e) => {
            field.onChange(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          mendatory={props.rules?.required}
          error={error}
        >
          {props.nullvalue === 'all' && (
            <option key={'nullvalue'} value="">
              - 전체 -
            </option>
          )}
          {props.nullvalue === 'select' && (
            <option key={'nullvalue'} value="">
              - 선택 -
            </option>
          )}
          {props.options &&
            props.options.map((option) => (
              <option key={option.id} value={option.comdCode}>
                {option.comdCdnm}
              </option>
            ))}
        </select>
      </Tooltip>
    )
  );
};

ComSelect.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  options: PropTypes.array,
  nullvalue: PropTypes.string,
  rules: PropTypes.object,
};

export default ComSelect;
