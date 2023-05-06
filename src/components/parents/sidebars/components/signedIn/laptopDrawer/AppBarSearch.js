import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { connect } from "react-redux";
import ControlChip from '../../../../../cidgets/ControlChip';
import SimpleDialogBox from '../../../../../cidgets/SimpleDialogBox';
import { useEffect, useState } from 'react';
import FindEverything from '../../../../../cidgets/FindEverything';
import { HotKeys ,GlobalHotKeys } from "react-hotkeys";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(3),
        width: "auto",
    },
    cursor: "pointer",
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
        [theme.breakpoints.up("lg")]: {
            width: "50ch",
        },
        [theme.breakpoints.down("md")]: {
            width: "15ch",
        },
        [theme.breakpoints.only("md")]: {
            width: "15ch",
        },
        cursor: "pointer",
        display: "flex",
        alignItems: "start",
        justifyContent: "start",
    },
}));
// console.log("hello");
const AppBarSearch = (props) => {
    const { allProjects, themeRed } = props;
    const { themeColor } = themeRed;

    const [openSearch, setOpenSearch] = useState(false);

    const handleSearchOpen = () => {
        setOpenSearch(true);
    };

    const handleSearchClose = () => {
        setOpenSearch(false);
    };

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
    const keyShortcut = "k"
    const keyMap = {
        FINDER_MAC: "command+"+keyShortcut,
        FINDER_WIN: "ctrl+"+keyShortcut,
    };

    const handlers = preventDefaultHandlers({
        FINDER_MAC: handleSearchOpen,
        FINDER_WIN: handleSearchOpen,
    });

    // console.log(keyMap)
    return (
        <>
            <GlobalHotKeys keyMap={keyMap} handlers={handlers}></GlobalHotKeys>
            <SimpleDialogBox
                open={openSearch}
                onClose={handleSearchClose}
                title="Finder"
                shouldTitleAppear={false}
                cancelText="Close"
                bodyWidget={
                    <FindEverything allProjects={allProjects} handleSearchClose={handleSearchClose} />
                }
                width='600'
            />
            <Search
                onClick={handleSearchOpen}
                sx={{
                    display: { xs: "flex", sm: "flex", md: 'flex' },
                    alignItems: 'center',
                    justifyContent: 'start',
                    backgroundColor: '#f5f1f1',
                    border: '2px solid #e1e3e2',
                    borderRadius: '10px',

                    color: 'grey',
                    '&:hover': {
                        backgroundColor: '#ebedec',
                    },
                }}
            >
                <SearchIconWrapper>
                    <SearchIcon sx={{}} />
                </SearchIconWrapper>
                {/* <div style={{display:'inline-block',marginLeft:'50px'}}>Search</div> */}
                <StyledInputBase
                    type='button'
                    value="Find anything..."
                    onClick={handleSearchOpen}
                    placeholder="Search…"
                    sx={{ fontSize: '15px', }}
                    inputProps={{ 'aria-label': 'search' }}
                // onChange={handleChange}
                />
                <ControlChip text={keyShortcut.toUpperCase()} size={12} marginInline={2} />
            </Search>
        </ >
    );
};
const mapStateToProps = (state) => {
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

export default connect(mapStateToProps, mapDispatchToProps)(AppBarSearch)
