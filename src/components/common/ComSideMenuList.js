import React, { memo, useCallback, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  Collapse,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useSelector } from 'react-redux';

/* Level 2, 3 */
const CustomListItemButton = memo(({ handleClick, menuId, children }) => {
  const _handleClick = useCallback(() => {
    handleClick(menuId);
  }, [handleClick, menuId]);

  return <ListItemButton onClick={_handleClick}>{children}</ListItemButton>;
});
CustomListItemButton.displayName = 'CustomListItemButton';
CustomListItemButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  menuId: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

/* Level 4 */
const BottomListItemButton = memo(
  ({ handleClick, progId, menuName, children }) => {
    const _handleClick = useCallback(() => {
      handleClick(progId, menuName);
    }, [handleClick, menuName, progId]);

    return <ListItemButton onClick={_handleClick}>{children}</ListItemButton>;
  },
);
BottomListItemButton.displayName = 'BottomListItemButton';
BottomListItemButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  progId: PropTypes.string.isRequired,
  menuName: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

const ComSideMenuList = ({ tabs, setTabs, setTabValue, open, setOpen }) => {
  const { menuList } = useSelector(({ menuList }) => ({
    menuList: menuList.menuList,
  }));

  const theme = useTheme();
  const [menuOpen, setMenuOpen] = useState({});

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleCollapsableMenuClick = useCallback(
    (menuId) => {
      setMenuOpen({ ...menuOpen, [menuId]: !menuOpen[menuId] });
    },
    [menuOpen],
  );
  const handleWorkMenuClick = useCallback(
    (programId, menuName) => {
      if (tabs.find((tab) => tab.menuId === programId) === undefined) {
        // 상위 메뉴 검색
        const level3 = menuList.find(
          (level3) =>
            level3.menuId ===
            menuList.find((level4) => level4.programId === programId)
              .upperMenuId,
        );
        const level2 = menuList.find(
          (level2) => level2.menuId === level3.upperMenuId,
        );

        setTabs((tabs) =>
          tabs.concat({
            menuId: programId,
            label: menuName,
            upperMenus: [level2.menuName, level3.menuName],
          }),
        );
        setTabValue(programId);
      } else {
        setTabValue(tabs.find((tab) => tab.menuId === programId).menuId);
      }
      setOpen(false);
    },
    [menuList, setOpen, setTabValue, setTabs, tabs],
  );

  useEffect(() => {
    if (menuList) {
      menuList
        .filter(
          (menuItem) => menuItem.menuLevel === 2 || menuItem.menuLevel === 3,
        )
        .forEach((menuItem) =>
          setMenuOpen((prev) => ({ ...prev, [menuItem.menuId]: false })),
        );
    }
  }, [menuList]);

  return (
    <Drawer anchor="left" open={open} onClose={handleClose}>
      <Box sx={{ p: '1rem' }}>
        <Typography variant="h4">Menu</Typography>
      </Box>
      <List component="nav">
        {menuList &&
          /* Level 2 */
          menuList
            .filter((menuItem) => menuItem.menuLevel === 2)
            .map((menuItemLevel2) => (
              <div key={menuItemLevel2.menuId}>
                <CustomListItemButton
                  handleClick={handleCollapsableMenuClick}
                  menuId={menuItemLevel2.menuId}
                >
                  <ListItemText
                    primary={menuItemLevel2.menuName}
                    primaryTypographyProps={{
                      variant: 'h5',
                      sx: { color: theme.palette.primary[theme.palette.mode] },
                    }}
                  />
                  {menuOpen[menuItemLevel2.menuId] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </CustomListItemButton>
                <Collapse
                  in={menuOpen[menuItemLevel2.menuId]}
                  timeout="auto"
                  unmountOnExit
                >
                  {
                    /* Level 3 */
                    menuList
                      .filter(
                        (menuItemLevel3) =>
                          menuItemLevel3.menuLevel === 3 &&
                          menuItemLevel3.upperMenuId === menuItemLevel2.menuId,
                      )
                      .map((menuItemLevel3) => (
                        <div key={menuItemLevel3.menuId}>
                          <CustomListItemButton
                            handleClick={handleCollapsableMenuClick}
                            menuId={menuItemLevel3.menuId}
                          >
                            <ListItemText
                              primary={menuItemLevel3.menuName}
                              primaryTypographyProps={{
                                variant: 'h6',
                                sx: {
                                  color:
                                    theme.palette.secondary[theme.palette.mode],
                                },
                              }}
                            />
                            {menuOpen[menuItemLevel3.menuId] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </CustomListItemButton>
                          <Collapse
                            in={menuOpen[menuItemLevel3.menuId]}
                            timeout="auto"
                            unmountOnExit
                          >
                            {
                              /* Level 4 */
                              menuList
                                .filter(
                                  (menuItemLevel4) =>
                                    menuItemLevel4.menuLevel === 4 &&
                                    menuItemLevel4.upperMenuId ===
                                      menuItemLevel3.menuId,
                                )
                                .map((menuItemLevel4) => (
                                  <div key={menuItemLevel4.menuId}>
                                    <BottomListItemButton
                                      handleClick={handleWorkMenuClick}
                                      progId={menuItemLevel4.programId}
                                      menuName={menuItemLevel4.menuName}
                                    >
                                      <ListItemText
                                        primary={menuItemLevel4.menuName}
                                        primaryTypographyProps={{
                                          variant: 'subtitle1',
                                        }}
                                      />
                                    </BottomListItemButton>
                                  </div>
                                ))
                            }
                          </Collapse>
                        </div>
                      ))
                  }
                </Collapse>
              </div>
            ))}
      </List>
    </Drawer>
  );
};

ComSideMenuList.propTypes = {
  tabs: PropTypes.array.isRequired,
  setTabs: PropTypes.func.isRequired,
  setTabValue: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default memo(ComSideMenuList);
