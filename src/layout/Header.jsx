import * as React from "react";
import { styled, ThemeProvider, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import { sideBar, sideBar2 } from "../utils/constant";
import { Link } from "react-router-dom";
import { ICONS, IMAGES } from "../assests";
import { DrawerContext } from "../App";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { useEffect } from "react";
import { api } from "../api";
import { useDispatch, useSelector } from "react-redux";
import { searchproduct } from "../redux/reducers/ProductSlice";
import { Button } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { setHeaderToken } from "../api/client";
import { logout } from "../redux/reducers/AuthSlice";

export const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "70%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "110ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export default function Header() {
  const cartproducts = useSelector((state) => state?.cart?.cartproducts);
  const token = useSelector((state) => state?.auth?.userData?.data?.token);
  const cartItemsLength = cartproducts ? cartproducts.length : 0;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const { open, setOpen } = React.useContext(DrawerContext);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  const appBarColor = "#424242";

  const handleChange = (e) => {
    dispatch(searchproduct(e.target.value));
  };

  // console.log("search", search);

  const isMenuOpen = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    setIsLogoutOpen(true);
  };

  const handleMenuClose1 = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/orders");
  };

  const handleLogoutConfirmation = () => {
    setIsLogoutOpen(false);
    dispatch(logout(null));
    navigate("/login", { replace: true });
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      sx={{ mt: 5 }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose1}>Your Orders</MenuItem>
      <MenuItem onClick={handleMenuClose}>Log Out</MenuItem>
      <Dialog open={isLogoutOpen} onClose={() => setIsLogoutOpen(false)}>
        {/* <DialogTitle>Confirmation</DialogTitle> */}
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLogoutOpen(false)}>Cancel</Button>
          <Button onClick={handleLogoutConfirmation} autoFocus>
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </Menu>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          style={{ backgroundColor: appBarColor }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <ICONS.menu />
            </IconButton>
            <Search>
              <SearchIconWrapper>
                <ICONS.search />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
                onChange={(e) => handleChange(e)}
              />
            </Search>

            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {/* <IconButton
                  size="large"
                  aria-label="show 4 new mails"
                  color="inherit"
                >
                  <Badge badgeContent={8} color="error">
                    <ICONS.favourite />
                  </Badge>
                </IconButton> */}
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={() => navigate("/newcart")}
              >
                <Badge badgeContent={cartItemsLength} color="error">
                  <ICONS.shoppingcart />
                </Badge>
              </IconButton>
              <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="primary-search-account-menu"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </MenuItem>
            </Box>
          </Toolbar>
        </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <img
              src={IMAGES.weblogo}
              style={{ width: "150px" }}
              onClick={() => navigate("/")}
            />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? <ICONS.left /> : <ICONS.right />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {sideBar.map(({ id, label, icon, path, category }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton onClick={() => navigate(path)}>
                  <Typography
                    style={{
                      color: "#424242",
                    }}
                    sx={{ mr: 3 }}
                  >
                    {icon}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {sideBar2.map(({ id, label, icon, path }) => (
              <ListItem key={id} disablePadding>
                <ListItemButton component={Link} to={path}>
                  <Typography
                    color="secondary"
                    style={{
                      color: "#424242",
                    }}
                    sx={{ mr: 3 }}
                  >
                    {icon}
                  </Typography>
                  <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
}
