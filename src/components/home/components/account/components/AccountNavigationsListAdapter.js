import { List } from "@mui/material";
import navigationMap from './navigationMap.json'
import AccountNavigationItem from "./AccountNavigationItem";
import { Divider, Grid } from "@mui/material";
import { Typography } from '@mui/material';

const AccountNavigationsListAdapter = (props) => {
    const { handleNavigationSelection } = props

    const needToAttachCard = false;
    const navigationObjectList = Object.values(navigationMap.navigations)
    const navigationList = !needToAttachCard ? navigationObjectList.filter((eachNavigationItem) => eachNavigationItem.key !== '4') : navigationObjectList.filter((eachNavigationItem) => eachNavigationItem.key === '4')

    return (
        <div style={{ padding: '15px 20px' }}>
                
            <Typography variant="h5" style={{ fontWeight: '650', fontSize: "17px", marginBottom: '5px'}}>
                    Account settings
                </Typography>

            <Divider />
            <List disablePadding>
                {navigationList.map((eachNavigationItem, i) => {
                    return <AccountNavigationItem key={eachNavigationItem.key} navigationItem={eachNavigationItem} handleNavigationSelection={handleNavigationSelection} />
                })}
            </List>
        </div>
    );
}

export default AccountNavigationsListAdapter;