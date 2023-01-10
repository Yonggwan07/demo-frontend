import React, { memo, useCallback, useMemo } from 'react';
import ComCompArea from '../../components/common/ComCompArea';
import ComDatagrid from '../../components/common/ComDatagrid';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import useCombo from '../../hooks/useCombo';
import useDatagrid from '../../hooks/useDatagrid';
import { commonMenuPropType } from '../../utils/commonMenuPropType';
import { GridRowState } from '../../utils/gridRowState';

const codeOptions = [
  { commCode: 'MSKN_CODE', usexYsno: '1' },
  { commCode: 'MSDV_CODE', usexYsno: '1' },
];

const columnInfo = [
  {
    field: 'MSGE_CODE',
    headerName: '메시지코드',
    width: 150,
  },
  {
    field: 'MSGE_CNTT',
    headerName: '메시지내용',
    flex: 1,
    editable: true,
  },
  {
    field: 'MSEN_CNTT',
    headerName: '메시지영문내용',
    width: 150,
    flex: 1,
    editable: true,
  },
  {
    field: 'MSKN_CODE',
    headerName: '메시지종류',
    compType: 'select',
    commCode: 'MSKN_CODE',
    editable: true,
  },
  {
    field: 'MSDV_CODE',
    headerName: '메시지구분',
    compType: 'select',
    commCode: 'MSDV_CODE',
    editable: true,
  },
];

const TMMA0020 = ({ menuInfo, search }) => {
  const { comCombo } = useCombo(codeOptions);
  const { rows, columns, setRows } = useDatagrid(columnInfo, comCombo);

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
      search(menuInfo.id, 'search00', data)
        .then((res) => {
          setRows(res);
        })
        .catch(() => {
          setRows([]);
        });
    },
    [menuInfo.id, search, setRows],
  );

  /* 입력 버튼 클릭 */
  const onInsert = () => {
    const newId = (parseInt(rows[rows.length - 1].id) + 1).toString();
    const newRow = {
      id: newId,
      state: GridRowState.inserted,
    };
    setRows((prev) => [...prev, newRow]);
  };

  /* 저장 버튼 클릭 */
  const onSave = () => {
    console.log('--- Save ---');
    // save(menuInfo.id, 'save00', [data]).then(() => {
    //   setRows(rows.map((row) => (row.id === data.id ? data : row)));
    //   reset({}, { keepValues: true });
    // });
  };

  /* 삭제 버튼 클릭 */
  const onRemove = () => {
    console.log('--- Remove ---');
    // const data = getValues();
    // remove(menuInfo.id, 'save00', [data]).then(() => {
    //   setRows(rows.filter((row) => row.id !== data.id));
    //   reset({}, { keepValues: true });
    // });
  };

  const searchItems = useMemo(
    () => [
      {
        label: '메시지내용',
        name: 'MSGE_CNTT',
        style: { width: '15rem' },
      },
    ],
    [],
  );

  return (
    <ComWorkframe>
      <ComWorkTitleArea menuInfo={menuInfo} />
      <ComSearchArea onSubmit={handleSearch} searchItems={searchItems} />
      <ComCompArea>
        <ComDatagrid
          rows={rows}
          columns={columns}
          commonButtons={{
            insert: { onClick: onInsert },
            save: { onClick: onSave },
            remove: { onClick: onRemove },
          }}
        />
      </ComCompArea>
    </ComWorkframe>
  );
};

TMMA0020.propTypes = commonMenuPropType;

export default memo(TMMA0020);
