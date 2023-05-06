import { Button, Card, CircularProgress, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import SimpleDialogBox from "../../../../../cidgets/SimpleDialogBox";
import { useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const PlanDetailsCard = (props) => {
    const { PlanDetails } = props

    const handleClick = () => {
        handleOpenDialog()
    }

    const buyProduct = () => {
        console.table(PlanDetails)
    }

    const cardStyle = {
        "border": "0.5px solid grey",
        "borderRadius": "8px",
        "backgroundColor": '#fafafa',
        "marginBlock": '10px',

    }

    // DIALOG CONTROLS
    ///////////////////////////////////////////////////////////
    const [openDialog, setOpenDialog] = useState(false);

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    ////////////////////////////////////////////////////////////

    const { productName, productDescription } = PlanDetails;

    const isBuyingProduct = false
    return (
        <>
            {/* dialog widget */}
            <SimpleDialogBox
                open={openDialog}
                onClose={handleCloseDialog}
                title={productName}
                width={800}
                bodyWidget={
                    <>
                        Viewing details of {JSON.stringify(PlanDetails)}
                    </>
                }
                showPositive
                positiveButtonWidget={
                    isBuyingProduct === true ?
                        <>
                            <Button variant="contained" disabled sx={{
                                "&.Mui-disabled": {
                                    backgroundColor: '#1b1c1a',
                                    color: '#D9D9D9'
                                },
                                marginInline: '2px',
                                textTransform: 'initial',
                                color: '#1b1c1a',
                                backgroundColor: '#1b1c1a', ':hover': {
                                    backgroundColor: '#1b1c1a'
                                }
                            }} >
                                <CircularProgress variant="indeterminate" size={15} sx={{ color: 'white' }} /><span style={{ paddingLeft: '15px' }}>Buying</span>
                            </Button>
                        </> :
                        <Button variant="contained"
                            disabled={PlanDetails === undefined ? true : false}
                            sx={{
                                marginInline: '2px',
                                textTransform: 'initial',
                                backgroundColor: '#1b1c1a', ':hover': {
                                    backgroundColor: '#1b1c1a'
                                },
                            }} onClick={buyProduct}>Buy Now</Button>
                }
            />

            <Card sx={cardStyle} elevation={0}>
                <ListItem
                    dense
                    disablePadding
                    secondaryAction={
                        <ListItemIcon title={""}>
                            <IconButton onClick={() => { handleClick(PlanDetails) }}>
                                <ChevronRightIcon />
                            </IconButton>
                        </ListItemIcon>
                    }
                >
                    <ListItemButton
                        sx={{ paddingBlock: '8px', }}
                        onClick={() => { handleClick(PlanDetails) }}
                    >
                        <ListItemText
                            primary={
                                <>
                                    <Typography
                                        variant="p"
                                        sx={{ fontWeight: 'bold' }}
                                    >{productName}
                                    </Typography>
                                </>
                            }
                            secondary={
                                <span>{productDescription}</span>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </Card>
        </>
    )
}

export default PlanDetailsCard;