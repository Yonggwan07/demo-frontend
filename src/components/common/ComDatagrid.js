import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import ComCommonButtons from './ComCommonButtons';

const ComDatagrid = ({ ...props }) => {
  return (
    <div className="gridWrapper">
      <DataGrid
        rows={props.rows === null ? [] : props.rows}
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
        {...props}
      />
    </div>
  );
};

export default ComDatagrid;
