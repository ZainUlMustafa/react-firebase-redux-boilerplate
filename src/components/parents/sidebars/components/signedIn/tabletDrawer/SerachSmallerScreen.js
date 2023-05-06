import React, { useState } from 'react'
import { createTheme, ThemeProvider } from "@mui/material/styles";
import * as ROUTES from '../../../../../../constants/routes';
import moment from 'moment';
// import { setCurrentProjectId } from '../../../../../../store/actions/projectActions'
import { Link } from "react-router-dom";
import { Box, Button, Paper, InputBase, IconButton, Menu, Stack, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import Divider from "@mui/material/Divider";
import { connect } from "react-redux";
import { signOut } from '../../../../../../store/actions/authActions';
import { useMediaQuery } from '@mui/material';

const tabletSearchBarTheme = createTheme({
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




const SerachSmallerScreen = (props) => {
    const { isSignedIn, isEmailVerified, allProjects } = props;


    const screenSize550 = useMediaQuery("(min-width:550px)")
    const screenSize444 = useMediaQuery("(min-width:444px)")
    const screenSize348 = useMediaQuery("(min-width:348px)")
    console.log('screenSize348-------=-==->', screenSize348)
    let searchModalWidth = '100%'
    let searchDisplay = 'row'
    let linkMargin = '130px'

    if (!screenSize550) {
        searchModalWidth = '24rem'

    }
    if (!screenSize444) {
        searchModalWidth = '18rem'
        searchDisplay = 'column'
        linkMargin = '0'
    }
    if (!screenSize348) {
        searchModalWidth = '16rem'
        linkMargin = '0'
    }



    const styles = {
        dashBoardBtn: {
            backgroundColor: '#1f0851',
            padding: `7px 13px`,
            color: 'white',
            borderRadius: '4',
            boxShadow: "2px 2x 2px 2px rgba(0,0,0,0.5)",
            textTransform: 'capitalize',
            textDecoration: 'none',
        },
        inputBaseBox: {
            width: "32rem",
            paddingLeft: '24px'
        },
        inputBase: {
            borderRadius: 16,
            width: searchModalWidth
        },
        projectsMainBox: {
            marginTop: "45px",
            marginLeft:25
        },
        projectsMinBox: {
            display: 'flex',
            flexDirection: searchDisplay,
        },
        linkStyle: {
            textDecoration: 'none',
            marginLeft: linkMargin
        }
    }


    const [projectTitleToFilter, setProjectTitleToFilter] = useState('')
    const handleChange = (e) => {
        setProjectTitleToFilter(e.target.value)
        console.log('e.target', e.target.value)
    }

    const checkValidSearch = () => {
        return (projectTitleToFilter === "" || projectTitleToFilter.startsWith(" ")) === false;
    }


    const filterBySearch = (s) => {
        // console.log('s', s)
        var sProjectTitle = `${s.name}`;
        return sProjectTitle.toLowerCase().startsWith(projectTitleToFilter.toLowerCase());

    }

    const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
    const searchOpen = Boolean(searchAnchorEl);

    // const handleSearchClick = () => {
    //   setSearchAnchorEl();
    // };
    const handleSearchClick = (event) => {
        setSearchAnchorEl(event.currentTarget);
    };
    const handleSearchClose = () => {
        setSearchAnchorEl(null);
    };

    return (
        <>
            {/* --------------------------------------------------Search Bar----------------------------------------- */}
            <Box style={{ margin: '0 auto 30px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ThemeProvider theme={tabletSearchBarTheme}>
                    <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30rem' }}
                    >
                        <InputBase
                            sx={{ ml: 0, flex: 1 }}
                            placeholder="Search a project"
                            inputProps={{ 'aria-label': 'Search a project' }}
                            onClick={handleSearchClick}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <IconButton sx={{ p: '10px' }} aria-label="search" >
                            <SearchIcon />
                        </IconButton>
                    </Paper>
                </ThemeProvider>
            </Box>


            {/* -----------------------------------------Search  Modal----------------------------------------- */}
            <ThemeProvider theme={tabletSearchBarTheme}>
                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={searchAnchorEl}
                    open={searchOpen}
                    onClose={handleSearchClose}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                    }}
                >
                    <Box style={styles.inputBaseBox} >
                        <ThemeProvider theme={tabletSearchBarTheme}>
                            <InputBase
                                sx={{ ml: 0, flex: 1 }}
                                placeholder="Search a project"
                                inputProps={{ 'aria-label': 'Search a project' }}
                                id='projectTitleToFilter'
                                onChange={handleChange}
                                style={styles.inputBase}
                            />
                        </ThemeProvider>
                    </Box>

                    <Box style={styles.projectsMainBox}>
                        <Stack direction="column" spacing={5}>
                            {
                                allProjects && allProjects.filter(filterBySearch).slice(0, 3).map((eachProject) => {
                                    var parsedDate = new Date(eachProject.dateCreated ? eachProject.dateCreated.seconds + eachProject.dateCreated.nanoseconds * 10 ** -9 : '');
                                    var date = moment(parsedDate * 1000).format('dddd, MMMM Do, YYYY');
                                    return (
                                        <Box style={styles.projectsMinBox}>
                                            <Box>
                                                <Typography variant="subtitle1" style={{ color: "#3e3e3e" }} >
                                                    {eachProject.name}
                                                </Typography>
                                                <Typography variant="subtitle2" style={{ color: "#999999" }} >
                                                    Created on {date}
                                                </Typography>
                                            </Box>
                                            <Link style={styles.linkStyle} to={`/home/${ROUTES.HOME_PROJECT}/${eachProject.proid}`}
                                                // onClick={() => { props.setCurrentProjectId(eachProject.proid); handleSearchClose() }}>
                                                 onClick={handleSearchClose}>
                                                <Button style={styles.dashBoardBtn}>
                                                    Dashboard
                                                </Button>
                                            </Link>
                                        </Box>
                                    )
                                })
                            }
                        </Stack>
                    </Box>
                </Menu>
            </ThemeProvider>
        </>
    )
}



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

export default connect(mapStateToProps, mapDispatchToProps)(SerachSmallerScreen);