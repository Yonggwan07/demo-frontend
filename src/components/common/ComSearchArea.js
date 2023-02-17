import React, { memo, useCallback, Fragment } from 'react';
import { Button, Paper } from '@mui/material';
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

  const build = (searchItems) => {
    console.log('Start Build');
    let rows = [];
    let dom = [];

    if (!Array.isArray(searchItems[0])) {
      searchItems.map((searchItem) => {
        dom.push(
          <Fragment key={searchItem.label}>
            <td className="searchAreaTdLabel">{searchItem.label}</td>
            <td className="searchAreaTdComp">{renderComp(searchItem)}</td>
          </Fragment>,
        );
      });
      rows.push(
        <Fragment key={0}>
          <tr>{dom}</tr>
        </Fragment>,
      );
    } else {
      searchItems.map((row, i) => {
        row.map((item) => {
          dom.push(
            <Fragment key={item.label}>
              <td className="searchAreaTdLabel">{item.label}</td>
              <td className="searchAreaTdComp">{renderComp(item)}</td>
            </Fragment>,
          );
        });
        rows.push(
          <Fragment key={i}>
            <tr>{dom}</tr>
          </Fragment>,
        );
        dom = [];
      });
    }

    return rows;
  };

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
          <table style={{ tableLayout: 'fixed' }}>
            <tbody>{build(searchItems)}</tbody>
          </table>
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
  searchItems: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          label: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
          type: PropTypes.oneOf([
            'text',
            'select',
            'checkbox',
            'date',
            'month',
            'year',
            'dateRange',
            'monthRange',
            'yearRange',
            undefined,
          ]),
        }),
      ),
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.oneOf([
          'text',
          'select',
          'checkbox',
          'date',
          'month',
          'year',
          'dateRange',
          'monthRange',
          'yearRange',
          undefined,
        ]),
      }),
    ]),
  ).isRequired,
};

export default memo(ComSearchArea);
