import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Logo from "../../../../../assets/logo/logo.jpeg";
import { makeStyles } from "@material-ui/core";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Navigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import { List } from "@material-ui/core";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DrawerLogo from "../../../../../assets/logo/logo.jpeg";
import HomeIcon from "@mui/icons-material/Home";
import WorkIcon from "@mui/icons-material/Work";
import PriceChangeIcon from "@mui/icons-material/PriceChange";
import LoginIcon from "@mui/icons-material/Login";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginModal1 from "../../../auth/modals/LoginModal1";
import logo from "../../../../../assets/logo/logo.jpeg";
import newlogo from "../../../../../assets/logo/logo.jpeg";


const useStyles = makeStyles({
  logo: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: "40px",
    height: "40px",
    // color: "white",
    // marginLeft: "5px",
  },
  // --------------drawer styles
  drawer: {
    //   backgroundColor: "purple",
    position: "absolute",
  },
  drawerBox: {
    backgroundColor: "black",
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
  drawerRouterLink: {
    textDecoration: "none",
    color: "white",
  },
});

// ----------------------------------------------------------------------SignedOut component

const SignedOutDrawer = (props) => {
  const { Child, isSignedIn, isEmailVerified } = props;

  const [height, setHeight] = useState(0);

  const appBarRef = useCallback(node => {
    if (node !== null) {
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  const styles = {
    appBar: {
      backgroundColor: "#fafafa",
    },
    centerLinks: {
      color: "black",
      textDecoration: "none",
      cursor: "pointer",
      marginLeft: "50px",
    },
    rightLinks: {
      color: "black",
      textDecoration: "none",
      cursor: "pointer",
      marginRight: "30px",
      padding: "8px",
    },
    loginLinks: {
      color: "black",
      textDecoration: "none",
      cursor: "pointer",
      marginRight: "30px",
      padding: "8px",
      borderRadius: "4px",
    },
  };

  return (
    <>
      <AppBar position="sticky" style={styles.appBar} ref={appBarRef} elevation={0}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                // backgroundColor: "#EFF2FF",
                width: "70px",
                height: "70px",
                textAlign: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link to="/" style={{ textDecoration: "none" }}>
                <img
                  src={newlogo}
                  alt="DeepRoad"
                  style={{
                    width: "50px",
                    height: "auto",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />{" "}
              </Link>
            </Box>

            <Box
              sx={{
                flexGrow: 1,
                display: { xs: "flex", md: "flex" },
                margin: { xs: '0px', md: "0 80px" },
              }}
            >
              <Typography variant="body1" color="initial">
                <Link to="/" style={styles.centerLinks}>
                  Home
                </Link>
              </Typography>

              <Typography
                variant="body1" color="initial"
                sx={{ display: { xs: "flex", md: "none" } }}
              >
                <Link
                  to="/a/register"
                  style={styles.centerLinks}
                >
                  Register
                </Link>
              </Typography>
              <Typography
                sx={{ display: { xs: "flex", md: "none" } }}
                variant="body1"
                color="initial"
              >
                <Link
                  to="/a/login"
                  style={styles.centerLinks}
                >
                  Login
                </Link>
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}>
              <Typography
                variant="body1"
                color="initial"
                style={styles.rightLinks}
              >
                <Link
                  to="/a/register"
                  style={{
                    color: "black",
                    textTransform: "none",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
              </Typography>
              <Typography
                variant="body1"
                color="initial"
                style={styles.loginLinks}
              >
                <Link
                  to="/a/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  Login
                </Link>
              </Typography>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* -------------------------Component--------------------- */}
      {/* <Box style={{ marginTop: "-120px" }}> */}
      <>
        {/* <Toolbar /> */}
        {<Child isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeightSignedOut={height} />}
      </>

      {/* </Box> */}
    </>
  );
};

export default SignedOutDrawer;
