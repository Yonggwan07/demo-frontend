import { useGridApiContext } from '@mui/x-data-grid';
import { useCallback, useState } from 'react';

export const GridRowState = {
  normal: 'n',
  inserted: 'i',
  modified: 'm',
  deleted: 'd',
};

const useGrid = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);

  const SelectInputCell = (props) => {
    const { value, options } = props;
    const searched = options.find((option) => option.comdCode === value);
    return <div>{searched !== undefined ? searched.comdCdnm : ''}</div>;
  };

  // DataGrid Select Edit Cell Renderer
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

  const init = useCallback((columnInfo, commCodes) => {
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
              //setValue={setValue}
            />
          );
        };
      }
    }
    setColumns(columnInfo);
  }, []);

  const setGridData = useCallback((data) => {
    setRows(data);
  }, []);

  const addNewRow = useCallback(() => {
    const newRow = {
      id: parseInt(rows[rows.length - 1].id) + 1,
      state: GridRowState.inserted,
    };
    setRows([...rows, newRow]);
  }, [rows]);

  return {
    rows,
    columns,
    init,
    setGridData,
    addNewRow,
  };
};

export default useGrid;
