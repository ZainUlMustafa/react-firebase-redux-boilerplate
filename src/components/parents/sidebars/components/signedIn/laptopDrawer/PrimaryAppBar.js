import React, { useRef } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ProfileInfo from "./ProfileInfo";
import { useLocation } from "react-router-dom";
import newlogo from "../../../../../../assets/logo/logo.jpeg";


const PrimaryAppBar = (props) => {
  const location = useLocation();
  const locationPath = location.pathname;

  const appBarRef = useRef(null);

  const { Child, isSignedIn, isEmailVerified, themeRed, proid, companyData } = props;
  const { themeColor, appTitle } = themeRed;
  return (
    <>
      <AppBar ref={appBarRef}
        elevation={1}
        position="fixed"
        sx={{
          backgroundColor: "white",
          color: themeColor,
          display: {
            xs: locationPath === `/home/pr/${proid}` || locationPath === `/a/verify` ? "none" : "flex",
            sm: locationPath === `/home/pr/${proid}` || locationPath === `/a/verify` ? "none" : "flex",
            md: locationPath === `/home/pr/${proid}` || locationPath === `/a/verify` ? "none" : "flex",
            lg: locationPath === `/home/pr/${proid}` || locationPath === `/a/verify` ? "none" : "flex",
          }
        }}
        component="nav"
      >
        <Toolbar>
          <img
            style={{ marginRight: '16px' }}
            src={newlogo}
            alt="logo"
            width="40px"
            height="auto"
          />
          {/* </IconButton> */}
          <Link
            to="/home/dashboard"
            style={{ textDecoration: "none", color: "white" }}
          >
            <Typography
              variant="p"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, color: '#1e1e1e', fontSize: '18px', fontWeight: 'bold' }}
            >
              {appTitle}
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          
          <ProfileInfo />
        </Toolbar>
      </AppBar>

      <Box component="main" >
        <Child isSignedIn={isSignedIn} isEmailVerified={isEmailVerified} appBarHeight={appBarRef?.current?.clientHeight} />
      </Box>
    </>

  );
}
const mapStateToProps = (state) => {
  return {
    companyData: state.firestore.data.Company,
  };
};


export default connect(mapStateToProps)(PrimaryAppBar);