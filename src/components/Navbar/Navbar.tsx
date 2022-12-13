/* Libraries */
import * as React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  CssBaseline,
  Typography,
  Toolbar,
  Drawer,
  IconButton,
  Box,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";

// 메뉴 타입
type MenuType = {
  id: number;
  link: string;
  title: string;
  is_visible: boolean;
  submenu: MenuType[];
};

// 메뉴 목록
const MENU: MenuType[] = [
  {
    id: 0,
    link: "/",
    title: "LOGIN",
    is_visible: true,
    submenu: [],
  },
  {
    id: 1,
    link: "/todos",
    title: "TODOS",
    is_visible: false,
    submenu: [],
  },
];

export default function Navbar() {
  // 사이드바 상태
  const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

  /**
   * 사이드바 상태 변경
   */
  const handleDrawer = (): void => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  /**
   *  메뉴 리스트 생성
   * @param list 리스트
   */
  const createMenuList = (list: MenuType[]) => (
    // eslint-disable-next-line max-len
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div style={{ width: 250 }} onClick={handleDrawer}>
      {list.map((menu) => (
        <Link
          to={menu.link}
          style={{ color: "#000", textDecoration: "none" }}
          key={menu.id}
        >
          <ListItem button key={menu.link}>
            <ListItemText primary={menu.title} />
          </ListItem>
        </Link>
      ))}
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="primary">
        <CssBaseline />
        <Toolbar>
          <Typography variant="h5" component="div" style={{ flexGrow: 1 }}>
            온보딩
          </Typography>
          <IconButton
            onClick={handleDrawer}
            size="small"
            edge="end"
            color="inherit"
          >
            <Menu />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={isDrawerOpen} anchor="right" onClose={handleDrawer}>
        {createMenuList(MENU)}
      </Drawer>
    </Box>
  );
}
