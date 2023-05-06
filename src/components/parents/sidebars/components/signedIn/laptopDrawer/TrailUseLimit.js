import React from "react";
import LinearProgress, {
  LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";



function LinearProgressWithLabel(props) {

  const colorTheme = createTheme({
    palette: {
      primary: {
        main: "#448717",
      },
      secondary: {
        main: "#448717"
      }
    }
  });
  return (
    <ThemeProvider theme={colorTheme}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1">Trail Usage {`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
        <Box>
          <Box sx={{ width: "100%", }}>
            <LinearProgress
              sx={{ width: "120px",height:'7px',backgroundColor: '#cfcece' }}
              variant="determinate"
              {...props}
            />

          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

LinearProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and buffer variants.
   * Value between 0 and 100.
   */
  //   value: PropTypes.number.isRequired,
  value: 10,
};

export default function TrailUseLimit() {
  const [progress, setProgress] = React.useState(10);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%", margin: "auto 0 auto 0" }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
}
