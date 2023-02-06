import React, { useCallback, useEffect, useState } from 'react';
import { InputBase, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGridApiContext } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import DatePicker from 'react-datepicker';
import { PropTypes } from 'prop-types';

const StyledInput = styled(InputBase)({
  '& .MuiInputBase-input': {
    fontSize: '0.875rem',
  },
});

const StyledMemuItem = styled(MenuItem)({
  fontSize: '0.875rem',
  justifyContent: 'center',
  padding: '3px 8px',
});

const useDatagrid = (_columnInfo = [], _commCodes = []) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [columnInfo, setColumnInfo] = useState([]);
  const [commCodes, setCommcodes] = useState([]);

  useEffect(() => {
    setColumnInfo(_columnInfo);
    setCommcodes(_commCodes);
  }, [_columnInfo, _commCodes]);

  // Select
  const SelectCell = (props) => {
    const { value, options } = props;
    const searched = options.find(
      (option) => option.commonDetailCode === value,
    );
    return (
      <div>{searched !== undefined ? searched.commonDetailCodeName : ''}</div>
    );
  };
  SelectCell.propTypes = {
    value: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.object),
  };

  const SelectEditCell = (props) => {
    const { id, value, field, options } = props;
    const apiRef = useGridApiContext();

    const handleChange = useCallback(
      async (event) => {
        await apiRef.current.setEditCellValue({
          id,
          field,
          value: event.target.value,
        });
        apiRef.current.stopCellEditMode({ id, field });
      },
      [apiRef, field, id],
    );

    return (
      <Select
        label=""
        displayEmpty
        MenuProps={{
          sx: {
            maxHeight: '15rem',
          },
        }}
        sx={{ width: '100%' }}
        value={value}
        onChange={handleChange}
        size="small"
        autoFocus
      >
        {options &&
          options.map((option) => (
            <StyledMemuItem
              key={option.commonDetailCode}
              value={option.commonDetailCode}
            >
              {option.commonDetailCodeName}
            </StyledMemuItem>
          ))}
      </Select>
    );
  };
  SelectEditCell.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    field: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.object),
  };

  // DatePicker
  const DatePickerEditCell = (props) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const minDate =
      props.minDate && apiRef.current.getCellValue(id, props.minDate);
    const maxDate =
      props.maxDate && apiRef.current.getCellValue(id, props.maxDate);

    const handleChange = useCallback(
      async (date) => {
        await apiRef.current.setEditCellValue({
          id,
          field,
          value: format(date, 'yyyyMMdd'),
        });
        apiRef.current.stopCellEditMode({ id, field });
      },
      [apiRef, field, id],
    );

    return (
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={dateFormatter(value)}
        minDate={
          minDate &&
          parseISO(
            minDate.substr(0, 4) +
              '-' +
              minDate.substr(4, 2) +
              '-' +
              minDate.substr(6, 2),
          )
        }
        maxDate={
          maxDate &&
          parseISO(
            maxDate.substr(0, 4) +
              '-' +
              maxDate.substr(4, 2) +
              '-' +
              maxDate.substr(6, 2),
          )
        }
        locale={ko}
        onChange={handleChange}
        readOnly={props.readOnly}
        customInput={<StyledInput />}
        autoFocus
      />
    );
  };
  DatePickerEditCell.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.string,
    field: PropTypes.string.isRequired,
    minDate: PropTypes.string,
    maxDate: PropTypes.string,
    readOnly: PropTypes.bool,
  };

  const dateFormatter = useCallback((date) => {
    return (
      date &&
      parseISO(
        /\d{8}/.test(date)
          ? date.substr(0, 4) +
              '-' +
              date.substr(4, 2) +
              '-' +
              date.substr(6, 2)
          : /\d{4}-\d{2}-\d{2}/.test(date)
          ? date.substr(0, 10)
          : '',
      )
    );
  }, []);

  useEffect(() => {
    if (Object.keys(commCodes).length > 0) {
      for (const key in columnInfo) {
        if (columnInfo[key].compType === 'select') {
          columnInfo[key].renderCell = (params) => {
            return (
              <SelectCell
                {...params}
                options={commCodes[columnInfo[key].commonCode]}
              />
            );
          };

          columnInfo[key].renderEditCell = (params) => {
            return (
              <SelectEditCell
                {...params}
                options={commCodes[columnInfo[key].commonCode]}
              />
            );
          };
        } else if (columnInfo[key].compType === 'date') {
          columnInfo[key].renderCell = (params) => {
            return (
              <DatePicker
                dateFormat="yyyy-MM-dd"
                selected={dateFormatter(params.value)}
                locale={ko}
                readOnly
                customInput={<StyledInput />}
              />
            );
          };
          columnInfo[key].renderEditCell = (params) => {
            return (
              <DatePickerEditCell
                {...params}
                minDate={columnInfo[key].minDate}
                maxDate={columnInfo[key].maxDate}
              />
            );
          };
        }
      }
      setColumns(columnInfo);
    }
  }, [columnInfo, commCodes, dateFormatter]);

  return {
    rows,
    columns,
    setRows,
    setColumnInfo,
    setCommcodes,
  };
};

export default useDatagrid;
