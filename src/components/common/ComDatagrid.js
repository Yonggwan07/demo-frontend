import React, { memo, useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import {
  DataGrid,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';
import ComCommonButtons from './ComCommonButtons';

const ComDatagrid = ({ rows, columns, reset, commonButtons, ...props }) => {
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
        <ComCommonButtons {...commonButtons} />
      </GridToolbarContainer>
    ),
    [commonButtons],
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

ComDatagrid.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  reset: PropTypes.func,
  commonButtons: PropTypes.shape({
    search: PropTypes.object,
    cancel: PropTypes.object,
    insert: PropTypes.object,
    save: PropTypes.object,
    remove: PropTypes.object,
  }),
};

export default memo(ComDatagrid);
