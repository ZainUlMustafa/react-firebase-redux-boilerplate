import { CircularProgress, Typography } from "@mui/material";

const CustomProgress = ({ color = '#1F0851', size = 30, centerInLayout = false, text=null, fontSize=15 }) => {
    const divStyle = centerInLayout ? {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'

    } : {}
    return (
        <>
            <div style={{textAlign: 'center'}}>
                <CircularProgress style={divStyle} sx={{ color: color }} size={size} />
                {text === null ? <></> : <Typography sx={{margin: '20px', fontSize: fontSize}}>{text}...</Typography>}
            </div>

        </>
    );
}

export default CustomProgress;