import { Button, Card, Chip, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import DateParser from "../../helpers/DateParser";
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useGenerateSignedUrl } from "../../chooks/useGenerateSignedUrl";
import { connect } from "react-redux";
import CircleIcon from '@mui/icons-material/Circle';

const NotificationViewer = (props) => {
    const { notifs = [], addUserToNotificationDocument, userData } = props
    // console.log(userData);
    return (
        <List disablePadding>
            {notifs.map((e) => {
                return <NotificationCard notif={e} key={e.id} userData={userData} addUserToNotificationDocument={addUserToNotificationDocument} />
            })}
        </List>
    );
}

const NotificationCard = (props) => {
    const { notif } = props;
    const { status, error, data } = useGenerateSignedUrl(notif.privateStorageRef)
    // console.log(data, status, error, 'useGenerateSignedUrl')
    const isFetched = status === 'fetched'

    const alertWidgetsMap = {
        "0": {
            "title": "General",
            "widget": <NotificationsNoneIcon />,
        },
        "1": {
            "title": "Error",
            "widget": <ReportGmailerrorredIcon />,
        },
        "2": {
            "title": "Warning",
            "widget": <WarningAmberIcon />,
        },
    }

    const openTab = (link) => {
        window.open(link);
    }

    const handleClick = (notif) => {
        const { title, message, link = "", coid = "", proid = "", uid, dateCreated, dataCreated, alertStatus, privateStorageRef = "", id } = notif
        
        if (privateStorageRef.length > 0) {
            if (isFetched) {
                return openTab(data)
            } else {
                return alert('Loading...')
            }
        }
        if (link.length > 0) {
            return openTab(link)
        }
    }

    const cardStyle = {
        "border": "0.5px solid grey",
        "borderRadius": "8px",
        "backgroundColor": '#fafafa',
        "marginBlock": '10px',
        
    }

    const { title, message, link = "", coid = "", proid = "", uid, dateCreated, dataCreated, alertStatus, privateStorageRef = "" } = notif
    const parsedDate = DateParser(dateCreated, 0)
    const ago = DateParser(dateCreated, 1)

    return <Card sx={cardStyle} elevation={0}>
        <ListItem
            dense
            disablePadding
            // sx={{ paddingBlock: '5px' }}
        >
            <ListItemButton
            sx={{paddingBlock: '8px',}}
                onClick={() => { handleClick(notif) }}
            >
                {/* <ListItemIcon title={alertWidgetsMap[alertStatus].title}>
                    {alertWidgetsMap[alertStatus].widget}
                </ListItemIcon> */}
                <ListItemText
                    primary={
                        <>
                            {(notif?.readList ?? []).includes(props.userData.uid) ? <></> : <CircleIcon sx={{ color: 'green', fontSize: '10px', marginRight: '5px' }} />}
                            {notif.testNotification ? <Chip label="Dev" size="small" sx={{ fontSize: '10px', marginRight: '8px', paddingInline: '5px', paddingBlock: '0px' }} /> : <></>}

                            <Typography
                                variant="p"
                                sx={{ fontWeight: 'bold' }}
                            >{title}</Typography>
                        </>
                    }
                    secondary={
                        <span style={{}}>{ago} — <span style={{ fontColor: 'gray' }}>{message}</span></span>
                    }
                />
                
            </ListItemButton>
        </ListItem>
    </Card>
}

const mapStateToProps = (state, ownProps) => {
    // console.log(state)
    return {
        userData: state.firebase.profile,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationViewer);