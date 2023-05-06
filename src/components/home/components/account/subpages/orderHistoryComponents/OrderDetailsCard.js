import { Button, Card, CircularProgress, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import SimpleDialogBox from "../../../../../cidgets/SimpleDialogBox";
import { useState } from "react";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const OrderDetailsCard = (props) => {
    const { orderDetails } = props

    const handleClick = () => {
        handleOpenDialog()
    }

    const generateInvoice = () => {
        console.table(orderDetails)
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

    const { itemName, date } = orderDetails;

    const isInvoiceGenerating = false
    return (
        <>
            {/* dialog widget */}
            <SimpleDialogBox
                open={openDialog}
                onClose={handleCloseDialog}
                title={itemName}
                width={800}
                bodyWidget={
                    <>
                        Viewing details of {JSON.stringify(orderDetails)}
                    </>
                }
                showPositive
                positiveButtonWidget={
                    isInvoiceGenerating === true ?
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
                                <CircularProgress variant="indeterminate" size={15} sx={{ color: 'white' }} /><span style={{ paddingLeft: '15px' }}>Generating invoice</span>
                            </Button>
                        </> :
                        <Button variant="contained"
                            disabled={orderDetails === undefined ? true : false}
                            sx={{
                                marginInline: '2px',
                                textTransform: 'initial',
                                backgroundColor: '#1b1c1a', ':hover': {
                                    backgroundColor: '#1b1c1a'
                                },
                            }} onClick={generateInvoice}>Generate invoice</Button>
                }
            />

            <Card sx={cardStyle} elevation={0}>
                <ListItem
                    dense
                    disablePadding
                    secondaryAction={
                        <ListItemIcon title={""}>
                            <IconButton onClick={() => { handleClick(orderDetails) }}>
                                <ChevronRightIcon />
                            </IconButton>
                        </ListItemIcon>
                    }
                >
                    <ListItemButton
                        sx={{ paddingBlock: '8px', }}
                        onClick={() => { handleClick(orderDetails) }}
                    >
                        <ListItemText
                            primary={
                                <>
                                    <Typography
                                        variant="p"
                                        sx={{ fontWeight: 'bold' }}
                                    >{itemName}
                                    </Typography>
                                </>
                            }
                            secondary={
                                <span>{date}</span>
                                // <span style={{}}>{ago} — <span style={{ fontColor: 'gray' }}>{message}</span></span>
                            }
                        />


                    </ListItemButton>
                </ListItem>
            </Card>
        </>
    )
}

export default OrderDetailsCard;