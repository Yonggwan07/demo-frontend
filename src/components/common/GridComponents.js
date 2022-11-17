import { useGridApiContext } from '@mui/x-data-grid';

// DataGrid Select Cell Renderer
export function SelectInputCell(props) {
  const { value, options } = props;
  const searched = options.find((option) => option.comdCode === value);
  return <div>{searched !== undefined ? searched.comdCdnm : ''}</div>;
}

// DataGrid Select Edit Cell Renderer
export function SelectEditInputCell(props) {
  const { id, value, field, options, setValue } = props;
  const apiRef = useGridApiContext();

  const handleChange = async (event) => {
    await apiRef.current.setEditCellValue({
      id,
      field,
      value: event.target.value,
    });
    apiRef.current.stopCellEditMode({ id, field });
    setValue(field, event.target.value);
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
}

export function gridInit(columns, commCode, form) {
  for (const key in columns) {
    if (columns[key].compType === 'select') {
      columns[key].renderCell = (params) => {
        return (
          <SelectInputCell {...params} options={commCode[columns[key].field]} />
        );
      };
      columns[key].renderEditCell = (params) => {
        return (
          <SelectEditInputCell
            {...params}
            options={commCode[columns[key].field]}
            setValue={form.setValue}
          />
        );
      };
    }
  }
  return columns;
}
