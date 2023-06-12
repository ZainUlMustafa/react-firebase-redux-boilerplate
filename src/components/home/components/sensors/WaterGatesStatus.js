import { Box, Container, Grid, Typography } from "@mui/material"

const WaterGatesStatus = (props) => {
    const { sensorsData } = props

    if (sensorsData === undefined) {
        return <p>No data!</p>
    }

    console.log(sensorsData)
    const waterLevelSensors = Object.values(sensorsData).filter((e) => e.type === "WATER_LEVEL")
    const mainTankSensor = waterLevelSensors.find((e) => e.id === "sensormain")
    return (
        <>
            <Box>
                {
                    waterLevelSensors.filter((e) => e.id !== "sensormain").map((e, i) => {
                        const percentage = 100*(e.value/e.max)
                        const isMax = percentage === 100
                        return <Typography key={e.id}>{e.name}: <span style={{color: e.isOpen? 'darkgreen': isMax ? 'red' : 'darkorange'}}>{e.isOpen ? "Filling" : isMax ? "Full" : "Closed"}</span></Typography>
                    })
                }
            </Box>
        </>
    )
}

export default WaterGatesStatus