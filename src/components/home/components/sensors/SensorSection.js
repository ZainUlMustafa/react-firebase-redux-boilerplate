import { Container } from "@mui/material"
import WaterLevel from "./WaterLevel"

const SensorSection = (props) => {
    const { sensorsData } = props

    if (sensorsData === undefined) {
        return <p>No data!</p>
    }

    return (
        <>
            <Container>
                <WaterLevel waterLevel={sensorsData.waterLevel} />
            </Container>
        </>
    )
}

export default SensorSection