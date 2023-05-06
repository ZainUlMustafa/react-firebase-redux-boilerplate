import { Box, Slider } from "@mui/material"

const WaterLevel = (props) => {
    const { value, min, max, id, isOpen } = props.waterLevel
    return (
        <>

            <Slider
                aria-label="Water Level"
                orientation="vertical"
                valueLabelDisplay="auto"
                value={Number(value)}
                min={Number(min)}
                max={Number(max)}
            />
            <p>{id}</p>
            <p>{isOpen? "Opened": "Closed"}</p>
        </>
    )
}

export default WaterLevel