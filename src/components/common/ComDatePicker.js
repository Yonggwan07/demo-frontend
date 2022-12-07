import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { useController } from 'react-hook-form';
import Tooltip from '@mui/material/Tooltip';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';

const ComDatePicker = ({ control, ...props }) => {
  const {
    field,
    fieldState: { error },
  } = useController({
    name: props.name,
    control,
    defaultValue: props.date,
    rules: props.rules,
  });

  const [date, setDate] = useState(
    props.date !== undefined ? parseISO(props.date) : '',
  );

  const handleChange = (date, e, field) => {
    e.preventDefault();
    setDate(date === null ? '' : date);
    field.onChange(date === null ? '' : format(date, 'yyyy-MM-dd'));
  };

  return (
    <div style={{ display: 'flex' }}>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={date}
        minDate={parseISO(props.rules?.minDate)}
        maxDate={parseISO(props.rules?.maxDate)}
        locale={ko}
        onChange={(date, e) => handleChange(date, e, field)}
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
              mendatory={props.rules?.required}
              autoComplete="false"
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
