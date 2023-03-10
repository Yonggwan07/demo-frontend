import React, { useCallback, useMemo, useState } from 'react';
import { Box, Tooltip, TextField } from '@mui/material';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import { useController } from 'react-hook-form';
import { PropTypes } from 'prop-types';
import { styled } from '@mui/material/styles';
import { constStr } from '../../utils/constStr';
import { propTypesDateValidation } from '../../utils/dateUtil';

const StyledTextField = styled(TextField)({
  height: '1.5rem',
  '& .MuiInputBase-root': {
    height: '1.5rem',
    fontSize: '0.875rem',
  },
  '& .MuiOutlinedInput-input': {
    height: '1.5rem',
    padding: '0 14px',
  },
  '& input:required + fieldset': {
    borderColor: 'orange',
  },
});

const ComDateRangePicker = ({ control, type, ...props }) => {
  const {
    field: fromField,
    fieldState: { error: fromError },
  } = useController({
    name: `${props.name}_from`,
    control,
    defaultValue: props.from,
    rules: { required: props.required?.from ? constStr.required : false },
  });
  const {
    field: toField,
    fieldState: { error: toError },
  } = useController({
    name: `${props.name}_to`,
    control,
    defaultValue: props.to,
    rules: { required: props.required?.to ? constStr.required : false },
  });

  const [startDate, setStartDate] = useState(
    props.from !== undefined ? parseISO(props.from) : '',
  );
  const [endDate, setEndDate] = useState(
    props.to !== undefined ? parseISO(props.to) : '',
  );

  const _type = useMemo(() => {
    switch (type) {
      case 'monthRange':
        return {
          dateFormat: 'yyyy-MM',
          showMonthYearPicker: true,
          showYearPicker: false,
          defaultWidth: { width: '5rem' },
        };
      case 'yearRange':
        return {
          dateFormat: 'yyyy',
          showMonthYearPicker: false,
          showYearPicker: true,
          defaultWidth: { width: '3.8rem' },
        };
      default:
        return {
          dateFormat: 'yyyy-MM-dd',
          showMonthYearPicker: false,
          showYearPicker: false,
          defaultWidth: { width: '6.3rem' },
        };
    }
  }, [type]);

  const handleStartChange = useCallback(
    (date, e) => {
      e.preventDefault();
      setStartDate(date === null ? '' : date);
      fromField.onChange(date === null ? '' : format(date, _type.dateFormat));
    },
    [_type.dateFormat, fromField],
  );

  const handleEndChange = useCallback(
    (date, e) => {
      e.preventDefault();
      setEndDate(date === null ? '' : date);
      toField.onChange(date === null ? '' : format(date, _type.dateFormat));
    },
    [_type.dateFormat, toField],
  );

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker
        dateFormat={_type.dateFormat}
        selectsStart
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={parseISO(props.minDate)}
        maxDate={endDate}
        locale={ko}
        showMonthYearPicker={_type.showMonthYearPicker}
        showYearPicker={_type.showYearPicker}
        onChange={handleStartChange}
        title={fromError?.message ? fromError.message : ''}
        customInput={
          <Tooltip
            open={fromError === undefined ? false : true}
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={fromError?.message ? fromError.message : ''}
          >
            <StyledTextField
              sx={_type.defaultWidth}
              style={props.style}
              error={fromError ? true : false}
              required={props.required?.from}
            />
          </Tooltip>
        }
      />
      <Box
        sx={{
          px: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        ~
      </Box>
      <DatePicker
        dateFormat={_type.dateFormat}
        selectsEnd
        selected={endDate}
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        maxDate={parseISO(props.maxDate)}
        locale={ko}
        showMonthYearPicker={_type.showMonthYearPicker}
        showYearPicker={_type.showYearPicker}
        onChange={handleEndChange}
        title={toError?.message ? toError.message : ''}
        customInput={
          <Tooltip
            open={toError === undefined ? false : true}
            arrow
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title={toError?.message ? toError.message : ''}
          >
            <StyledTextField
              sx={_type.defaultWidth}
              style={props.style}
              error={toError ? true : false}
              required={props.required?.to}
            />
          </Tooltip>
        }
      />
    </div>
  );
};

ComDateRangePicker.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
  type: PropTypes.oneOf(['yearRange', 'monthRange', 'dateRange', undefined]),
  from: function (props, propName, componentName) {
    propTypesDateValidation(props, propName, componentName);
  },
  to: function (props, propName, componentName) {
    propTypesDateValidation(props, propName, componentName);
  },
  minDate: function (props, propName, componentName) {
    propTypesDateValidation(props, propName, componentName);
  },
  maxDate: function (props, propName, componentName) {
    propTypesDateValidation(props, propName, componentName);
  },
  required: PropTypes.shape({ from: PropTypes.bool, to: PropTypes.bool }),
  style: PropTypes.object,
};

export default ComDateRangePicker;
