import { Box, Container, Toolbar, Typography } from "@mui/material";
import PRIVACY from './data/privacy.json'
import RenderUI from "../cidgets/render/RenderUI";

const Privacy = () => {
    const privacy = PRIVACY.info
    return (
        <>
        <Toolbar/>
            <Container>
                <Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>
                    Privacy Policy
                </Typography>
                <Typography variant="p" sx={{fontSize: '16px', fontWeight: 'normal'}}>
                    Effective Date: {PRIVACY.date}
                </Typography>

                <Box height="20px">

                </Box>
                <RenderUI data={privacy}/>
            </Container>
        </>
    );
}

export default Privacy;