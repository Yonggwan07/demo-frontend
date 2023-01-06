import React, { memo, useCallback, useEffect, useState } from 'react';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import { memo, useCallback, useEffect, useState } from 'react';
import ComCommonButtons from './ComCommonButtons';

const ComDatagrid = ({
  rows,
  columns,
  reset,
  ...props
}) => {
  const [selectionModel, setSelectionModel] = useState([]);
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

  const gridToolBar = useCallback(
    () => (
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <ComCommonButtons {...props.commonButtons} />
      </GridToolbarContainer>
    ),
    [props.commonButtons],
  );

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      components={{
        Toolbar: gridToolBar,
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
