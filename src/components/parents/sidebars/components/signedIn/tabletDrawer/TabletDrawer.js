import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
// import { setCurrentProjectId } from '../../../../../../store/actions/projectActions'
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@material-ui/core";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import DrawerLogo from "../../../../../../assets/logo/logo.jpeg";
import Logo from "../../../../../../assets/bg/blue_bg_logo.png";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { connect } from "react-redux";
import { signOut } from '../../../../../../store/actions/authActions';
import SerachSmallerScreen from "./SerachSmallerScreen";
import { Tooltip } from "@mui/material";




const useStyles = makeStyles({
  drawer: {
    //   backgroundColor: "purple",
    position: "absolute",
  },
  drawerBox: {
    backgroundColor: "#1f0851",
    height: "100%",
    width: "260px",
    color: "white",
    paddingTop: "13px",
    // paddingLeft: "8px",
  },
  DrawerLogo: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "35px",
    height: "30px",
    marginLeft: "5px",
  },
  appBarLogo: {
    // backgroundColor: "#1f0851",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "35px",
    height: "30px",
    // color: "#1f0851",
    marginLeft: "5px",
  },
  toggleNavbar: {
    color: "#1f0851",
    borderRadius: "18px",
    padding: "1px",
    boxShadow: "2px 2px 2px 1px rgba(0,0,0,0.35)",
  },
  links: {
    fontSize: "3rem",
    color: "white",
    marginLeft: "6px",
    "&:hover": {
      backgroundColor: "white",
      color: "#1f0851",
      borderRadius: "10px",
      transition: "0.3s",
    },
  },
  linksBox: {
    marginTop: "80px",
  },
  drawerWorkSpaceTypographyBoxes: {
    marginLeft: "20px",
  },
  dividerClasses: {
    backgroundColor: "#4c0691",
    marginTop: "50px", // this margin is not working inline style is working
  },
});



//==============================================================================> > > Tablet Drawer Component

const TabletDrawer = (props) => {
  const { Child, isSignedIn, isEmailVerified, allProjects } = props;
  const classes = useStyles();


  //----------------------------->Search Menu/Modal states and functions




  // ------------- Dialog box functions

  const dialogLogoutButtonStyle = {
    backgroundColor: "#fb5f5f",
    color: "white",
    hover: {
      backgroundColor: "#ff2b2b",
    },
  };
  const dialogCancelButtonStyle = {
    backgroundColor: "#7cc15b",
    // color: "#1f0851",
    color: "white",
  };
  const [openDialog, setOpenDialog] = React.useState(false);

  const handleOpenDialog = () => {
    setTimeout(setOpenDialog(true), 2000);
  };

  const handleCloseDialog = () => {
    // setOpenDialog(false);
    props.signOut()
  };

  //   --------  Drawer functions
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    // ---------------------------------------------------Drawer---------------------------------------------------
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={classes.drawerBox}
    >
      <Box>
        <Link to='/home/dashboard' style={{ textDecoration: 'none', color: '#1f0851', cursor: 'pointer' }}>
          <IconButton
            style={{ float: "left" }}
            aria-label=""
            onClick={() => {
              console.log("logoClicked");
            }}
          >
            <img src={DrawerLogo} className={classes.DrawerLogo} alt="logo" />
            <span style={{ color: "white" }}>Deep Road</span>
          </IconButton>
        </Link>
      </Box>
      <CloseOutlinedIcon style={{ float: "right" }} />

      {/* ------------------------------------------------------------------- */}
      <Box className={classes.drawerBox}>
        <Box className={classes.linksBox}>
          {/* ------------------------------------Drawer WorkSpaces Box--------------------------- */}
          <Box>
            <Box className={classes.drawerWorkSpaceTypographyBoxes}>
              <Typography
                variant="caption"
                color="initial"
                style={{ color: "#51cbff" }}
              >
                Workspaces
              </Typography>
            </Box>
            <List>
              <Link to='/home/dashboard' style={{ color: 'white', textDecoration: 'none' }}>
                <ListItem button key="Projects">
                  <ListItemIcon>
                    <AssessmentIcon className={classes.links} />
                  </ListItemIcon>
                  <ListItemText primary="Projects" />
                </ListItem>
              </Link>
              <ListItem button key="Converters">
                <ListItemIcon>
                  <CompareArrowsIcon className={classes.links} />
                </ListItemIcon>
                <ListItemText primary="Converters" />
              </ListItem>
              <ListItem button key="Files">
                <ListItemIcon>
                  <DescriptionIcon className={classes.links} />
                </ListItemIcon>
                <ListItemText primary="Files" />
              </ListItem>
            </List>
          </Box>

          <Divider className={classes.dividerClasses} />
          {/* -----------------------------------------Drawer Preferences Box -----------------------------------*/}
          <Box style={{ marginTop: "10px" }}>
            <Box className={classes.drawerWorkSpaceTypographyBoxes}>
              <Typography
                variant="caption"
                color="initial"
                style={{ color: "#51cbff" }}
              >
                Preferences
              </Typography>
            </Box>
            <List>
              <ListItem button key="My profile" onClick={handleOpenDialog}>
                <ListItemIcon>
                  <AccountCircleIcon className={classes.links} />
                </ListItemIcon>
                <ListItemText primary="My profile" />
              </ListItem>
              <ListItem button key="Settings" onClick={handleOpenDialog}>
                <ListItemIcon>
                  <SettingsIcon className={classes.links} />
                </ListItemIcon>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button key="Logout" onClick={handleOpenDialog}>
                <ListItemIcon>
                  <LogoutIcon className={classes.links} />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
  return (
    <>
      {/* ---------------------------------AppBar--------------------------------------- */}
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{ backgroundColor: "white", color: "#1f0851" }}
        >
          <Toolbar variant="dense">
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={toggleDrawer("left", true)}
            >
              <MenuIcon className={classes.toggleNavbar} />
            </IconButton>
            <Box style={{ margin: "0 auto", paddingRight: "57px" }}>
              <Link to='/home/dashboard' style={{ textDecoration: 'none', color: '#1f0851', cursor: 'pointer' }}>
                <Tooltip title="Version 1.0.2">
                  <IconButton>
                  <img src={Logo} className={classes.appBarLogo} alt="logo" />
                  <Typography variant="h5" style={{ color: "#1f0851" }}>
                    DeepRoad
                  </Typography>
                </IconButton>
                </Tooltip>
              </Link>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {/* -------------------------------Drawer---------------------------------------- */}
      <Box style={{ marginTop: "120px", backgroundColor: "blue" }}>
        <Drawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          className={classes.drawer}
        >
          {list("left")}
        </Drawer>
      </Box>
      {/* -------------------------------------------- Dialogbox for logout ------------------- */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to Logout?"}
        </DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDialog} style={dialogCancelButtonStyle}>
            Cancel
          </Button>
          <Button
            onClick={handleCloseDialog}
            autoFocus
            style={dialogLogoutButtonStyle}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>




      {/* --------------------------------Search Bar for tablet screen and project cards-------------------------- */}
      <Box style={{ width: '90%', margin: '-100px auto 0 auto', }}>

        <SerachSmallerScreen/>
        

        {/* ------------------------------Component----------------------------- */}
        {<Child isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} />}
      </Box>


    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isEmailVerified: state.firebase.auth.emailVerified,
    allProjects: state.firestore.ordered.Projects,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
    // setCurrentProjectId: (proid) => dispatch(setCurrentProjectId(proid)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabletDrawer);
