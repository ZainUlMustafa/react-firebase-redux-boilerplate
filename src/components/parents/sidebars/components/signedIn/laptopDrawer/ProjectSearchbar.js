import React, { useState,forwardRef, useImperativeHandle } from "react";
import { styled, useTheme } from "@mui/material/styles";
import * as ROUTES from "../../../../../../constants/routes";
import moment from "moment";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { Button, Grid, Stack } from "@mui/material";
import { connect } from "react-redux";
// import { setCurrentProjectId } from "../../../../../../store/actions/projectActions";
import { alpha } from "@mui/material/styles";

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

const ProjectSearchbar = forwardRef((props,ref) => {
  const { Child, isSignedIn, isEmailVerified, allProjects, themeRed } = props;
  const { appTitle, themeColor } = themeRed;

  const useStyles = makeStyles({
    searchBar: {
      color: "#787878",
      borderRadius: "30px",
      display: "inline-block",
      // fontSize: "50px",
      boxShadow: "2px 2px 3px 1px rgba(23,18,18,0.17)",
    },
    searchIcon: {
      color: "#909090",
    },
    searchMenu: {
      width: "35rem",
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
  };
  //--------------------------------------------Search Menu/Modal states and functions
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(themeColor, 0.1),
    "&:hover": {
      backgroundColor: alpha(themeColor, 0.25),
    },
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
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
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "35ch",
      },
    },
  }));

  const [projectTitleToFilter, setProjectTitleToFilter] = useState("");
  const handleChange = (e) => {
    setProjectTitleToFilter(e.target.value);
    console.log("e.target", e.target.value);
  };

  const checkValidSearch = () => {
    return (
      (projectTitleToFilter === "" || projectTitleToFilter.startsWith(" ")) ===
      false
    );
  };

  const filterBySearch = (s) => {
    // console.log('s', s)
    var sProjectTitle = `${s.projectTitle}`;
    return sProjectTitle
      .toLowerCase()
      .startsWith(projectTitleToFilter.toLowerCase());
  };
  const [searchAnchorEl, setSearchAnchorEl] = React.useState(null);
  const searchOpen = Boolean(searchAnchorEl);

  const handleSearchClick = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };
  const handleSearchClose = () => {
    setSearchAnchorEl(null);
  };


  useImperativeHandle(ref,()=>({
    handleSearchCloseMobile() {
        setSearchAnchorEl(null);
    },
    handleSearchClickMobile(event){
        setSearchAnchorEl(event.currentTarget);
    }
  }))


  return (
    <>
      {/* ---------------------------Searchbar-------------------------- */}
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        <Search 
        onClick={handleSearchClick}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
      {/* -------------------------------search modal------------------------- */}
      <ThemeProvider theme={searchMenuBackgroundColorTheme}>
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
          className={classes.searchMenu}
        >
          <Box style={{ borderBottom: "1px solid black" }}>
            {/* --------------------- Search modal text field ------------------------- */}
            <InputBase
              // sx={{ ml: 3, flex: 1 }}
              placeholder="Search a project"
              inputProps={{ "aria-label": "Search a project" }}
              id="projectTitleToFilter"
              onChange={handleChange}
            />
          </Box>

          <Box style={{ marginTop: "20px" }}>
            <Stack direction="column" spacing={3}>
              {allProjects ? (
                allProjects &&
                allProjects
                  .filter(filterBySearch)
                  .slice(0, 3)
                  .map((eachProject, key) => {
                    var parsedDate = new Date(Number(eachProject.timestamp));
                    var date = moment(parsedDate).format("MMM Do, YY");
                    return (
                      <Box
                        key={key}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          paddingLeft: "20px",
                          paddingRight: "10px",
                          width: "29.5rem",
                        }}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={5} sm={5} md={6} lg={6} xl={6}>
                            <Box>
                              <Typography
                                variant="subtitle1"
                                style={{ color: "#3e3e3e" }}
                              >
                                {eachProject.projectTitle}
                              </Typography>
                              <Typography
                                variant="subtitle2"
                                style={{ color: "#999999" }}
                              >
                                Created on {date}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={3} sm={3} md={6} lg={6} xl={6}>
                            <Box sx={{ padding: "10px" }}>
                              <Typography>
                                <Link
                                  style={styles.linkStyle}
                                  to={`/home/${ROUTES.HOME_PROJECT}/${eachProject.proid}`}
                                  // onClick={() => {
                                  //   props.setCurrentProjectId(
                                  //     eachProject.proid
                                  //   );
                                  //   handleSearchClose();
                                  // }}
                                  onClick={handleSearchClose}
                                >
                                  <Button style={styles.dashBoardBtn}>
                                    Dashboard
                                  </Button>
                                </Link>
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    );
                  })
              ) : (
                <p style={{ margin: "10px" }}>No projects to search</p>
              )}
            </Stack>
          </Box>
        </Menu>
      </ThemeProvider>
    </>
  );
})

const mapStateToProps = (state) => {
  // console.log('state.fireStore', state.firestore)
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectSearchbar);
