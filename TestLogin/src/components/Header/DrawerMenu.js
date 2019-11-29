import React from 'react';
import { withRouter } from "react-router-native";
import { MenuItem, MenuDivider } from 'react-native-material-menu';

const DrawerMenu = withRouter(({ history, user, setUser, hideMenu }) => {
  const redirect = (path) => {
    hideMenu();
    history.push(path);
  }
  const logout = () => {
    hideMenu();
    setUser({});
    history.push("/");
  }
  if (!user.username) {
    return (
      <>
        <MenuItem onPress={() => redirect("/login")}>Đăng nhập</MenuItem>
        <MenuDivider />
        <MenuItem onPress={() => redirect("/signup")}>Đăng ký</MenuItem>
        <MenuDivider />
      </>
    )
  }
  return (
    <MenuItem onPress={logout}>Đăng xuất</MenuItem>
  );
})

export default DrawerMenu;