import React, { memo, useCallback } from 'react';
import { Grid, Button, Paper } from '@mui/material';
import ko from 'date-fns/locale/ko';
import { PropTypes } from 'prop-types';
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
        case 'month':
        case 'year':
          return <ComDatePicker control={control} {...searchItem} />;
        case 'dateRange':
        case 'monthRange':
        case 'yearRange':
          return <ComDateRangePicker control={control} {...searchItem} />;
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
                  <div className="compLabel" key={searchItem.name}>
                    {searchItem.label}
                    {renderComp(searchItem)}
                  </div>
                </Grid>
              ))}
          </Grid>
          <Button
            type="submit"
            size="small"
            variant="contained"
            sx={{ ml: 'auto', lineHeight: 0 }}
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
