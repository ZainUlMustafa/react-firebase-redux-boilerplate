import { Box, Card, CardContent, Container, Grid, InputBase, List, ListItem, ListItemButton, ListItemText, Tooltip, Typography } from "@mui/material";
import { useState } from "react";
import DateParser from "../../helpers/DateParser";
import CustomTooltip from "./CustomTooltip";
import { useNavigate } from "react-router-dom";

import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import { connect } from "react-redux";

const FindEverything = (props) => {
    const { allProjects = [], handleSearchClose, userData, charges } = props;
    const navigate = useNavigate()
    const [projectTitleToFilter, setProjectTitleToFilter] = useState("");

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

    const cardStyle = {
        "border": "0.5px solid grey",
        "borderRadius": "8px",
        "backgroundColor": '#fff',
        // "marginBlock": '10px',
    }

    const cardLightStyle = {
        "border": "0.5px solid grey",
        // border: '1px solid #e1e3e2',
        "borderRadius": "5px",
        "paddingInline": "15px",
        "paddingBlock": '5px',
        "backgroundColor": '#fff',
    }

    const handleClick = (route) => {
        navigate(route);
        handleSearchClose()
    }

    const handleChange = (e) => {
        setProjectTitleToFilter(e.target.value);
        console.log("e.target", e.target.value);
    };

    const internalPages = [
        {
            name: 'Home',
            link: '/home',
            icon: <HomeOutlinedIcon />,
            desc: 'Go to home to view all your projects.',
            disabledForDemo: false,
        },
        {
            name: 'Account',
            link: '/home/account',
            icon: <ManageAccountsOutlinedIcon />,
            desc: 'Manage your account and orders.',
            disabledForDemo: false,
        },
        {
            name: 'Tips & tricks',
            link: '/p/manual',
            icon: <TipsAndUpdatesOutlinedIcon />,
            desc: 'Get up to speed with DeepRoad quicker.',
            disabledForDemo: false,
        },
        {
            name: 'Support',
            link: '/p/contact',
            icon: <ContactSupportOutlinedIcon />,
            desc: 'Got stuck? Contact us and let us help you out.',
            disabledForDemo: true,
        },
    ]


    const isDemoAccount = userData?.uid === charges?.demoAccount
    // console.log(userData, isDemoAccount)
    return <>

        <Card sx={cardLightStyle} elevation={0}>
            <InputBase
                sx={{ width: '100%', input: { "&::placeholder": { fontSize: '15px' }, } }}
                placeholder="Find anything..."
                // inputProps={{ 'aria-label': 'Search a project' }}
                id='projectTitleToFilter'
                onChange={handleChange}
                autoFocus={true}
            />
        </Card>
        <List disablePadding sx={{ marginTop: '17px' }}>
            {allProjects?.filter(filterBySearch).slice(0, 3).map((eachProject) => {
                const parsedDate = DateParser(eachProject.dateCreated, 0)
                const ago = DateParser(eachProject.dateCreated, 1)
                return <Card key={eachProject.id} sx={{ marginBlock: '10px', ...cardStyle }} elevation={0}>
                    <ListItem
                        dense
                        disablePadding
                        sx={{ paddingBlock: '0px' }}
                        secondaryAction={
                            <CustomTooltip
                                placement="right"
                                title={
                                    <Card elevation={0} sx={{ backgroundColor: 'transparent' }}>

                                        
                                        <img src={eachProject.thumbnail} style={{ marginTop: '10px' }} width='100%' alt="" />

                                    </Card>
                                }
                                widget={
                                    <Card elevation={0}>
                                        <img src={eachProject.thumbnail} width='60px' alt="" />
                                    </Card>
                                }
                            />
                        }
                    >
                        <ListItemButton

                            sx={{ paddingBlock: '10px' }}
                            onClick={() => { handleClick(`/home/pr/${eachProject.proid}`) }}
                        >
                            {/* <ListItemIcon title={alertWidgetsMap[alertStatus].title}>
                        {alertWidgetsMap[alertStatus].widget}
                    </ListItemIcon> */}
                            <ListItemText
                                primary={
                                    <>
                                        <Typography
                                            variant="p"
                                            sx={{ fontWeight: 'bold' }}
                                        >{eachProject.projectTitle}
                                        </Typography>
                                    </>
                                }
                                secondary={
                                    <span style={{}}>{parsedDate} — <span style={{ fontColor: 'gray' }}><i>{ago}</i></span></span>
                                }
                            />

                        </ListItemButton>
                    </ListItem>
                </Card>
            })}
        </List>
        <Grid container columnSpacing={1} rowSpacing={0} sx={{ marginTop: '17px' }}>
            {internalPages.map((e, i) => {
                return <Grid key={i} item xs={6} sm={3}>
                    <Box sx={{}}>
                        <Card sx={cardStyle} elevation={0} >
                            <ListItem
                                dense
                                disablePadding

                            // sx={{textAlign:'center'}}
                            >
                                <Tooltip title={e.disabledForDemo && isDemoAccount ? "This feature is disabled in the demo account." : e.desc} arrow>
                                    <ListItemButton
                                        disabled={e.disabledForDemo && isDemoAccount}
                                        sx={{ textAlign: 'center', paddingBlock: '10px' }}
                                        onClick={() => { handleClick(e.link) }}

                                    >
                                        <ListItemText
                                            primary={
                                                <span style={{ color: '#1e1e1e', fontSize: '20px' }}>{e.icon}</span>
                                            }
                                            secondary={
                                                <Typography
                                                    variant="p"
                                                    sx={{ fontWeight: 'bold', fontSize: '13px' }}
                                                >{e.name}
                                                </Typography>
                                            }
                                        />
                                    </ListItemButton>
                                </Tooltip>
                            </ListItem>
                        </Card>
                    </Box>
                </Grid>
            })}
        </Grid>
    </>
}

const mapStateToProps = (state) => {
    return {
        userData: state.firebase.profile,
        charges: state.firestore.data.Charges,
    }
}

export default connect(mapStateToProps)(FindEverything);
