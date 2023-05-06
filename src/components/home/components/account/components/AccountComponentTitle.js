import { Typography } from '@mui/material';
import navigationMap from './navigationMap.json'

const AccountComponentTitle = (props) => {
    const { currentNavKey } = props;
    const navigationObject = navigationMap.navigations[currentNavKey]
    return (
        <>
            <Typography variant="h5" style={{ fontWeight: '650', fontSize: "17px" }}>
                {navigationObject.name}
            </Typography>
            <Typography variant="body2" style={{ fontColor: 'gray' }}>
                {navigationObject.desc}
            </Typography>
        </>
    );
}

export default AccountComponentTitle;