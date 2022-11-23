import { useCallback, useState } from 'react';
import { useGridApiContext } from '@mui/x-data-grid';

export const GridRowState = {
  normal: 'n',
  inserted: 'i',
  modified: 'm',
  deleted: 'd',
};

const useGrid = (form) => {
  const [rows, setRows] = useState([]);
  const [currentRow, setCurrentRow] = useState({});
  const [changedRows, setChangedRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const SelectInputCell = (props) => {
    const { value, options } = props;
    const searched = options.find((option) => option.comdCode === value);
    return <div>{searched !== undefined ? searched.comdCdnm : ''}</div>;
  };

  // DataGrid Select Edit Cell Renderer
  const SelectEditInputCell = (props) => {
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
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const processChangedRowsUpdate = useCallback(
    (formData) => {
      const updatedRow = {
        ...formData,
        id: currentRow.id,
        state:
          currentRow.state !== GridRowState.inserted
            ? GridRowState.modified
            : currentRow.state,
      };
      setChangedRows(
        changedRows.map((cRow) =>
          cRow.id === currentRow.id ? updatedRow : cRow,
        ),
      );
    },
    [changedRows, currentRow.id, currentRow.state],
  );

  const init = useCallback(
    (columnInfo, commCodes) => {
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
                setValue={form?.setValue}
              />
            );
          };
        }
      }
      setColumns(columnInfo);
    },
    [form?.setValue],
  );

  const setGridData = useCallback((data) => {
    setRows(data);
    setOriginalData(data);
  }, []);

  const addNewRow = useCallback(() => {
    const newRow = {
      id: rows[rows.length - 1].id + 1,
      state: GridRowState.inserted,
    };
    setRows([...rows, newRow]);
    setChangedRows([...changedRows, newRow]);
  }, [changedRows, rows]);

  const onChangeFormValue = useCallback(
    (e) => {
      if (e === undefined) return;
      if (form === undefined) return;

      form.setValue(e.target.name, e.target.value);
      const formData = form.watch();

      const modifiedRows = rows.map((row) => {
        if (row.id === currentRow.id) {
          // 변경된 row 배열에 이미 존재하는 항목인지 확인
          if (
            changedRows.find((changedRow) => {
              return changedRow.id === currentRow.id;
            })
          ) {
            // 원본 데이터와 비교하여 수정된 값이 원본과 같을 경우
            // 변경된 row 배열에서 제거
            const orig = originalData.find((data) => data.id === currentRow.id);
            let isSame = true;
            for (const [key, value] of Object.entries(formData)) {
              if (
                orig !== undefined &&
                value !== orig[key] &&
                !(value === '' && orig[key] === null)
              ) {
                isSame = false;
                break;
              }
            }
            if (orig !== undefined && isSame) {
              setChangedRows(changedRows.filter((cRow) => cRow.id !== row.id));
            } else {
              // 이미 존재하는 항목인 경우 changedRows 배열의 기존 항목 대체
              processChangedRowsUpdate(formData);
            }
          } else {
            // 새로 변경된 항목인 경우 changedRows 배열에 추가
            setChangedRows([
              ...changedRows,
              { ...formData, id: row.id, state: GridRowState.modified },
            ]);
          }
          return { ...formData, id: row.id };
        } else {
          return row;
        }
      });
      setRows(modifiedRows);
    },
    [
      changedRows,
      currentRow.id,
      form,
      originalData,
      processChangedRowsUpdate,
      rows,
    ],
  );

  const onGridRowClickHandler = useCallback(
    (params) => {
      if (params === undefined) return;
      setCurrentRow(params.row);

      if (form !== undefined) {
        for (const key in columns) {
          form.setValue(columns[key].field, params.row[columns[key].field]);
        }
      }
    },
    [columns, form],
  );

  const isInserted = useCallback(() => {
    return currentRow.state === GridRowState.inserted;
  }, [currentRow.state]);

  return {
    rows,
    currentRow,
    changedRows,
    columns,
    init,
    setGridData,
    addNewRow,
    onChangeFormValue,
    onGridRowClickHandler,
    isInserted,
  };
};

export default useGrid;
