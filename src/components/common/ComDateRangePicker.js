import { Box, Tooltip } from '@mui/material';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';

const ComDateRangePicker = ({ control, type, ...props }) => {
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
      <Controller
        key={`${props.name}_from`}
        name={`${props.name}_from`}
        control={control}
        rules={props.rules?.from}
        defaultValue={props.from}
        render={({ field, fieldState: { error } }) => (
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
            onChange={(date, e) => handleStartChange(date, e, field)}
            error={error}
            title={error?.message ? error.message : ''}
            customInput={
              <Tooltip
                open={error === undefined ? false : true}
                arrow
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={error?.message ? error.message : ''}
              >
                <input
                  style={props.style}
                  mendatory={props.rules?.from?.required}
                />
              </Tooltip>
            }
          />
        )}
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
      <Controller
        key={`${props.name}_to`}
        name={`${props.name}_to`}
        control={control}
        rules={props.rules?.to}
        defaultValue={props.to}
        render={({ field, fieldState: { error } }) => (
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
            onChange={(date, e) => handleEndChange(date, e, field)}
            error={error}
            title={error?.message ? error.message : ''}
            customInput={
              <Tooltip
                open={error === undefined ? false : true}
                arrow
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={error?.message ? error.message : ''}
              >
                <input
                  style={props.style}
                  mendatory={props.rules?.to?.required}
                />
              </Tooltip>
            }
          />
        )}
      />
    </div>
  );
};

// DateRangePicker.propTypes = {
//   label: PropTypes.string.isRequired,
//   name: PropTypes.string.isRequired,
// };

export default ComDateRangePicker;
