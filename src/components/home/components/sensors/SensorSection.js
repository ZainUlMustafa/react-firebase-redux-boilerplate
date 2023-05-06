import { Box, Container, Grid } from "@mui/material"
import WaterLevel from "./WaterLevel"

const SensorSection = (props) => {
    const { sensorsData } = props

    if (sensorsData === undefined) {
        return <p>No data!</p>
    }

    console.log(sensorsData)
    const waterLevelSensors = Object.values(sensorsData).filter((e) => e.type === "WATER_LEVEL")
    return (
        <>
            <Container>
                <Box>
                    <Grid container>
                        {waterLevelSensors.map((eachWaterLevel) => {
                            return <Grid item xs={4} key={eachWaterLevel.id}>
                                <div style={{height: '300px'}}>
                                <WaterLevel waterLevel={eachWaterLevel} />
                                </div>
                            </Grid>
                        })}
                    </Grid>
                </Box>
            </Container>
        </>
    )
}

export default SensorSection