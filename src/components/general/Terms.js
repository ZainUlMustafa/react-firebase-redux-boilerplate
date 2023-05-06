import { Box, Container, Toolbar, Typography } from "@mui/material";
import TERMS from './data/terms.json'
import RenderUI from "../cidgets/render/RenderUI";

const Terms = () => {
    const terms = TERMS.info
    return (
        <>
        <Toolbar/>
            <Container>
                <Typography variant="h2" sx={{fontSize: '20px', fontWeight: 'bold'}}>
                    Terms and Conditions
                </Typography>
                <Typography variant="p" sx={{fontSize: '16px', fontWeight: 'normal'}}>
                    Effective Date: {TERMS.date}
                </Typography>

                <Box height="20px">

                </Box>
                <RenderUI data={terms}/>
            </Container>
        </>
    );
}

export default Terms;