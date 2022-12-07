import Tooltip from '@mui/material/Tooltip';
import { Controller } from 'react-hook-form';
import { PropTypes } from 'prop-types';

const ComSelect = ({ control, ...props }) => {
  return (
    <Controller
      key={props.name}
      name={props.name}
      control={control}
      rules={props.rules}
      defaultValue={!props.defaultValue ? '' : props.defaultValue}
      render={({ field, fieldState: { error } }) =>
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
              mendatory={props.rules?.required}
              error={error}
            >
              {props.nullvalue === 'all' && (
                <option key={'nullvalue'} value={''}>
                  - 전체 -
                </option>
              )}
              {props.nullvalue === 'select' && (
                <option key={'nullvalue'} value={''}>
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
      }
    />
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
