import React, { lazy, memo, Suspense, useCallback, useMemo } from 'react';
import { PropTypes } from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Tab, Tabs } from '@mui/material';
import handleBackdrop from '../../lib/api/backdrop';
import openSnackbar from '../../lib/api/snackbar';
import { getApi, postApi, putApi, deleteApi } from '../../lib/api/transaction';
import { constStr } from '../../utils/constStr';
import { emptyStringToNull, nullToEmptyString } from '../../utils/dataUtil';

const NotFound = () => {
  return <div>Not found</div>;
};

const TabPanel = memo(function TabPanel(props) {
  const { value, menuId, label, upperMenus, ...other } = props;
  const menuInfo = useMemo(
    () => ({ id: menuId, name: label, upperMenus }),
    [label, menuId, upperMenus],
  );
  const Menu = useMemo(
    () =>
      lazy(() =>
        import(
          `../../pages/${menuId.substring(0, 3).toLowerCase()}/${menuId}`
        ).catch(() => ({ default: NotFound })),
      ),
    [menuId],
  );

  const search = useCallback((menuId, params, workId, useSnackbar = true) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      getApi({
        menuId: menuId,
        params: params,
        workId: workId,
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

          resolve(res.data);
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorSearch, 'error', useSnackbar);
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const save = useCallback((menuId, data, workId, useSnackbar = true) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      emptyStringToNull(data);
      postApi({
        menuId: menuId,
        params: data,
        workId: workId,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postSave, 'success', useSnackbar);
          resolve(res.data);
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorSave, 'error', useSnackbar);
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const update = useCallback((menuId, data, workId, useSnackbar = true) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      emptyStringToNull(data);
      putApi({
        menuId: menuId,
        params: data,
        workId: workId,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postSave, 'success', useSnackbar);
          resolve(res.data);
        } else {
          handleBackdrop(false);
          openSnackbar(constStr.errorSave, 'error', useSnackbar);
          console.error(res);
          return reject();
        }
      });
    });
  }, []);

  const remove = useCallback((menuId, data, workId) => {
    return new Promise((resolve, reject) => {
      handleBackdrop(true);
      deleteApi({
        menuId: menuId,
        params: data,
        workId: workId,
      }).then((res) => {
        if (res.status === 200) {
          handleBackdrop(false);
          openSnackbar(constStr.postDelete);
          resolve(res.data);
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
        <Menu
          menuInfo={menuInfo}
          search={search}
          save={save}
          update={update}
          remove={remove}
        />
      </Suspense>
    </Box>
  );
});

TabPanel.propTypes = {
  value: PropTypes.string.isRequired,
  menuId: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  upperMenus: PropTypes.array.isRequired,
};

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
        <Tabs
          value={tabValue}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map(({ menuId, label }) => (
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
      {tabs.map(({ menuId, label, upperMenus }) => (
        <TabPanel
          key={menuId}
          value={tabValue}
          menuId={menuId}
          label={label}
          upperMenus={upperMenus}
        />
      ))}
    </Box>
  );
};

ComWorkframeTab.propTypes = {
  tabs: PropTypes.array.isRequired,
  setTabs: PropTypes.func.isRequired,
  tabValue: PropTypes.string.isRequired,
  setTabValue: PropTypes.func.isRequired,
};

export default ComWorkframeTab;
