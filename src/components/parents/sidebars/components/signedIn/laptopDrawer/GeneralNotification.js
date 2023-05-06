import React from 'react'
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import Card from '@mui/material/Card';
import { Avatar } from "@mui/material";
import { connect } from 'react-redux';
import { useState } from 'react';
import NotificationViewer from '../../../../../cidgets/NotificationViewer';
import SimpleDialogBox from '../../../../../cidgets/SimpleDialogBox';

const GeneralNotification = (props) => {
    const [openNotifs, setOpenNotifs] = useState(false);

    const handleNotifsOpen = () => {
        setOpenNotifs(true);
    };

    const handleNotifsClose = () => {
        setOpenNotifs(false);
    };

    const calculateRead = () => {
        let counter = 0
        Object.values(props?.genNotifs ?? []).forEach((e) => {
            const readList = 'readList' in e ? e.readList : []
            if (!readList.includes(props.userData.uid)) {
                counter += 1
            }
        })

        return counter
    }

    return (
        <>
            <SimpleDialogBox
                open={openNotifs}
                onClose={handleNotifsClose}
                title="Notifications"
                cancelText="Close"
                bodyWidget={
                    <NotificationViewer notifs={props.genNotifs} />
                }
                width='600'
            />

            <IconButton
                size="small"
                aria-label="show new notifications"
                sx={{ backgroundColor: 'tranparent', color: 'black', padding: '10px', marginInline: '8px' }}
                onClick={handleNotifsOpen}
            >
                <Badge
                    badgeContent={calculateRead()}
                    // variant="dot"
                    color="error"
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    max={9}>
                    <NotificationsNoneOutlinedIcon sx={{ color: 'black' }} />
                </Badge>

            </IconButton>
        </>
    )
}
const mapStateToProps = (state, ownProps) => {
    const { proid } = ownProps;
    return {
        genNotifs: state.firestore.ordered.GenNotifs,
        userData: state.firebase.profile,
    };
};
export default connect(mapStateToProps)(GeneralNotification);