import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import PieChartIcon from '@mui/icons-material/PieChart';
import ProjectNotification from '../../home/components/project/components/ProjectNotification';
import './Topbar.scss'
import UserProfile from '../../home/components/user/UserProfile';
import RoundedButton from '../../cidgets/buttons/RoundedButton';
import { useNavigate } from "react-router-dom";
import { Button, Fab, Paper } from '@mui/material';
import { Grid, CircularProgress } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import { connect } from "react-redux";
import { get } from "lodash";
import Card from '@mui/material/Card';
import Tooltip from "@mui/material/Tooltip";
import ArticleIcon from '@mui/icons-material/Article';
import SimpleDialogBox from '../../cidgets/SimpleDialogBox';
import { useState } from 'react';
import AssetOverviewChart from '../../home/components/project/components/AssetOverviewChart';
import NotificationViewer from '../../cidgets/NotificationViewer';
import ProfileInfo from '../sidebars/components/signedIn/laptopDrawer/ProfileInfo';
import { generateReport } from '../../../store/actions/projectActions';
import CustomProgress from '../../cidgets/CustomProgress';
import InsightsIcon from '@mui/icons-material/Insights';
import SummarizeIcon from '@mui/icons-material/Summarize';

import { GlobalHotKeys } from "react-hotkeys";
import SmartUtils from '../../../helpers/SmartUtils';
import { useEffect } from 'react';

function Topbar(props) {
  const { drProjectData, userData, detections, assetData, dataInfo, startEndLocation } = props;
  const { nameInitial } = userData;
  const { projectTitle } = drProjectData;

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // DIALOG CONTROLS
  ///////////////////////////////////////////////////////////
  const [openOverview, setOpenOverview] = useState(false);

  const handleOverviewOpen = () => {
    setOpenOverview(true);
  };

  const handleOverviewClose = () => {
    setOpenOverview(false);
  };
  ////////////////////////////////////////////////////////////

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <ProjectNotification />
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <UserProfile />
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/home`;
    navigate(path);
  };

  const handleGenReport = () => {
    if (props.project.showGenReportLoader === false) {
      props.generateReport(drProjectData.proid)
    }
  }

  const topbarSection1Width = 30;
  const topbarSection2Width = 70;
  const topbarSection3Width = 20;

  const preventDefaultHandlers = (handlers) => {
    const newHandlers = {};
    for (const [action, handler] of Object.entries(handlers)) {
      newHandlers[action] = (event) => {
        if (event) {
          event.preventDefault();
        }
        handler();
      };
    }
    return newHandlers;
  };

  const keyMap = {
    OVERVIEW_MAC: "command+p",
    OVERVIEW_WIN: "ctrl+p",
    REPORT_MAC: "command+g",
    REPORT_WIN: "ctrl+g",
  };

  const handlers = preventDefaultHandlers({
    OVERVIEW_MAC: handleOverviewOpen,
    OVERVIEW_WIN: handleOverviewOpen,
    REPORT_MAC: handleGenReport,
    REPORT_WIN: handleGenReport,
  });

  const su = new SmartUtils()
  const [os, setOs] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const data = await su._checkOS(navigator);
      setOs(data);
    }

    fetchData()
  }, [])

  const { ctrl } = su._platformKeys(os?.platform)

  // console.log(props.project)
  return (
    <>
      <GlobalHotKeys keyMap={keyMap} handlers={handlers}></GlobalHotKeys>
      <SimpleDialogBox
        open={openOverview}
        onClose={handleOverviewClose}
        title="Project overview"
        width={800}
        bodyWidget={
          <AssetOverviewChart startEndLocation={startEndLocation} detections={detections} assetData={assetData} dataInfo={dataInfo} />
        }
      />

      <Grid container spacing={2}>
        <Grid item xs={2} sm={2} md={1} lg={1} xl={1} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'transparent' }}>
          <div style={{
            borderRadius: '50%'
          }}>
            <Card sx={{
              borderRadius: '50px', backgroundColor: '#fff', '&:hover': {
                backgroundColor: '#fafafa',
              },
            }} elevation={5}>
              <IconButton aria-label="roundedBtn" style={{ backgroundColor: 'transparent', }} onClick={routeChange}>
                <KeyboardArrowLeft fontSize='large' sx={{ color: '#1E1E1E' }} />
              </IconButton>
            </Card>
          </div>
        </Grid>
        <Grid item xs={10} sm={10} md={11} lg={11} xl={11} sx={{ backgroundColor: 'transparent', borderRadius: '15px' }}>
          <Card elevation={4} sx={{ backgroundColor: '#FAFAFA', borderRadius: '15px' }}>
            <div style={{ height: '100%', width: '100%', backgroundColor: 'transparent', display: 'flex', alignItems: 'center' }}>
              <Box sx={{ display: { xs: "none", sm: "none", md: 'flex', lg: 'flex', xl: 'flex' }, width: { xs: '0%', md: `${topbarSection1Width}%` } }} style={{ height: '100%', backgroundColor: 'transparent', float: 'left', display: 'flex', alignItems: 'center' }}>
                <Tooltip title={projectTitle} placement="bottom">
                  <Typography
                    variant="body1"
                    color="initial"
                    className='font-color'
                    sx={{ paddingLeft: '20px', cursor: 'pointer', display: { xs: "none", sm: "none", md: 'flex', lg: 'flex', xl: 'flex' } }}
                  >
                    {projectTitle ? (
                      projectTitle.length > 16 ? (
                        <span>{projectTitle.slice(0, 16)}...</span>
                      ) : (
                        <span>{projectTitle}</span>
                      )
                    ) : (
                      ""
                    )}
                  </Typography>
                </Tooltip>
              </Box>
              <Box sx={{ width: { xs: `${100}%`, md: `${topbarSection2Width}%` }, justifyContent: { xs: 'space-evenly', md: 'end' } }} style={{ marginRight: { xs: '20px', sm: '20px', md: '0px' }, height: '100%', backgroundColor: 'transparent', float: 'left', display: 'flex', alignItems: 'center', }}>
                <Box sx={{ border: '1px solid #000000', borderRadius: '4px', float: 'left', display: { xs: "none", sm: "none", md: 'none', lg: "flex" }, }}>
                  <Tooltip title={`Use ${ctrl.name}${ctrl.plus}P to view`} arrow placement='bottom'>
                    <Button variant="text" size='small'
                      sx={{
                        backgroundColor: 'transparent',
                        color: '#000000', textTransform: 'initial', paddingInline: '8px',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          color: '#000000',
                        },
                      }}

                      onClick={handleOverviewOpen}>Project overview</Button>
                  </Tooltip>

                </Box>

                <Box sx={{ float: 'left', marginLeft: '15px', display: { xs: "none", sm: "none", md: 'none', lg: "flex", } }}>
                  {/* <Button
                    onClick={handleGenReport}
                    variant='contained'
                    size="small"
                    style={{
                      paddingInline: '10px',
                      backgroundColor: '#1b1c1a',
                      textTransform: "none",
                      color: "white",
                      cursor: 'pointer',
                      textTransform: 'initial'
                    }}>Generate report
                  </Button> */}
                  {
                    props.project.showGenReportLoader === true ?
                      <>
                        <Button variant="contained" size="small" disabled sx={{
                          "&.Mui-disabled": {
                            backgroundColor: '#1b1c1a',
                            color: '#D9D9D9'
                          },
                          marginInline: '10px',
                          textTransform: 'initial',
                          color: '#1b1c1a',
                          backgroundColor: '#1b1c1a', ':hover': {
                            backgroundColor: '#1b1c1a'
                          }
                        }} >
                          <CircularProgress variant="indeterminate" size={15} sx={{ color: 'white' }} /><span style={{ paddingLeft: '15px' }}>Generating...</span>
                        </Button>
                      </> :
                      <Tooltip title={`Use ${ctrl.name}${ctrl.plus}G to generate report`} arrow placement='bottom'>
                        <Button variant="contained" size="small" sx={{
                          marginInline: '10px',
                          textTransform: 'initial',
                          backgroundColor: '#1b1c1a', ':hover': {
                            backgroundColor: '#1b1c1a'
                          },
                        }} onClick={handleGenReport}>Generate report</Button>
                      </Tooltip>
                  }
                </Box>

                <Stack direction="row" spacing={0}>
                  <IconButton sx={{
                    backgroundColor: 'tranparent', color: 'black',
                    display: { xs: "flex", sm: "flex", md: 'flex', lg: "none" }, marginRight: '10px',
                    '&:hover': {
                      backgroundColor: 'transparent',
                    },
                  }} onClick={handleOverviewOpen}>
                    <InsightsIcon />
                  </IconButton>

                  {props.project.showGenReportLoader === true ? <Box sx={{ display: { xs: "flex", sm: "flex", md: 'flex', lg: 'none', alignItems: 'center' } }}><CustomProgress size={20} /></Box> : <IconButton onClick={handleGenReport} sx={{
                    backgroundColor: 'tranparent', color: 'black', ':hover': {
                      backgroundColor: 'transparent'
                    },
                    display: { xs: "flex", sm: "flex", md: 'flex', lg: 'none' }
                  }}>
                    <SummarizeIcon />
                  </IconButton>}

                  <div style={{ display: "flex" }} >
                    <ProjectNotification />
                    <ProfileInfo isProjectDashboard={true} />
                    {renderMobileMenu}
                    {renderMenu}
                  </div>
                </Stack>
              </Box>
              {/* <div style={{ marginRight: '15px', height: '100%', width: `${topbarSection3Width}%`, backgroundColor: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'end', border: "solid black 2px", gap: 2 }}>
                <ProjectNotification />
                <ProfileInfo isProjectDashbaorad={true} />
                {renderMobileMenu}
                {renderMenu}
              </div> */}
            </div>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
const mapStateToProps = (state, ownProps) => {
  // const { proid } = state.project;
  const { proid } = ownProps
  return {
    project: state.project,
    projNotifs: state.firestore.ordered.ProjNotifs,
    userData: state.firebase.profile,
    drProjectData: get(
      state.firestore.data,
      `DrProject.${proid}`
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    generateReport: (proid) => dispatch(generateReport(proid)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);