import { Box, Grid, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
      {searchItems && searchItems.length > 0 && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', argin: '0.75rem' }}
          noValidate
        >
          <Grid container spacing={1.5}>
            {Array.isArray(searchItems) &&
              searchItems.map((searchItem) => (
                <Grid key={searchItem.name} item>
                  <label
                    className="compLabel"
                    key={searchItem.name}
                    required={searchItem.rules?.required}
                  >
                    {searchItem.label}
                    {renderComp(searchItem)}
                  </label>
                </Grid>
              ))}
          </Grid>
          <Button
            type="submit"
            size="small"
            variant="text"
            startIcon={<SearchIcon />}
            style={{ marginLeft: 'auto' }}
          >
            조회
          </Button>
        </form>
      )}
    </Box>
  );
};

ComSearchArea.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  searchItems: PropTypes.array.isRequired,
};

export default memo(ComSearchArea);
