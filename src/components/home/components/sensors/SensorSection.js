import { Box, Container, Grid, Typography } from "@mui/material"
import WaterLevel from "./WaterLevel"
import GlassBeaker from "../../../cidgets/waterBeaker/GlassBeaker"

const SensorSection = (props) => {
    const { sensorsData } = props

    if (sensorsData === undefined) {
        return <p>No data!</p>
    }

    console.log(sensorsData)
    const waterLevelSensors = Object.values(sensorsData).filter((e) => e.type === "WATER_LEVEL")
    const mainTankSensor = waterLevelSensors.find((e) => e.id === "sensormain")
    return (
        <>
            <Container>
                <Box>
                    <Grid container>
                        {waterLevelSensors.filter((e) => e.id !== 'sensormain').map((eachWaterLevel) => {
                            return <Grid item xs={4} key={eachWaterLevel.id}>
                                <div style={{ height: '300px', paddingInline: '10px' }}>
                                    <GlassBeaker percentage={100 * (eachWaterLevel.value / eachWaterLevel.max)} name={eachWaterLevel.name} />
                                    {/* <WaterLevel waterLevel={eachWaterLevel} /> */}
                                </div>
                            </Grid>
                        })}
                    </Grid>

                    <div style={{ padding: '40px' }}></div>
                    {/* <Typography variant='h5' sx={{ fontWeight: 'bold', fontSize: '18px' }}>
                        {mainTankSensor.name}
                    </Typography> */}
                    <GlassBeaker percentage={100 * (mainTankSensor.value / mainTankSensor.max)} name={mainTankSensor.name}/>
                </Box>
            </Container>
        </>
    )
}

export default SensorSection