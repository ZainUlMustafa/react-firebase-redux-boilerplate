import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Tooltip, Typography } from "@mui/material";
import { useRef } from "react";
import ControlChip from "./ControlChip";
import { HotKeys, GlobalHotKeys } from "react-hotkeys";

const SimpleDialogBox = ({ width = 500, minWidth = 400, onClose, onPositive = ((dataMap) => { }), showPositive = false, open = false, title = "", desc = null, bodyWidget = <></>, cancelText = "Cancel", positiveText = "Positive", positiveButtonWidget = null, titleWidget = null, shouldTitleAppear = true, showCancelShortcutOnLeft = false, showShortcut = false }) => {
    const dialogRef = useRef(null)

    const handleClose = () => {
        if (onClose) {
            onClose();
        }
    };

    const handlePositive = (e) => {
        if (showPositive) {
            onPositive(e);
        }
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

    const keyMap = {
        CLOSE: { name: "Close", sequences: ["esc"] },
    };

    const handlers = preventDefaultHandlers({
        CLOSE: handleClose,
    });

    // console.log(dialogRef?.current)
    return (
        <>
            <GlobalHotKeys keyMap={keyMap} handlers={handlers}></GlobalHotKeys>
            <Dialog ref={dialogRef} onClose={handleClose} open={open}
                PaperProps={{
                    style: { borderRadius: '15px', background: 'rgba(255,255,255,0.95)', outline: '0px solid white', backdropFilter: 'blur(10px)' }
                }}
                sx={{
                    "& .MuiDialog-container": {
                        "& .MuiPaper-root": {
                            width: '100%', maxWidth: `${width}px`
                        },
                    },
                }}
            >
                {shouldTitleAppear ? <><DialogTitle sx={{ fontWeight: 'bold', fontSize: '17px', backgroundColor: '' }}>
                    {titleWidget !== null ? { titleWidget } : <>{title}</>}
                </DialogTitle>
                    <Divider light />
                </> : <></>
                }
                {/* The padding added below is default padding of dialog content. Just kept here to keep it constant. ~Aamir Vakeel */}
                <DialogContent sx={{ backgroundColor: '', padding: '20px 24px' }}>
                    {desc ? <DialogContentText sx={{ marginBottom: '10px' }}>
                        {desc}
                    </DialogContentText> : <></>}
                    <div style={{ backgroundColor: '' }}>
                        {bodyWidget}
                    </div>
                </DialogContent>
                <Divider light />
                <DialogActions sx={{ padding: '16px 24px', backgroundColor: '' }}>
                    <Button onClick={handleClose} sx={{
                        color: 'black',
                        textTransform: 'initial'
                    }}>

                        {showShortcut ? showCancelShortcutOnLeft ?
                            <>
                                <ControlChip showControlCommand={false} text="Or press esc" size={8} />
                                <span style={{ marginLeft: '8px' }}>{cancelText}</span>

                            </> :
                            <>
                                <span style={{ marginRight: '8px' }}>{cancelText}</span>
                                <ControlChip showControlCommand={false} text="Or press esc" size={8} />
                            </>
                            : <>
                                <Tooltip title="Or press escape to close" arrow placement="left"><span>{cancelText}</span></Tooltip>
                            </>
                        }


                    </Button>
                    {!showPositive ? <></> : positiveButtonWidget ? positiveButtonWidget : <Button variant="contained" sx={{
                        textTransform: 'initial',
                        marginInline: '2px',
                        backgroundColor: '#1b1c1a', ':hover': {
                            backgroundColor: '#1b1c1a'
                        },
                    }} onClick={handlePositive}>{positiveText}</Button>}
                </DialogActions>
            </Dialog >
        </>
    );
}

export default SimpleDialogBox