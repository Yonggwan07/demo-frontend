import { Box, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { lazy, memo, Suspense, useCallback, useMemo } from 'react';
import handleBackdrop from '../../lib/api/backdrop';
import openSnackbar from '../../lib/api/snackbar';
import { transaction } from '../../lib/api/transaction';
import { constStr } from '../../utils/constStr';
import { jsonKeyUpperCase, nullToEmptyString } from '../../utils/dataUtil';
import { GridRowState } from '../../utils/gridUtil';

const TabPanel = memo(function TabPanel(props) {
  const { children, value, menuId, ...other } = props;
  const Menu = useMemo(
    () =>
      lazy(() =>
        import(
          `../../pages/${menuId.substring(0, 3).toLowerCase()}/${menuId}`
        ).catch(() => ({ default: () => <div>Not found</div> })),
      ),
    [menuId],
  );

  const getCombo = useCallback((codeOptions) => {
    return new Promise((resolve, reject) => {
      transaction({
        menuId: 'comCombo',
        workId: 'getCombo',
        params: codeOptions,
      }).then((res) => {
        if (res.status === 200) {
          resolve(res.data);
        } else {
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const search = useCallback((menuId, workId, params, useSnackbar = true) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      transaction({
        menuId: menuId,
        workId: workId,
        params: params,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(
            constStr.postSearch(res.data.length),
            'success',
            useSnackbar,
          );

          // 값이 null인 항목 빈 문자열로 변경
          if (res.data.length !== undefined) {
            res.data.forEach((data) => {
              nullToEmptyString(data);
            });
          } else {
            nullToEmptyString(res.data);
          }

          resolve(jsonKeyUpperCase(res.data));
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorSearch, 'error', useSnackbar);
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const save = useCallback((menuId, workId, data, useSnackbar = true) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      transaction({
        menuId: menuId,
        workId: workId,
        params: data,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postSave(res.data), 'success', useSnackbar);
          resolve(jsonKeyUpperCase(res.data));
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorSave, 'error', useSnackbar);
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const remove = useCallback((menuId, workId, data) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      const _data = data.map((item) => (item.state = GridRowState.deleted));
      transaction({
        menuId: menuId,
        workId: workId,
        params: _data,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postDelete(res.data));
          resolve(jsonKeyUpperCase(res.data));
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorDelete, 'error');
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  return (
    <Box
      role="tabpanel"
      hidden={value !== menuId}
      id={`tabpanel-${menuId}`}
      aria-labelledby={`tab-${menuId}`}
      {...other}
      sx={{ height: 'calc(100% - 49px)', padding: '0 1rem 1rem 1rem' }}
    >
      <Suspense>
        <Menu getCombo={getCombo} search={search} save={save} remove={remove} />
      </Suspense>
    </Box>
  );
});

function a11yProps(menuId) {
  return {
    id: `simple-tab-${menuId}`,
    'aria-controls': `simple-tabpanel-${menuId}`,
  };
}

const ComWorkframeTab = ({ tabs, setTabs, tabValue, setTabValue }) => {
  /* 탭 선택 변경 시 */
  const handleChange = useCallback(
    (e, newValue) => {
      if (e.target.tagName === 'BUTTON') {
        setTabValue(newValue);
      }
    },
    [setTabValue],
  );

  /* 탭 닫기 버튼 클릭 시 */
  const handleTabClose = useCallback(
    (menuId) => {
      // 탭 삭제 전 인접한 탭 선택
      const deletedIndex = tabs.findIndex((tab) => tab.menuId === menuId);
      if (typeof tabs[deletedIndex + 1] !== 'undefined') {
        setTabValue(tabs[deletedIndex + 1].menuId);
      } else if (typeof tabs[deletedIndex - 1] !== 'undefined') {
        setTabValue(tabs[deletedIndex - 1].menuId);
      } else {
        setTabValue('');
      }

      setTabs(tabs.filter((tab) => tab.menuId !== menuId));
    },
    [setTabValue, setTabs, tabs],
  );

  return (
    <Box sx={{ height: 'calc(100% - 2.5rem)' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleChange}>
          {tabs.map(({ label, menuId }) => (
            <Tab
              key={menuId}
              value={menuId}
              label={label}
              {...a11yProps(menuId)}
              icon={
                <div onClick={() => handleTabClose(menuId)}>
                  <CloseIcon />
                </div>
              }
              iconPosition="end"
              sx={{ minHeight: 0 }}
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map(({ menuId }) => (
        <TabPanel key={menuId} value={tabValue} menuId={menuId} />
      ))}
    </Box>
  );
};

export default ComWorkframeTab;
