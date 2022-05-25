import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { search, unloadData } from '../../modules/transaction';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import ComWorkTitleArea from '../../components/common/ComWorkTitleArea';
import ComSearchArea from '../../components/common/ComSearchArea';
import ComWorkframe from '../../components/common/ComWorkframe';
import ComCompArea from '../../components/common/ComCompArea';
import { useForm } from 'react-hook-form';
import Select from '../../components/common/Select';
import Checkbox from '../../components/common/Checkbox';
import { addCommonCode } from '../../modules/commonCode';

const MENU_ID = 'tmma0010';
const codeOption = [
  { commCode: 'SYST_CODE', usexYsno: '1' },
  { commCode: 'CDGB_CODE', usexYsno: '1' },
  { commCode: 'REXT_CODE', usexYsno: '1' },
];

const TMMA0010 = () => {
  const [rows, setRows] = useState([]); // 그리드 데이터

  const { register, handleSubmit, setValue, watch } = useForm();

  const { tData, commCode } = useSelector(({ transaction, commonCode }) => ({
    tData: transaction,
    commCode: commonCode.storedCommonCode,
  }));

  const dispatch = useDispatch();

  /* 조회 버튼 클릭 */
  const handleSearch = useCallback(
    (data) => {
      dispatch(
        search({
          menuId: MENU_ID,
          workId: 'search00',
          params: data,
        }),
      );
      return () => {
        dispatch(unloadData());
      };
    },
    [dispatch],
  );

  /* 입력 버튼 클릭 */
  const onInsert = useCallback(() => {
    console.log('Insert');
  }, []);
  
  /* 저장 버튼 클릭 */
  const onSave = useCallback(() => {
    console.log('Save');
  }, []);

  /* 그리드 행 클릭 */
  const onRowClickHandler = (params) => {
    for (const key in columns) {
      setValue(columns[key].field, params.row[columns[key].field]);
    }
  };

  /* 조회 데이터 처리 */
  useEffect(() => {
    if (tData.data && tData.menuId === MENU_ID && tData.workId === 'search00') {
      setRows(tData.data);
      dispatch(unloadData());
    }
  }, [dispatch, tData]);

  /* 공통코드 조회 */
  useEffect(() => {
    let searchArr = [];

    codeOption.forEach((element) => {
      let isExist = false;
      if (commCode.hasOwnProperty(element.commCode)) {
        isExist = true;
      }

      if (!isExist) {
        searchArr.push(element);
      }
    });

    if (searchArr.length > 0) {
      dispatch(
        search({
          menuId: 'comCombo',
          workId: 'getCombo',
          params: searchArr,
        }),
      );
    }
  }, [commCode, dispatch]);

  /* 조회된 공통코드 처리 */
  useEffect(() => {
    if (
      tData.data &&
      tData.menuId === 'comCombo' &&
      tData.workId === 'getCombo'
    ) {
      // Add to stored Combo
      dispatch(addCommonCode(tData.data));
      dispatch(unloadData());
    }
  }, [dispatch, tData]);

  // 조회조건 설정
  const searchItems = [
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
      options: commCode.SYST_CODE,
      nullvalue: 'all', // all, select
      style: { width: '10rem' },
      //readOnly: true,
      //defaultValue: '공통관리',
    },
    {
      label: '조회일자',
      name: 'dateTest',
      type: 'dateToDate',
      valueFrom: '2022-05-22',
      valueTo: '2022-05-31',
      style: { width: '6.5rem', textAlign: 'center' },
      required: true,
    },
    {
      label: '여부',
      name: 'chkTest',
      type: 'checkbox',
      //defaultValue: true,
      //readOnly: true
    },
    {
      label: '월',
      name: 'dayTest',
      type: 'yearToYear',
      valueTo: '2022',
      style: { width: '5rem', textAlign: 'center' },
    },
  ];

  // 그리드 컬럼 설정
  const columns = [
    {
      field: 'COMM_CODE',
      headerName: '공통코드',
      width: 150,
    },
    { field: 'COMM_CDNM', headerName: '공통코드명', width: 200 },
    { field: 'SYST_CODE', headerName: '시스템구분' },
    { field: 'CDGB_CODE', headerName: '코드구분' },
    { field: 'COCD_LNTH', headerName: '세부코드길이' },
    { field: 'ISET_YSNO', headerName: '초기세팅여부' },
    { field: 'RE1F_DESC', headerName: '보조1필드설명' },
    { field: 'RE1T_CODE', headerName: '보조1필드입력형태코드' },
  ];

  return (
    <ComWorkframe>
      <ComWorkTitleArea
        id={MENU_ID}
        title="공통코드관리"
        search
        insert={onInsert}
        save={onSave}
      />
      <ComSearchArea onSubmit={handleSearch} props={searchItems} />
      <ComCompArea>
        <div style={{ background: 'white' }}>
          <DataGrid
            columns={columns}
            rows={rows == null ? [] : rows}
            components={{
              Toolbar: GridToolbar,
            }}
            onRowClick={onRowClickHandler}
            editMode="row"
          />
        </div>
        <ComCompArea direction="v">
          <div style={{ flex: 0 }}>
            <form>
              <table className="workTable">
                <colgroup>
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th>공통코드</th>
                    <td>
                      <input {...register('COMM_CODE')} readOnly />
                    </td>
                    <th>공통코드명</th>
                    <td>
                      <input {...register('COMM_CDNM')} required />
                    </td>
                  </tr>
                  <tr>
                    <th>시스템구분</th>
                    <td>
                      <Select
                        register={register}
                        label="시스템구분"
                        name="SYST_CODE"
                        nullvalue="select"
                        options={commCode.SYST_CODE}
                        required={true}
                        setValue={setValue}
                        watch={watch('SYST_CODE')}
                      />
                    </td>
                    <th>코드구분</th>
                    <td>
                      <Select
                        register={register}
                        label="코드구분"
                        name="CDGB_CODE"
                        nullvalue="select"
                        options={commCode.CDGB_CODE}
                        required={true}
                        setValue={setValue}
                        watch={watch('CDGB_CODE')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>세부코드길이</th>
                    <td>
                      <input {...register('COCD_LNTH')} />
                    </td>
                    <th>초기세팅여부</th>
                    <td>
                      <Checkbox
                        register={register}
                        label="초기세팅여부"
                        name="ISET_YSNO"
                        setValue={setValue}
                        watch={watch('ISET_YSNO')}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          <div>
            <form>
              <table className="workTable">
                <colgroup>
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '40%' }} />
                  <col style={{ minWidth: '8.125rem' }} />
                  <col style={{ width: '60%' }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>구분</th>
                    <th>제목</th>
                    <th>입력형태</th>
                    <th>공통코드</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>항목1</th>
                    <td>
                      <input {...register('RE1F_DESC')} />
                    </td>
                    <td>
                      <Select
                        register={register}
                        label="보조1필드입력형태코드"
                        name="RE1T_CODE"
                        nullvalue="select"
                        options={commCode.REXT_CODE}
                        setValue={setValue}
                        watch={watch('RE1T_CODE')}
                      />
                    </td>
                    <td>
                      <input readOnly />
                    </td>
                  </tr>
                  <tr>
                    <th>세부코드길이</th>
                    <td>
                      <input readOnly />
                    </td>
                    <td>
                      <select></select>
                    </td>
                    <td>
                      <input readOnly />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </ComCompArea>
      </ComCompArea>
    </ComWorkframe>
  );
};

export default TMMA0010;
