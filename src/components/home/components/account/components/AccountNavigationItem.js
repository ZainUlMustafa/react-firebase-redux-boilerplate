import { ListItem, ListItemButton, ListItemText, Typography, IconButton } from "@mui/material";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const AccountNavigationItem = (props) => {
    const { handleNavigationSelection, navigationItem } = props;
    return (
        <ListItem
            dense
            disablePadding
        >
            <ListItemButton
                sx={{ paddingBlock: '8px', }}
                onClick={() => { handleNavigationSelection(navigationItem) }}
            >
                <ListItemText
                    primary={
                        <>
                            <Typography
                                variant="p"
                                sx={{ fontWeight: 'bold' }}
                            >{navigationItem.name}</Typography>
                        </>
                    }
                />

            </ListItemButton>
        </ListItem>
    );
}

export default AccountNavigationItem;