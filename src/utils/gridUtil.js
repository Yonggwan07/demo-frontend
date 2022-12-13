import { useGridApiContext } from '@mui/x-data-grid';

export const GridRowState = {
  normal: 'n',
  inserted: 'i',
  modified: 'm',
  deleted: 'd',
};

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

export const gridInit = (columnInfo, commCodes) => {
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
    }
  }
  return columnInfo;
};