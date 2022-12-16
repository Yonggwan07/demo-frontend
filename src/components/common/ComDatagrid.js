import {
  DataGrid, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton
} from '@mui/x-data-grid';
import { memo, useCallback, useEffect } from 'react';
import ComCommonButtons from './ComCommonButtons';

const ComDatagrid = ({
  rows,
  columns,
  reset,
  selectionModel,
  setSelectionModel,
  ...props
}) => {
  const handleCellKeyDown = useCallback(
    (params, e) => {
      if (e.keyCode === 38 || e.keyCode === 40) {
        const newId = (
          parseInt(params.id) + (e.keyCode === 38 ? -1 : 1)
        ).toString();
        setSelectionModel(newId);
      }
    },
    [setSelectionModel],
  );

  const handleSelectionModelChange = useCallback(
    (ids) => {
      setSelectionModel(ids[0]);
    },
    [setSelectionModel],
  );

  /* Datagrid selectionModel 변경 시 form reset */
  useEffect(() => {
    if (typeof reset === 'function') {
      reset(rows.find((row) => row.id === selectionModel));
    }
  }, [reset, rows, selectionModel]);

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      components={{
        Toolbar: () => (
          <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarExport />
            <ComCommonButtons {...props.commonButtons} />
          </GridToolbarContainer>
        ),
      }}
      experimentalFeatures={{ newEditingApi: true }}
      onCellKeyDown={handleCellKeyDown}
      onSelectionModelChange={handleSelectionModelChange}
      selectionModel={selectionModel}
      {...props}
    />
  );
};

export default memo(ComDatagrid);
