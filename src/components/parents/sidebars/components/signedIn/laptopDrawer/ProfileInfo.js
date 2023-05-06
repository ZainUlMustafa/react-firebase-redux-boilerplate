import React from "react";
import { Avatar } from "@mui/material";
import { Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { connect } from "react-redux";
import { signOut } from "../../../../../../store/actions/authActions";
import { Link } from "react-router-dom";
import * as ROUTES from "../../../../../../constants/routes";
import Divider from '@mui/material/Divider';
import Box from "@mui/material/Box";
const ProfileInfo = (props) => {
  // README: isProjectDashbaorad is passed from topbar to make avatar green.
  const { userData, themeRed,isProjectDashboard } = props;
  // console.log(userData, "u")
  const { name, email, nameInitial, uid, coid } = userData;
  const { appTitle, themeColor } = themeRed;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: isProjectDashboard?'#1b1c1a':'#1F0851',
        width: 35, height: 35,
        fontSize: 16,
      },
      children: name,
    };
  }
  return (
    <>
      {/* <Box> */}
      <IconButton onClick={handleClick} sx={{':hover': {
                      backgroundColor: 'transparent'
                    }}}>
        <Box sx={{ backgroundColor: themeColor, borderRadius: "20px",  }}>
          <Avatar {...stringAvatar(nameInitial)} />
        </Box>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "auto",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            // mt: 1.5,
            paddingInline: '10px',
            paddingBlock: '10px',
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >

        <Box sx={{ padding: '10px' }}>
          <Typography variant="h6" style={{ fontWeight: 'bold', textTransform: 'capitalize' }}>
            {name}
          </Typography>
          <div style={{ fontSize: '14px' }}>{email}</div>
          {/* <div style={{ fontSize: '14px' }}>{uid}</div>
          <div style={{ fontSize: '14px' }}>{coid}</div> */}
        </Box>

        <Divider light />
        {/* <Box sx={{ padding: '10px', '&:hover': { textDecoration: 'underline' } }}>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            to={`/home/${ROUTES.ACCOUNT}`}
          >
            <span style={{ fontSize: '16px' }}>Payments</span>
          </Link>
        </Box> */}

        {/* <Divider light /> */}
        {/* <span style={{padding: '10px'}}><b>Visualizers</b></span> */}
        {/* <Box sx={{ padding: '10px', '&:hover': { textDecoration: 'underline' } }}>
          <Link
            style={{ color: 'black', textDecoration: 'none' }}
            to={`/home/${ROUTES.SURFACE_VIZ}`}
          >
            <span style={{ fontSize: '16px' }}>Road surfaces</span>
          </Link>
        </Box> */}


        <Divider light />

        <Box sx={{ padding: '10px', color: 'darkred', fontWeight: 'bolder', cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }} onClick={() => props.signOut()}>
          Sign out
        </Box>
      </Menu>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    themeRed: state.themeRed,
    isEmailVerified: state.firebase.auth.emailVerified,
    userData: state.firebase.profile,
    userAuth: state.firebase.auth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileInfo);
