import { MenuItem, Select, styled } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { PropTypes } from 'prop-types';
import { memo } from 'react';
import { useController } from 'react-hook-form';
import { constStr } from '../../utils/constStr';

const StyledSelect = styled(Select)({
  height: '1.5rem',
  '& .MuiSelect-select': {
    height: '1.5rem',
    fontSize: '0.875rem',
  },
  '& .MuiOutlinedInput-input': {
    height: '1.5rem',
    padding: '0 14px',
  },
  '&[required] > fieldset': {
    borderColor: 'orange',
  },
});

const ComSelect = ({ control, defaultValue, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
    defaultValue: defaultValue ? defaultValue : '',
    rules: {
      required: props.required ? constStr.required : false,
    },
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
        <StyledSelect
          {...field}
          {...props}
          label=""
          onChange={(e) => {
            field.onChange(e);
            if (props.onChange) {
              props.onChange(e);
            }
          }}
          error={error ? true : false}
          MenuProps={{
            sx: {
              maxHeight: '15rem',
            },
          }}
        >
          {props.nullvalue === 'all' && (
            <MenuItem key={'nullvalue'} value="">
              - 전체 -
            </MenuItem>
          )}
          {props.nullvalue === 'select' && (
            <MenuItem key={'nullvalue'} value="">
              - 선택 -
            </MenuItem>
          )}
          {props.options &&
            props.options.map((option) => (
              <MenuItem key={option.id} value={option.comdCode}>
                {option.comdCdnm}
              </MenuItem>
            ))}
        </StyledSelect>
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

export default memo(ComSelect);
