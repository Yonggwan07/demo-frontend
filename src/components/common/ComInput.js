import React, { memo } from 'react';
import { PropTypes } from 'prop-types';
import { TextField } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useController } from 'react-hook-form';
import { constStr } from '../../utils/constStr';
import { styled } from '@mui/material/styles';

const StyledTextField = styled(TextField)({
  '& input:required + fieldset': {
    borderColor: 'orange',
  },
});

const ComInput = ({ control, defaultValue, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
    defaultValue: defaultValue ? defaultValue : '',
    rules: {
      required: props.required ? constStr.required : false,
      maxLength: props.maxLength ? constStr.maxLength(props.maxLength) : false,
      minLength: props.minLength ? constStr.minLength(props.minLength) : false,
      valueAsNumber: props.type === 'number',
    },
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
      <StyledTextField
        {...field}
        {...props}
        label=""
        sx={
          !props.multiline
            ? {
                height: '1.5rem',
                '& .MuiInputBase-root': {
                  height: '1.5rem',
                  fontSize: '0.875rem',
                },
                '& .MuiOutlinedInput-input': {
                  height: '1.5rem',
                  padding: '0 14px',
                },
              }
            : {
                height: '100%',
                '& .MuiInputBase-root': {
                  height: '100%',
                  fontSize: '0.875rem',
                },
                '& .MuiOutlinedInput-input': {
                  height: '100%',
                },
              }
        }
        error={error ? true : false}
        autoComplete="false"
      />
    </Tooltip>
  );
};

ComInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  defaultValue: PropTypes.string,
  rules: PropTypes.object,
  required: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  type: PropTypes.string,
  multiline: PropTypes.bool,
};

export default memo(ComInput);
