import { Box, Slider } from "@mui/material"

const WaterLevel = (props) => {
    const { value, min, max, id } = props.waterLevel
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
        </>
    )
}

export default WaterLevel