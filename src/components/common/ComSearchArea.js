import { Typography, Grid, Button, Paper } from '@mui/material';
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

const ComSearchArea = ({ onSubmit, searchItems }) => {
  const { control, handleSubmit } = useForm();

  /* 타입에 따른 컴포넌트 렌더링 */
  const renderComp = useCallback(
    (searchItem) => {
      switch (searchItem.type) {
        case undefined:
        case 'text':
          return <ComInput control={control} {...searchItem} />;
        case 'select':
          return <ComSelect control={control} {...searchItem} />;
        case 'checkbox':
          return <ComCheckbox control={control} {...searchItem} />;
        case 'date':
          return <ComDatePicker control={control} {...searchItem} />;
        case 'dateRange':
          return <ComDateRangePicker control={control} {...searchItem} />;
        case 'monthRange':
          return (
            <ComDateRangePicker
              control={control}
              type={'month'}
              {...searchItem}
            />
          );
        case 'yearRange':
          return (
            <ComDateRangePicker
              control={control}
              type={'year'}
              {...searchItem}
            />
          );
        default:
          return 'ERROR!';
      }
    },
    [control],
  );

  return (
    <Paper
      sx={{
        width: '100%',
        mb: 0.625,
        p: 1.5,
      }}
      elevation={6}
    >
      {searchItems && searchItems.length > 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex' }}
          noValidate
        >
          <Grid container spacing={1.5}>
            {Array.isArray(searchItems) &&
              searchItems.map((searchItem) => (
                <Grid key={searchItem.name} item>
                  <Typography
                    className="compLabel"
                    key={searchItem.name}
                    required={searchItem.required}
                  >
                    {searchItem.label}
                    {renderComp(searchItem)}
                  </Typography>
                </Grid>
              ))}
          </Grid>
          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{ ml: 'auto' }}
          >
            조회
          </Button>
        </form>
      )}
    </Paper>
  );
};

ComSearchArea.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchItems: PropTypes.array.isRequired,
};

export default memo(ComSearchArea);
