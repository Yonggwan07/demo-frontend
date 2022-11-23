import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import ComCompArea from '../../components/common/ComCompArea';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import useGrid from '../../hooks/useGrid';

const MENU_ID = 'tmma0012';
const codeOptions = [
  { commCode: 'SYST_CODE', usexYsno: '1' },
  { commCode: 'CDGB_CODE', usexYsno: '1' },
];
const mColumnInfo = [
  { field: 'COMM_CODE', headerName: '공통코드', width: 150 },
  { field: 'COMM_CDNM', headerName: '공통코드명', flex: 1 },
  { field: 'SYST_CODE', headerName: '시스템코드' },
  { field: 'CDGB_CODE', headerName: '코드구분코드' },
  { field: 'COCD_LNTH', headerName: '세부코드길이' },
  { field: 'RE1F_DESC', headerName: '보조1필드설명' },
  { field: 'RE2F_DESC', headerName: '보조2필드설명' },
  { field: 'RE3F_DESC', headerName: '보조3필드설명' },
  { field: 'RE4F_DESC', headerName: '보조4필드설명' },
  { field: 'RE5F_DESC', headerName: '보조5필드설명' },
  { field: 'RE6F_DESC', headerName: '보조6필드설명' },
  { field: 'REMK_100X', headerName: '비고100' },
];

const dColumnInfo = [
  { field: 'COMM_CODE', headerName: '공통코드' },
  { field: 'COMD_CODE', headerName: '세부코드', width: 150 },
  { field: 'COMD_CDNM', headerName: '세부코드명', width: 200 },
  { field: 'COMD_ENNM', headerName: '영문명', width: 200 },
  { field: 'CRTE_DATE', headerName: '생성일', width: 200 },
  { field: 'WAST_DATE', headerName: '폐기일', width: 200 },
  { field: 'REF1_FILD', headerName: '보조1필드' },
  { field: 'REF2_FILD', headerName: '보조2필드' },
  { field: 'REF3_FILD', headerName: '보조3필드' },
  { field: 'REF4_FILD', headerName: '보조4필드' },
  { field: 'REF5_FILD', headerName: '보조5필드' },
  { field: 'REF6_FILD', headerName: '보조6필드' },
  { field: 'REF7_FILD', headerName: '보조7필드' },
  { field: 'REF8_FILD', headerName: '보조8필드' },
  { field: 'REF9_FILD', headerName: '보조9필드' },
  { field: 'RE10_FILD', headerName: '보조10필드' },
  { field: 'SORT_ORDR', headerName: '정렬순서' },
  { field: 'REMK_100X', headerName: '비고100' },
  { field: 'OERP_CODE', headerName: '(구)ERP코드' },
];

const TMMA0012 = ({ getCombo, search }) => {
  const [comCombo, setComCombo] = useState({});
  const {
    rows: mRows,
    columns: mColumns,
    init: mInit,
    setRowData: mSetRowData,
    onGridRowClickHandler: mOnGridRowClickHandler,
  } = useGrid();
  const {
    rows: dRows,
    columns: dColumns,
    init: dInit,
    setRowData: dSetRowData,
  } = useGrid();

  useEffect(() => {
    getCombo(codeOptions).then((res) => {
      setComCombo(res);
      mInit(mColumnInfo);
      dInit(dColumnInfo);
    });
  }, [dInit, getCombo, mInit]);

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
      search(MENU_ID, 'search00', data)
        .then((res) => {
          mSetRowData(res);
        })
        .catch(() => {
          console.log('transaction error.');
        });
    },
    [search, mSetRowData],
  );

  const handleRowClick = useCallback(
    (e) => {
      mOnGridRowClickHandler(e);
      search(MENU_ID, 'search01', e.row, false).then((res) => {
        dSetRowData(res);
      });
    },
    [dSetRowData, mOnGridRowClickHandler, search],
  );

  const searchItems = useMemo(
    () => [
      // 모든 항목에 label, name 필수
      {
        label: '공통코드/명',
        name: 'COMM_CDNM',
        style: { width: '10rem' },
        maxLength: 9,
      },
      {
        label: '시스템코드',
        name: 'SYST_CODE',
        type: 'select',
        options: comCombo.SYST_CODE,
        nullvalue: 'all', // all, select
        style: { width: '10rem' },
        //readOnly: true,
        //defaultValue: '공통관리',
      },
    ],
    [comCombo.SYST_CODE],
  );

  return (
    <ComWorkframe>
      <ComWorkTitleArea id={MENU_ID} title="세부코드관리" search />
      <ComSearchArea
        onSubmit={handleSearch}
        props={searchItems}
        menuId={MENU_ID}
      />
      <ComCompArea>
        <div className="gridWrapper" style={{ flex: 0.3 }}>
          <DataGrid
            columns={mColumns}
            rows={mRows}
            components={{
              Toolbar: GridToolbar,
            }}
            onRowClick={handleRowClick}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  SYST_CODE: false,
                  CDGB_CODE: false,
                  COCD_LNTH: false,
                  RE1F_DESC: false,
                  RE2F_DESC: false,
                  RE3F_DESC: false,
                  RE4F_DESC: false,
                  RE5F_DESC: false,
                  RE6F_DESC: false,
                  REMK_100X: false,
                },
              },
            }}
          />
        </div>
        <div className="gridWrapper">
          <DataGrid
            columns={dColumns}
            rows={dRows}
            components={{
              Toolbar: GridToolbar,
            }}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  COMM_CODE: false,
                  REF1_FILD: false,
                  REF2_FILD: false,
                  REF3_FILD: false,
                  REF4_FILD: false,
                  REF5_FILD: false,
                  REF6_FILD: false,
                  REF7_FILD: false,
                  REF8_FILD: false,
                  REF9_FILD: false,
                  RE10_FILD: false,
                },
              },
            }}
          />
        </div>
      </ComCompArea>
    </ComWorkframe>
  );
};

export default memo(TMMA0012);
