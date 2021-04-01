import React, { useEffect } from "react";
import * as Icon from "react-feather";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";
import { NavLink, useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  CssBaseline,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Badge,
  
  Collapse,
} from "@material-ui/core";


import authService from "./services/authService";

const drawerWidth = "15";

const useStyles = makeStyles((theme) => ({
  appBar: {
    
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawer: {
    backgroundColor: '#455470',
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    backgroundColor: '#3f4d67',
    width: drawerWidth,
    
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  
  drawerClose: {
    backgroundColor: '#455470',
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  appBarTransparent: {
    backgroundColor: 'rgba(0, 0, 0,0.0)',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,}),
},
  appBarSolid: {
    backgroundColor: '#FFFFFF',
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,})
},  
  
  appBarSpacer: 
    theme.mixins.toolbar,

  toolbarIcon: {
    right: theme.spacing(2),
    color: 'black'
  },
  toolbarTitle: {
    flexGrow: 1,
    color: 'black'
  },
  menuButton: {
    
    marginRight: theme.spacing(2),
    color: 'black'
  },
  hide: {
    display: "none",
  },
  drawerHeader: {
    backgroundColor: '#3F4D67',
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
}));

function NavBar(props) {
  const stylesCss = useStyles();
  const [open, setOpen] = React.useState(false);
  const [submenu, setSubmenu] = React.useState(false);
  // const [notiData, setNotiData] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [anchorElNoti, setAnchorElNoti] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  // const openNoti = Boolean(anchorElNoti);
  const history = useHistory();
  const [showAdmin, setShowAdmin] = React.useState(false);
  const [userDetails, setUserDetails] = React.useState({
    id: "",
    username: "",
    email: "",
    roles: [],
  });
  const { user,
    headerShadow,
    headerFixed,
    sidebarToggleMobile,
    setSidebarToggleMobile } = props;

  const handleMenuClick = () => {
    setSubmenu(!submenu);
  };

  useEffect(() => {
    console.log(user);
    if (user !== null && user.roles !== undefined) {
      // setUserDetails({
      //   id: user.id,
      //   username: user.username,
      //   email: user.email,
      //   roles: user.roles,
      // });
      setShowAdmin(user.roles.includes("ROLE_ADMIN"));
    }
  }, [props]);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setAnchorElNoti(null);
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const handleLogin = () => {
    history.push("/login");
  };

  const handleLogout = () => {
    authService.logout();
    window.location = "/login";
  };

  const handleProfile = () => {
    history.push("/profile");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar className={stylesCss.appBarSolid} >
        <Toolbar >
          {user && (
            <IconButton
              backgroundColor= '#3F4D67'
              className={stylesCss.menuButton}
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              //color="inherit"
              // className={clsx(stylesCss.menuButton, open && stylesCss.hide)}
            >
              {open ? <Icon.ChevronLeft /> : <Icon.Menu />}
            </IconButton>
          )}
          <Typography variant="h5" className={stylesCss.toolbarTitle}>
               Document Management System
          </Typography>
          {user && (
      
            <div className={stylesCss.toolbarIcon}>
               <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              //onClick={handleMenu}
              color="black"
            ><Badge badgeContent={8} color="primary">
              <Icon.Bell />
              </Badge>
            </IconButton>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="black"
              >
                <Icon.User />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={openMenu}
                getContentAnchorEl={null}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleProfile}>Profile</MenuItem> */}
                
                <MenuItem onClick={handleProfile}>My Account</MenuItem>
                <MenuItem onClick={handleLogout}>Log Out</MenuItem>
              </Menu>
            </div>
          )}
          
        </Toolbar>
      </AppBar>

      {user && (
        <Drawer
        backgroundColor='#3f4d67'
          //onMouseEnter={handleDrawerOpen}
          // onMouseLeave={handleDrawerClose}
          variant="permanent"
          className={clsx(stylesCss.drawer, {
            [stylesCss.drawerOpen]: open,
            [stylesCss.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [stylesCss.drawerOpen]: open,
              [stylesCss.drawerClose]: !open,
            }),
          }}
        >
          <div className={stylesCss.appBarSpacer } backgroundColor = '#455470'/>
          <List style={{color:'white'}}backgroundColor = '#455470'>
            {showAdmin && (
              <ListItem
                button
                key="AdminDashBoard"
                component={NavLink}
                to="/admin-panel"
              >
                <ListItemIcon>
                  <Icon.Globe color="white"/>
                </ListItemIcon>
                <ListItemText primary="Admin DashBoard" />
              </ListItem>
            )}
             <ListItem
              button
              key="User"
              component={NavLink}
              to="/user"
            >
              <ListItemIcon>
                <Icon.User color="white"/>
              </ListItemIcon>
              <ListItemText primary="User" color="light" />
            </ListItem>
            <ListItem
              button
              key="DashBoard"
              component={NavLink}
              to="/dashboard"
            >
              <ListItemIcon>
                <Icon.Home color="white"/>
              </ListItemIcon>
              <ListItemText primary="DashBoard" color="light" />
            </ListItem>

           
            {/* <ListItem button key="Reports" component={NavLink} to="/reports">
              <ListItemIcon>
                <Icon.File />
              </ListItemIcon>
              <ListItemText primary="Reports" />
            </ListItem> */}
            <ListItem button key="View Documents" onClick={handleMenuClick}>
              <ListItemIcon>
                <Icon.BookOpen color="white"/>
              </ListItemIcon>
              <ListItemText primary="View Documents" />
              {submenu ? <Icon.ChevronUp color="white"/> : <Icon.ChevronDown color="white"/>}
            </ListItem>
            <Collapse in={submenu} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button component={NavLink} to="/viewDocumentList">
                  <ListItemIcon>
                    <Icon.Bookmark size="20" color="white"/>
                  </ListItemIcon>
                  <ListItemText primary="Documents" />
                </ListItem>
                <ListItem button component={NavLink} to="/viewStockBalance">
                  <ListItemIcon>
                    <Icon.Briefcase size="20" color="white"/>
                  </ListItemIcon>
                  <ListItemText primary="Stock Balance" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem
              button
              key="Export data"
              component={NavLink}
              to="/exportData"
            >
              <ListItemIcon>
                <Icon.Download color="white"/>
              </ListItemIcon>
              <ListItemText primary="Export data" />
            </ListItem>
            <ListItem
              button
              key="Add New Customer"
              component={NavLink}
              to="/addNewCustomer"
            >
              <ListItemIcon>
                <Icon.UserPlus color="white"/>
              </ListItemIcon>
              <ListItemText primary="Add New Customer" />
            </ListItem>
            <ListItem
              button
              key="Add New Raw Material"
              component={NavLink}
              to="/addNewRawMaterial"
            >
              <ListItemIcon>
                <Icon.Archive color="white"/>
              </ListItemIcon>
              <ListItemText primary="Add New Raw Material" />
            </ListItem>
          </List>
        </Drawer>
      )}
    </React.Fragment>
  );
}

export default NavBar;
