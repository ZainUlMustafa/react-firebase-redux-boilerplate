import { Container, Toolbar, Typography } from "@mui/material";
import LockPersonTwoToneIcon from '@mui/icons-material/LockPersonTwoTone';

const DemoAccountError = ({ isDialog = false }) => {
    if (isDialog) {
        return <Container sx={{ textAlign: 'center', padding: '10px' }}>
            <LockPersonTwoToneIcon
                sx={{
                    filter: 'invert(5%) sepia(58%) saturate(2690%) hue-rotate(221deg) brightness(93%) contrast(116%)', fontSize: '74px'
                }}
            />

            <Typography sx={{ margin: '20px' }}>
                This is a demo account. So this section is disabled!
            </Typography>
        </Container>
    }

    return (
        <>
            <Toolbar />
            <Container sx={{ textAlign: 'center', padding: { xs: '10px', sm: '20px', md: '60px', lg: '100px' } }}>
                <LockPersonTwoToneIcon
                    sx={{
                        filter: 'invert(5%) sepia(58%) saturate(2690%) hue-rotate(221deg) brightness(93%) contrast(116%)', fontSize: '74px'
                    }}
                />

                <Typography sx={{ margin: '20px' }}>
                    This is a demo account. So this section is disabled!
                </Typography>
            </Container>
        </>
    );
}

export default DemoAccountError;