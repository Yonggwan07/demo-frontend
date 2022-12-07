import { Box, Grid } from '@mui/material';
import ko from 'date-fns/locale/ko';
import { PropTypes } from 'prop-types';
import { memo, useCallback } from 'react';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useForm } from 'react-hook-form';
import ComCheckbox from './ComCheckbox';
import ComDatePicker from './ComDatePicker';
import ComDateRangePicker from './ComDateRangePicker';
import ComInput from './ComInput';
import ComSelect from './ComSelect';

registerLocale('ko', ko);

const ComSearchArea = ({ onSubmit, props, menuId }) => {
  const { control, handleSubmit } = useForm();

  /* 타입에 따른 컴포넌트 렌더링 */
  const renderComp = useCallback(
    (_props) => {
      switch (_props.type) {
        case undefined:
        case 'text':
          return <ComInput control={control} {..._props} />;
        case 'select':
          return <ComSelect control={control} {..._props} />;
        case 'checkbox':
          return <ComCheckbox control={control} {..._props} />;
        case 'date':
          return <ComDatePicker control={control} {..._props} />;
        case 'dateRange':
          return <ComDateRangePicker control={control} {..._props} />;
        case 'monthRange':
          return (
            <ComDateRangePicker control={control} type={'month'} {..._props} />
          );
        case 'yearRange':
          return (
            <ComDateRangePicker control={control} type={'year'} {..._props} />
          );
        default:
          return 'ERROR!';
      }
    },
    [control],
  );

  return (
    <Box
      sx={{
        width: '100%',
        bgcolor: 'white',
        border: 1,
        borderColor: '#d5dde0',
        mb: 0.625,
        p: 1.5,
      }}
    >
      {props && props.length > 0 && (
        <form id={`searchArea_${menuId}`} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={1.5}>
            {Array.isArray(props) &&
              props.map((prop) => (
                <Grid key={prop.name} item>
                  <label
                    className="compLabel"
                    key={prop.name}
                    required={prop.rules?.required}
                  >
                    {prop.label}
                    {renderComp(prop)}
                  </label>
                </Grid>
              ))}
          </Grid>
        </form>
      )}
    </Box>
  );
};

ComSearchArea.propTypes = {
  props: PropTypes.array.isRequired,
};

export default memo(ComSearchArea);
