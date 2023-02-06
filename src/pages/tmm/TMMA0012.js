import React, { memo, useCallback, useMemo } from 'react';
import ComCompArea from '../../components/common/ComCompArea';
import ComDatagrid from '../../components/common/ComDatagrid';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import useCombo from '../../hooks/useCombo';
import useDatagrid from '../../hooks/useDatagrid';
import { commonMenuPropType } from '../../utils/commonMenuPropType';

const codeOptions = ['SYST_CODE', 'CDGB_CODE'];
const mColumnInfo = [
  { field: 'commonCode', headerName: '공통코드', width: 150 },
  { field: 'commonCodeName', headerName: '공통코드명', flex: 1 },
  { field: 'systemCode', headerName: '시스템코드' },
  { field: 'divisionCode', headerName: '코드구분코드' },
  { field: 'commonCodeLength', headerName: '세부코드길이' },
  { field: 'note', headerName: '비고' },
];

const dColumnInfo = [
  { field: 'commonCode', headerName: '공통코드' },
  { field: 'commonDetailCode', headerName: '세부코드', width: 150 },
  { field: 'commonDetailCodeName', headerName: '세부코드명', width: 200 },
  { field: 'commonDetailCodeEnglishName', headerName: '영문명', width: 200 },
  { field: 'createdDate', headerName: '생성일', width: 200, compType: 'date' },
  { field: 'wastedDate', headerName: '폐기일', width: 200, compType: 'date' },
  { field: 'refField1', headerName: '보조필드1' },
  { field: 'refField2', headerName: '보조필드2' },
  { field: 'refField3', headerName: '보조필드3' },
  { field: 'refField4', headerName: '보조필드4' },
  { field: 'refField5', headerName: '보조필드5' },
  { field: 'refField6', headerName: '보조필드6' },
  { field: 'refField7', headerName: '보조필드7' },
  { field: 'refField8', headerName: '보조필드8' },
  { field: 'refField9', headerName: '보조필드9' },
  { field: 'refField10', headerName: '보조필드10' },
  { field: 'sortOrder', headerName: '정렬순서' },
  { field: 'note', headerName: '비고100' },
];

const TMMA0012 = ({ menuInfo, search }) => {
  const { comCombo } = useCombo(codeOptions);
  const {
    rows: masterRows,
    columns: masterColumns,
    setRows: setMasterRows,
  } = useDatagrid(mColumnInfo, comCombo);

  const {
    rows: detailRows,
    columns: detailColumns,
    setRows: setDetailRows,
  } = useDatagrid(dColumnInfo, comCombo);

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
      search(menuInfo.id, data, 'header')
        .then((res) => {
          setMasterRows(res);
        })
        .catch(() => {
          console.log('transaction error.');
        });
    },
    [menuInfo.id, search, setMasterRows],
  );

  const handleRowClick = useCallback(
    (e) => {
      search(
        menuInfo.id,
        { commonCode: e.row.commonCode },
        'detail',
        false,
      ).then((res) => {
        setDetailRows(res);
      });
    },
    [menuInfo.id, search, setDetailRows],
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
      <ComWorkTitleArea menuInfo={menuInfo} />
      <ComSearchArea onSubmit={handleSearch} searchItems={searchItems} />
      <ComCompArea>
        <div style={{ flex: 0.3 }}>
          <ComDatagrid
            columns={masterColumns}
            rows={masterRows}
            onRowClick={handleRowClick}
            initialState={{
              columns: {
                columnVisibilityModel: {
                  systemCode: false,
                  divisionCode: false,
                  commonCodeLength: false,
                  note: false,
                },
              },
            }}
          />
        </div>
        <ComDatagrid
          columns={detailColumns}
          rows={detailRows}
          initialState={{
            columns: {
              columnVisibilityModel: {
                commonCode: false,
                refField1: false,
                refField2: false,
                refField3: false,
                refField4: false,
                refField5: false,
                refField6: false,
                refField7: false,
                refField8: false,
                refField9: false,
                refField10: false,
              },
            },
          }}
        />
      </ComCompArea>
    </ComWorkframe>
  );
};

TMMA0012.propTypes = commonMenuPropType;

export default memo(TMMA0012);
