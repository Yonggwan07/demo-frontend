import React, { memo, useCallback, useEffect, useState } from 'react';
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
import { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

/* Level 2, 3 */
const CustomListItemButton = memo(({ handleClick, menuId, children }) => {
  const _handleClick = useCallback(() => {
    handleClick(menuId);
  }, [handleClick, menuId]);

  return <ListItemButton onClick={_handleClick}>{children}</ListItemButton>;
});

/* Level 4 */
const BottomListItemButton = memo(
  ({ handleClick, progId, menuName, children }) => {
    const _handleClick = useCallback(() => {
      handleClick(progId, menuName);
    }, [handleClick, menuName, progId]);

    return <ListItemButton onClick={_handleClick}>{children}</ListItemButton>;
  },
);

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
    (menuIdxx) => {
      setMenuOpen({ ...menuOpen, [menuIdxx]: !menuOpen[menuIdxx] });
    },
    [menuOpen],
  );
  const handleWorkMenuClick = useCallback(
    (progIdxx, menuName) => {
      if (tabs.find((tab) => tab.menuId === progIdxx) === undefined) {
        // 상위 메뉴 검색
        const level3 = menuList.find(
          (level3) =>
            level3.menuIdxx ===
            menuList.find((level4) => level4.progIdxx === progIdxx).upmeIdxx,
        );
        const level2 = menuList.find(
          (level2) => level2.menuIdxx === level3.upmeIdxx,
        );

        setTabs((tabs) =>
          tabs.concat({
            menuId: progIdxx,
            label: menuName,
            upperMenus: [level2.menuName, level3.menuName],
          }),
        );
        setTabValue(progIdxx);
      } else {
        setTabValue(tabs.find((tab) => tab.menuId === progIdxx).menuId);
      }
      setOpen(false);
    },
    [menuList, setOpen, setTabValue, setTabs, tabs],
  );

  useEffect(() => {
    menuList
      .filter(
        (menuItem) => menuItem.menuLevl === '2' || menuItem.menuLevl === '3',
      )
      .forEach((menuItem) =>
        setMenuOpen((prev) => ({ ...prev, [menuItem.menuIdxx]: false })),
      );
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
            .filter((menuItem) => menuItem.menuLevl === '2')
            .map((menuItemLevel2) => (
              <div key={menuItemLevel2.menuIdxx}>
                <CustomListItemButton
                  handleClick={handleCollapsableMenuClick}
                  menuId={menuItemLevel2.menuIdxx}
                >
                  <ListItemText
                    primary={menuItemLevel2.menuName}
                    primaryTypographyProps={{
                      variant: 'h5',
                      sx: { color: theme.palette.primary[theme.palette.mode] },
                    }}
                  />
                  {menuOpen[menuItemLevel2.menuIdxx] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </CustomListItemButton>
                <Collapse
                  in={menuOpen[menuItemLevel2.menuIdxx]}
                  timeout="auto"
                  unmountOnExit
                >
                  {
                    /* Level 3 */
                    menuList
                      .filter(
                        (menuItemLevel3) =>
                          menuItemLevel3.menuLevl === '3' &&
                          menuItemLevel3.upmeIdxx === menuItemLevel2.menuIdxx,
                      )
                      .map((menuItemLevel3) => (
                        <div key={menuItemLevel3.menuIdxx}>
                          <CustomListItemButton
                            handleClick={handleCollapsableMenuClick}
                            menuId={menuItemLevel3.menuIdxx}
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
                            {menuOpen[menuItemLevel3.menuIdxx] ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </CustomListItemButton>
                          <Collapse
                            in={menuOpen[menuItemLevel3.menuIdxx]}
                            timeout="auto"
                            unmountOnExit
                          >
                            {
                              /* Level 4 */
                              menuList
                                .filter(
                                  (menuItemLevel4) =>
                                    menuItemLevel4.menuLevl === '4' &&
                                    menuItemLevel4.upmeIdxx ===
                                      menuItemLevel3.menuIdxx,
                                )
                                .map((menuItemLevel4) => (
                                  <div key={menuItemLevel4.menuIdxx}>
                                    <BottomListItemButton
                                      handleClick={handleWorkMenuClick}
                                      progId={menuItemLevel4.progIdxx}
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

export default memo(ComSideMenuList);
