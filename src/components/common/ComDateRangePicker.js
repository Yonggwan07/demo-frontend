import { Box, Tooltip } from '@mui/material';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { useController } from 'react-hook-form';
import { PropTypes } from 'prop-types';

const ComDateRangePicker = ({ control, type, ...props }) => {
  const {
    field: fromField,
    fieldState: { error: fromError },
  } = useController({
    name: `${props.name}_from`,
    control,
    defaultValue: props.from,
    rules: props.rules?.from,
  });
  const {
    field: toField,
    fieldState: { error: toError },
  } = useController({
    name: `${props.name}_to`,
    control,
    defaultValue: props.to,
    rules: props.rules?.to,
  });

  const [startDate, setStartDate] = useState(
    props.from !== undefined ? parseISO(props.from) : '',
  );
  const [endDate, setEndDate] = useState(
    props.to !== undefined ? parseISO(props.to) : '',
  );

  const [_type] = useState(() => {
    switch (type) {
      case 'month':
        return {
          dateFormat: 'yyyy-MM',
          showMonthYearPicker: true,
          showYearPicker: false,
        };
      case 'year':
        return {
          dateFormat: 'yyyy',
          showMonthYearPicker: false,
          showYearPicker: true,
        };
      default:
        return {
          dateFormat: 'yyyy-MM-dd',
          showMonthYearPicker: false,
          showYearPicker: false,
        };
    }
  });

  const handleStartChange = (date, e, field) => {
    e.preventDefault();
    setStartDate(date === null ? '' : date);
    field.onChange(date === null ? '' : format(date, _type.dateFormat));
  };

  const handleEndChange = (date, e, field) => {
    e.preventDefault();
    setEndDate(date === null ? '' : date);
    field.onChange(date === null ? '' : format(date, _type.dateFormat));
  };

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker
        dateFormat={_type.dateFormat}
        selectsStart
        selected={startDate}
        startDate={startDate}
        endDate={endDate}
        minDate={parseISO(props.rules?.from?.minDate)}
        maxDate={parseISO(endDate)}
        locale={ko}
        showMonthYearPicker={_type.showMonthYearPicker}
        showYearPicker={_type.showYearPicker}
        onChange={(date, e) => handleStartChange(date, e, fromField)}
        error={fromError ?  true : false}
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
            <input
              style={props.style}
              mendatory={props.rules?.from?.required}
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
        minDate={parseISO(startDate)}
        maxDate={parseISO(props.rules?.to?.maxDate)}
        locale={ko}
        showMonthYearPicker={_type.showMonthYearPicker}
        showYearPicker={_type.showYearPicker}
        onChange={(date, e) => handleEndChange(date, e, toField)}
        error={toError ?  true : false}
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
            <input style={props.style} mendatory={props.rules?.to?.required} />
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
};

export default ComDateRangePicker;
