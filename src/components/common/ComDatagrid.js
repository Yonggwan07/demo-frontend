import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { memo } from 'react';
import ComCommonButtons from './ComCommonButtons';

const ComDatagrid = ({ ...props }) => {
  return (
    <DataGrid
      {...props}
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
    />
  );
};

export default memo(ComDatagrid);
