import { Box, Slider } from "@mui/material"

const WaterLevel = (props) => {
    const { value, min, max } = props.waterLevel
    return (
        <>
            <Box height={200}>
                <Slider
                    aria-label="Water Level"
                    orientation="vertical"
                    valueLabelDisplay="auto"
                    value={Number(value)}
                    min={Number(min)}
                    max={Number(max)}
                />
            </Box>
        </>
    )
}

export default WaterLevel