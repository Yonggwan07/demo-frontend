import { useMemo, useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useController } from 'react-hook-form';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';
import { Tooltip, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { constStr } from '../../utils/constStr';

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

const ComDatePicker = ({ control, type, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
    defaultValue: props.date,
    rules:  { required: props.required ? constStr.required : false },
  });

  const [date, setDate] = useState(
    props.date !== undefined ? parseISO(props.date) : '',
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

  const handleChange = (date, e, field) => {
    e.preventDefault();
    setDate(date === null ? '' : date);
    field.onChange(date === null ? '' : format(date, 'yyyy-MM-dd'));
  };

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker
        dateFormat={_type.dateFormat}
        selected={date}
        minDate={parseISO(props.minDate)}
        maxDate={parseISO(props.maxDate)}
        locale={ko}
        showMonthYearPicker={_type.showMonthYearPicker}
        showYearPicker={_type.showYearPicker}
        onChange={(date, e) => handleChange(date, e, field)}
        error={error ? true : false}
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
            <StyledTextField
              sx={_type.defaultWidth}
              style={props.style}
              error={error ? true : false}
              required={props.required}
            />
          </Tooltip>
        }
      />
    </div>
  );
};

ComDatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  rules: PropTypes.object,
};

export default ComDatePicker;
