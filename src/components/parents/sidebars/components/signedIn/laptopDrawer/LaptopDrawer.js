import React, { useState, useRef } from "react";
import { styled, useTheme } from "@mui/material/styles";
import * as ROUTES from "../../../../../../constants/routes";
import moment from "moment";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { makeStyles } from "@material-ui/core";
import Logo from "../../../../../../assets/logo/logo.jpeg";
import AssessmentIcon from "@mui/icons-material/Assessment";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import DescriptionIcon from "@mui/icons-material/Description";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { connect } from "react-redux";
// import { setCurrentProjectId } from "../../../../../../store/actions/projectActions";
import { useMediaQuery } from "@mui/material";
import "../../Sidebar.scss";
import newlogo from "../../../../../../assets/bg/deep road logo.png";
const breakPointsTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1700,
    },
  },
});

const searchBarTheme = createTheme({
  palette: {
    primary: {
      main: "#fafafa",
    },
  },
  shape: {
    borderRadius: "30px",
  },
});
const notificationBadgeTheme = createTheme({
  palette: {
    primary: {
      main: "#fa3f3f",
      // main:'#fafafa'
    },
  },
});
const searchMenuBackgroundColorTheme = createTheme({
  palette: {
    primary: {
      main: "#fa3f3f",
      // main:'#fafafa'
    },
  },
  shape: {
    borderRadius: "30px",
  },
});

function LaptopDrawer(props) {
  const theme = useTheme();
  const projectSearchbarRef = useRef();

  // states
  const [appName, setAppName] = useState({
    withLogo: "",
    inAppBar: "CyclePath",
  });
  let [drawerPreferencesBoxMargin, setDrawerPreferencesBoxMargin] =
    useState("0px"); // Setting margin of drawers Preferences box on opening

  const [open, setOpen] = React.useState(false);
  const [laptopDrawerZindex, setLaptopDrawerZindex] = useState(null);

  //   --------------------------------------------------  Drawer Functions

  const drawerWidth = 240;
  const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex,
    }),
    overflowX: "hidden",
  });

  const tabletScreenMatch = useMediaQuery("(min-width:769px)");
  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.complex,
    }),
    overflowX: "hidden",
    width: tabletScreenMatch ? `calc(${theme.spacing(9)} + 1px)` : "0px",
  });

  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // minHeight:!isProjectDashboard?theme.mixins.toolbar:'0px',
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

  //------------------------------------------------------ App Bar functions
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  //  ---- Drawer Function

  const DrawerOld = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    width: drawerWidth,

    flexShrink: 0,
    whiteSpace: "nowrap",
    boxSizing: "border-box",
    zIndex: laptopDrawerZindex,

    ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
    }),
  }));

  //------------------------- Tooltip function
  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: "rgba(0, 0, 0, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }));

  // ------------------------------------------------------- functions for cards to be appeared after navbar and drawer
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      paddingTop: "8px",
      paddingLeft: "15px",
      paddingRight: "20px",
      paddingBottom: "5px",
      // padding: theme.spacing(1.5),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      // marginLeft: `-${drawerWidth}px`,
      marginLeft: isProjectDashboard ? `0px` : `72px`,
      ...(open && {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        // marginLeft: '240px',
      }),
    })
  );

  //===================================================================== > > > LaptopSidebar  Component
  const [openBackdrop, setOpenBackdrop] = React.useState(false);
  const handleCloseBackdrop = () => {
    setOpenBackdrop(false);
  };
  const handleToggleBackdrop = () => {
    setOpenBackdrop(!openBackdrop);
  };

  const {
    Child,
    isSignedIn,
    isEmailVerified,
    allProjects,
    themeRed,
    isProjectDashboard,
  } = props;
  console.log(isProjectDashboard, "isProjectDashboard");
  const { appTitle, themeColor } = themeRed;

  const [tooltipPlacement, setTooltipPlacement] = useState("right");
  const [displays, setDisplays] = useState({
    //setting diplays of profileInfo & appName on drawer open/close
    firstDisplays: "block",
    secondDisplays: "none",
  });
  const useStyles = makeStyles({
    fullDrawerComponent: {
      // position: "absolute",
      // zIndex: "-1",
      width: "100%",
      height: "100%",
      // backgroundColor: "#e9e9e9",
    },
    drawer: {
      backgroundColor: "purple",
      position: "absolute",
      display: isProjectDashboard ? "none" : "flex",
    },
    drawerBox: {
      backgroundColor: themeColor,
      height: "100%",
      width: "260px",
      color: "white",
    },
    Logo: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "38px",
      height: "34px",
      color: "white",
      marginLeft: "5px",
    },
    links: {
      fontSize: "2rem",
      color: "white",
      marginLeft: "3px",
    },
    linksBox: {
      marginTop: "70px",
    },
    closeDrawerIcon: {
      color: "white",
    },
    closeDrawerBox: {
      position: "fixed",
      top: "12px",
      left: "219px",
      zIndex: "1",
    },
    closeDrawerBox1: {
      position: "relative",
      zIndex: 2400,
      top: "5px",
      left: "23px",
    },
    toggleNavbar: {
      color: themeColor,
      padding: "1px",
      borderRadius: "12px",
      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.3)",
    },
    rightProfileInfoStyles: {
      marginLeft: "300px",
    },
    leftProfileInfoStyles: {
      marginLeft: "0",
      width: "20rem",
      paddingLeft: "0",
      // backgroundColor:'cyan'
    },
    notificationBadge: {
      padding: "5px 5px",
      borderRadius: "8px",
      color: themeColor,
      boxShadow: "2px 2px 2px 2px rgba(0,0,0,0.3)",
      fontSize: "4rem",
    },
    drawerWorkSpaceTypographyBoxes: {
      marginLeft: "20px",
    },
    dividerClasses: {
      // backgroundColor: "#4c0691",
      backgroundColor: "white",
      color: "white",

      marginTop: "20px", // this margin is not working inline style is working
    },
    notificationMenu: {
      // backgroundColor:'blue',
      width: "35rem",
    },
    colClass: {
      color: "red",
    },
  });
  const classes = useStyles();

  const styles = {
    dashBoardBtn: {
      backgroundColor: themeColor,
      padding: "7px 13px",
      color: "white",
      borderRadius: 6,
      boxShadow: "2px 2x 2px 2px rgba(0,0,0,0.5)",
      textTransform: "capitalize",
      textDecoration: "none",
      float: "right",
    },
    appbar: {
      height: { xl: "5rem" },
      backgroundColor: "white",
      color: themeColor,
    },
    appbarLogo: {
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "38px",
      height: "34px",
      color: "black",
      backgroundColor: themeColor,
      marginLeft: "5px",
    },
    logoBox:{
      width: "73px",
      heightL: "75px",
      backgroundColor: "#EFF2FF",
      textAlign:'center',
      borderRadius:'0 0 5px 5px'
    }
  };

  const handleDrawerOpen = () => {
    setLaptopDrawerZindex(2400);

    // setting states on opening drawer with toggle button
    setOpen(true);
    // setAppBarWidth(`calc(100% - 239px)`);
    setAppName({ withLogo: "CyclePath", inAppBar: "" });
    setDisplays({ firstDisplays: "none", secondDisplays: "block" });
    setDrawerPreferencesBoxMargin("30px");
    setTooltipPlacement("top-start");
    handleToggleBackdrop();
  };

  const handleDrawerClose = () => {
    setLaptopDrawerZindex(null);

    // setting states on closing drawer with toggle button
    setOpen(false);
    // setAppBarWidth(`calc(100% - 72px)`);
    setAppName({ withLogo: "", inAppBar: "CyclePath" });
    setDisplays({ firstDisplays: "block", secondDisplays: "none" });
    setDrawerPreferencesBoxMargin("0px");
    setTooltipPlacement("right");
    handleCloseBackdrop();
  };

  const list = (anchor) => (
    <Box className={classes.drawerBox}>
      <Link to="/home/dashboard" sx={{ marginBotton: "10px" }}>
        <Box style={styles.logoBox} >
          <img src={newlogo} style={{width:'50px',height:'50px',}} alt="logo" />
        </Box>
      </Link>

      {/* <Box className={classes.closeDrawerBox1}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "rtl" ? (
            <ChevronRightIcon className={classes.closeDrawerIcon} />
          ) : (
            <ChevronLeftIcon className={classes.closeDrawerIcon} />
          )}
        </IconButton>
      </Box> */}

      <Box className={classes.linksBox}>
        {/* ------------------------------------Drawer WorkSpaces Box--------------------------- */}
        <Box>
          <Box
            style={{ display: displays.secondDisplays }}
            className={classes.drawerWorkSpaceTypographyBoxes}
          >
            <Typography
              variant="caption"
              color="initial"
              style={{ color: "#51cbff" }}
            >
              Workspaces
            </Typography>
          </Box>

          <List>
            <Link
              to="/home/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              <ListItem button key="Projects">
                <LightTooltip title="Projects" placement={tooltipPlacement}>
                  <ListItemIcon>
                    <AssessmentIcon className={classes.links} />
                  </ListItemIcon>
                </LightTooltip>
                <ListItemText primary="Projects" />
              </ListItem>
            </Link>
          </List>
          <List>
            {["My profile", "Settings"].map((text, index) => (
              <ListItem button key={text}>
                <LightTooltip title={text} placement={tooltipPlacement}>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <AccountCircleIcon className={classes.links} />
                    ) : (
                      <SettingsIcon className={classes.links} />
                    )}
                  </ListItemIcon>
                </LightTooltip>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Divider
          className={classes.dividerClasses}
          style={{ display: displays.secondDisplays, marginTop: "0px" }}
        />
        {/* -----------------------------------------Drawer Preferences Box -----------------------------------*/}
        <Box style={{ marginTop: drawerPreferencesBoxMargin }}>
          <Box
            style={{ display: displays.secondDisplays }}
            className={classes.drawerWorkSpaceTypographyBoxes}
          >
            <Typography
              variant="caption"
              color="initial"
              style={{ color: "#51cbff" }}
            >
              Preferences
            </Typography>
          </Box>
          
        </Box>
      </Box>
    </Box>
  );

  console.log("dfdkfdkfjdf");

  return (
    <>
      <ThemeProvider theme={breakPointsTheme}>
        {/* className={classes.fullDrawerComponent} */}
        <Box sx={{ display: "flex" }} className="sidebar-drawer">
          <CssBaseline />
          {/* -------------------------------------AppBar--------------------------------------------- */}

          {/* ---------------------------------------------------Drawer-------------------------------------------- */}

          <DrawerOld
            hideBackdrop={false}
            variant="permanent"
            open={open}
            className={classes.drawer}
          >
            {list("left")}
          </DrawerOld>

          {/* ----------------------------------------- Compoents-------------------- */}

          <Main open={open}>
            {!isProjectDashboard ? <DrawerHeader /> : <React.Fragment />}
            {
              <Child
                isSignedIn={isSignedIn}
                isEmailVerified={isEmailVerified}
              />
            }
          </Main>
        </Box>
      </ThemeProvider>
    </>
  );
}

const mapStateToProps = (state) => {
  console.log("state.fireStore", state.firestore);
  return {
    themeRed: state.themeRed,
    allProjects: state.firestore.ordered.Projects,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    // setCurrentProjectId: (proid) => dispatch(setCurrentProjectId(proid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LaptopDrawer);
