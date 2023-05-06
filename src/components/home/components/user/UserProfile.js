import React from 'react'
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Avatar } from "@mui/material";
import './UserProfile.scss';
import Card from '@mui/material/Card';
const UserProfile = ({ menuId, handleProfileMenuOpen, userName }) => {
    return (
        // <Card elevation={4} sx={{borderRadius:'50px',backgroundColor:'transparent'}}>
            <IconButton
                size="small"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >

                <Avatar className='avatar-background-color' sx={{ padding: '0px' }} >
                    {userName ? userName.slice(0, 1) : <Avatar />}
                </Avatar>
                {/* <AccountCircle /> */}
            </IconButton>
        // </Card>



    )
}
export default UserProfile;