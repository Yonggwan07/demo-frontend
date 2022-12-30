import { InputBase } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useGridApiContext } from '@mui/x-data-grid';
import { format, parseISO } from 'date-fns';
import ko from 'date-fns/locale/ko';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';

const StyledInput = styled(InputBase)({
  '& .MuiInputBase-input': {
    fontSize: '0.875rem',
  },
});

const useDatagrid = (columnInfo, commCodes) => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  // Select
  const SelectInputCell = (props) => {
    const { value, options } = props;
    const searched = options.find((option) => option.comdCode === value);
    return <div>{searched !== undefined ? searched.comdCdnm : ''}</div>;
  };

  const SelectEditInputCell = (props) => {
    const { id, value, field, options } = props;
    const apiRef = useGridApiContext();

    const handleChange = async (event) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: event.target.value,
      });
      apiRef.current.stopCellEditMode({ id, field });
    };

    return (
      <select value={value} onChange={handleChange} autoFocus>
        {options &&
          options.map((option) => (
            <option key={option.id} value={option.comdCode}>
              {option.comdCdnm}
            </option>
          ))}
      </select>
    );
  };

  // DatePicker
  const DatePickerEditCell = (props) => {
    const { id, value, field } = props;
    const apiRef = useGridApiContext();
    const minDate =
      props.minDate && apiRef.current.getCellValue(id, props.minDate);
    const maxDate =
      props.maxDate && apiRef.current.getCellValue(id, props.maxDate);

    const handleChange = async (date) => {
      await apiRef.current.setEditCellValue({
        id,
        field,
        value: format(date, 'yyyyMMdd'),
      });
      apiRef.current.stopCellEditMode({ id, field });
    };

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
      />
    );
  };

  const dateFormatter = (date) => {
    return (
      date &&
      parseISO(
        date.substr(0, 4) + '-' + date.substr(4, 2) + '-' + date.substr(6, 2),
      )
    );
  };

  useEffect(() => {
    if (Object.keys(commCodes).length > 0) {
      for (const key in columnInfo) {
        if (columnInfo[key].compType === 'select') {
          columnInfo[key].renderCell = (params) => {
            return (
              <SelectInputCell
                {...params}
                options={commCodes[columnInfo[key].field]}
              />
            );
          };
          columnInfo[key].renderEditCell = (params) => {
            return (
              <SelectEditInputCell
                {...params}
                options={commCodes[columnInfo[key].field]}
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
  }, [columnInfo, commCodes]);

  return {
    rows,
    columns,
    setRows,
    setColumns,
  };
};

export default useDatagrid;
