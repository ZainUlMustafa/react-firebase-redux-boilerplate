// import { Box, Grid, Slider, Paper, Stack, Typography, Divider, IconButton, Card } from "@mui/material";
// import { useEffect, useRef, useState } from "react";
// import AssetVideoPlayer from "../project/components/AssetVideoPlayer";
// // import link from '../../../../assets/GX010227.mp4'
// import AssetMap from "../project/components/AssetMap";
// import originalVideoLink from "../../../../assets/cycle/out_original_video.mp4"
// import predictionVideoLink from "../../../../assets/cycle/out_prediction_video.mp4"
// import predictions from '../../../../assets/cycle/predOut.json'
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import PauseIcon from '@mui/icons-material/Pause';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// // const SurfaceVisualizerDashboard = ({ appBarHeight }) => 
// // // player references
// // const playerOneRef = useRef(null)
// // const playerTwoRef = useRef(null)

// // const vidDivRef = useRef(null)

// // const [pinned, setPinned] = useState(null)
// // const [playIt, setPlayIt] = useState(false)

// // const [videoPlayerState, setVideoPlayerState] = useState(null)

// // useEffect(() => {
// //     if (playerOneRef) {
// //         playerOneRef.current.subscribeToStateChange(handleBind)
// //     }
// // });

// // const handleBind = (state) => {
// //     setVideoPlayerState(state);
// // }

// // const fps = 24
// // let gpsData = []
// // let gpsDataCombined = []
// // Object.values(predictions).forEach((e) => {
// //     gpsData = [...gpsData, e['GPS']]
// //     gpsDataCombined = [...gpsDataCombined, ...e['GPS']]
// // });
// // const handleNextFrame = () => {
// //     const secondPerFrame = 1 / fps
// //     playerOneRef.current.forward(secondPerFrame)
// //     playerTwoRef.current.forward(secondPerFrame)
// // }

// // const handlePrevFrame = () => {
// //     const secondPerFrame = 1 / fps
// //     playerOneRef.current.replay(secondPerFrame)
// //     playerTwoRef.current.replay(secondPerFrame)
// // }

// // useEffect(() => {
// //     if (playIt) {
// //         playerOneRef.current.play();
// //         playerTwoRef.current.play();
// //     } else {
// //         playerOneRef.current.pause();
// //         playerTwoRef.current.pause();
// //     }
// // }, [playIt])

// // const handleVideoPlayPause = () => {
// //     setPlayIt(!playIt)
// // }

// // const handleSeekTo = (timeSeek) => {
// //     playerOneRef.current.seek(timeSeek + (1 / fps))
// //     playerTwoRef.current.seek(timeSeek + (1 / fps))
// // }

// // const handlePinned = () => {

// // }

// // const handleOnChange = (e) => {
// //     console.log(e.target.value)
// //     handleSeekTo(e.target.value)
// // }

// //     const topSectionHeight = '47vh'
// //     const middleSectionHeight = '8vh'
// //     const bottomSectionHeight = '45vh'


// //     // console.log(videoPlayerState)
// //     return (
// //         <div style={{ width: '100vw', height: '100vh', backgroundColor: 'transparent', paddingInline: '0px' }}>
// //             <Grid container>
// //                 <Grid item xs={6} sx={{ backgroundColor: 'transparent' }}>
// //                     <div ref={vidDivRef} style={{ height: topSectionHeight, backgroundColor: 'green' }}>
// //                         {/* video 1 */}
// //                         <AssetVideoPlayer fps={fps} handleNextFrame={handleNextFrame} handlePrevFrame={handlePrevFrame} playerRef={playerOneRef}
// //                             link={originalVideoLink} pinned={pinned} height={vidDivRef.current === null ? 0 : vidDivRef.current?.clientHeight} startTime={1 / fps} control={false} disableControlsFully={true} />

// //                     </div>
// //                 </Grid>
// //                 <Grid item xs={0} sx={{ backgroundColor: 'transparent' }}>

// //                 </Grid>
// //                 <Grid item xs={6} sx={{ backgroundColor: 'transparent' }}>
// //                     <div style={{ height: topSectionHeight, backgroundColor: 'blue' }}>
// //                         {/* video 2 */}
// //                         <AssetVideoPlayer fps={fps} handleNextFrame={handleNextFrame} handlePrevFrame={handlePrevFrame} playerRef={playerTwoRef}
// //                             link={predictionVideoLink} pinned={pinned} height={vidDivRef.current === null ? 0 : vidDivRef.current?.clientHeight} startTime={1 / fps} control={false} disableControlsFully={true} />
// //                     </div>
// //                 </Grid>
// //             </Grid>
// //             <Grid container>
// //                 <Grid item xs={12}>
// //                     <div style={{ height: middleSectionHeight, backgroundColor: 'black' }}>
// //                         {/* controls */}

// //                         {/* <Box sx={{ width: 300 }}> */}
// //                         <Slider size="small" aria-label="Small"
// //                             valueLabelDisplay="auto" sx={{}} defaultValue={0} min={0} max={videoPlayerState?.duration??0} value={videoPlayerState?.currentTime??0} onChange={handleOnChange} />
// //                         {/* </Box> */}
// //                         <button onClick={handleVideoPlayPause}>{playIt ? 'Pause' : 'Play'}</button>
// //                         <button onClick={handlePrevFrame}>{'<<'}</button>
// //                         <button onClick={handleNextFrame}>{'>>'}</button>
// //                     </div>
// //                 </Grid>
// //             </Grid>
// //             <Grid container>
// //                 <Grid item xs={12}>
// //                     <div style={{ height: bottomSectionHeight, backgroundColor: 'pink' }}>
// //                         {/* map */}
// //                         <AssetMap playerRef={playerOneRef} zoom={15} dataList={[]} assetData={[]} polyPoints={gpsData} allPolyPoints={gpsDataCombined} pinned={pinned} handleSeekTo={handleSeekTo} handlePinned={handlePinned} center={gpsDataCombined[0]} checkData={false} radius={3} />

// //                     </div>
// //                 </Grid>
// //             </Grid>
// //         </div>
// //     );
// // }
// const SurfaceVisualizerDashboard = ({ }) => {

//     const playerOneRef = useRef(null)
//     const playerTwoRef = useRef(null)
//     const vidDivRef = useRef(null)

//     const [pinned, setPinned] = useState(null)
//     const [playIt, setPlayIt] = useState(false)
//     const [videoPlayerState, setVideoPlayerState] = useState(null)
//     // drop down for playback speed

//     const [anchorEl, setAnchorEl] = useState(null);
//     const [playbackRate, setPlaybackRate] = useState(1);
//     const handleSetPlaybackRate = (rate) => {
//         setPlaybackRate(rate);
//         videoPlayerState.playbackRate = rate;
//         handleClose();
//     };

//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };
//     const playbackSpeeds = [
//         { value: 0.5, label: '0.5x' },
//         { value: 1, label: '1x' },
//         { value: 1.5, label: '1.5x' },
//         { value: 2, label: '2x' },
//     ];
//     useEffect(() => {
//         if (playerOneRef) {
//             playerOneRef.current?.subscribeToStateChange(handleBind)
//         }
//     });

//     const handleBind = (state) => {
//         setVideoPlayerState(state);
//     }
//     function getCurrentFrame() {
//         const currentTime = videoPlayerState?.currentTime;
//         const currentFrame = Math.round(currentTime * fps);
//         return currentFrame;
//     }

//     const fps = 24

//     let gpsData = []
//     let gpsDataCombined = []
//     Object.values(predictions).forEach((e) => {
//         gpsData = [...gpsData, e['GPS']]
//         gpsDataCombined = [...gpsDataCombined, ...e['GPS']]
//     });
//     const handleNextFrame = () => {
//         const secondPerFrame = 1 / fps
//         playerOneRef.current.forward(secondPerFrame)
//         playerTwoRef.current.forward(secondPerFrame)
//     }

//     const handlePrevFrame = () => {
//         const secondPerFrame = 1 / fps
//         playerOneRef.current.replay(secondPerFrame)
//         playerTwoRef.current.replay(secondPerFrame)
//     }

//     useEffect(() => {
//         if (playIt) {
//             playerOneRef.current.play();
//             playerTwoRef.current.play();
//         } else {
//             playerOneRef.current.pause();
//             playerTwoRef.current.pause();
//         }
//     }, [playIt])

//     const handleVideoPlayPause = () => {
//         setPlayIt(!playIt)
//     }

//     const handleSeekTo = (timeSeek) => {
//         playerOneRef.current.seek(timeSeek + (1 / fps))
//         playerTwoRef.current.seek(timeSeek + (1 / fps))
//     }

//     const handlePinned = () => {

//     }

//     const handleOnChange = (e) => {
//         console.log(e.target.value)
//         handleSeekTo(e.target.value)
//     }
//     return (
//         <Grid container spacing={{ md: 4, sm: 2 }} sx={{
//             width: "100vw",
//             height: "90vh",

//         }}>
//             <Grid item xs={1.2}>
//                 <Box sx={{ height: '90vh', backgroundColor: 'white' }} />
//             </Grid>
//             <Grid item xs={10.5}>
//                 <Grid container spacing={{ md: 2, sm: 2 }}
//                     sx={{
//                         paddingTop: "2vh"
//                     }} >
//                     <Grid item xs={6}
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: {
//                                 md: 2,
//                                 sm: 2,
//                             },
//                         }}>
//                         <Card ref={vidDivRef} sx={{
//                             height: '42vh', backgroundColor: 'blue', border: "1px solid #626262",
//                             filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
//                             borderRadius: "20px"
//                         }} >
//                             <div className="container" style={{ padding: '0px' }}>
//                                 <div className="inner" style={{ zIndex: 997 }}>
//                                     <AssetVideoPlayer
//                                         fps={fps} handleNextFrame={handleNextFrame} handlePrevFrame={handlePrevFrame} playerRef={playerOneRef}
//                                         link={predictionVideoLink} pinned={pinned} height={vidDivRef.current === null ? 0 : vidDivRef.current?.clientHeight} startTime={1 / fps} control={true} disableControlsFully={true}

//                                     />
//                                 </div>
//                                 <div className="inner" style={{ zIndex: 998, width: vidDivRef.current === null ? 0 : vidDivRef.current?.clientWidth }}>
//                                     <div style={{
//                                         height: '100%', width: '100%', backgroundColor: 'rgba(0,255,255,0.4)'
//                                     }}>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Card>
//                         <Box sx={{
//                             height: '42vh', backgroundColor: 'red', border: "1px solid #626262",
//                             filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
//                             borderRadius: "20px",
//                         }}>
//                             <AssetVideoPlayer
//                                 fps={fps} handleNextFrame={handleNextFrame} handlePrevFrame={handlePrevFrame} playerRef={playerTwoRef}
//                                 link={predictionVideoLink} pinned={pinned} height={vidDivRef.current === null ? 0 : vidDivRef.current?.clientHeight} startTime={1 / fps} control={true} disableControlsFully={true}/>
//                                 </Box>

//                     </Grid>
//                     <Grid item xs={6}
//                         sx={{
//                             display: "flex",
//                             flexDirection: "column",
//                             gap: {
//                                 md: 2,
//                                 sm: 2,
//                             },
//                         }}>
//                         <Card sx={{
//                             height: '42vh', backgroundColor: 'red', border: "1px solid #626262",
//                             filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
//                             borderRadius: "20px",
//                         }}>

//                             <div className="container" style={{ padding: '0px' }}>
//                                 <div className="inner" style={{ zIndex: 997 }}>
//                                     <AssetVideoPlayer
//                                         fps={fps} handleNextFrame={handleNextFrame} handlePrevFrame={handlePrevFrame} playerRef={playerTwoRef}
//                                         link={predictionVideoLink} pinned={pinned} height={vidDivRef.current === null ? 0 : vidDivRef.current?.clientHeight} startTime={1 / fps} control={true} disableControlsFully={true}

//                                     />
//                                 </div>
//                                 <div className="inner" style={{ zIndex: 998, width: vidDivRef.current === null ? 0 : vidDivRef.current?.clientWidth }}>
//                                     <div style={{
//                                         height: '100%', width: '100%',
//                                     }}>
//                                     </div>
//                                 </div>
//                             </div>
//                         </Card>
//                         <Box sx={{
//                             height: '42vh', backgroundColor: 'yellow', border: "1px solid #626262",
//                             filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
//                             borderRadius: "20px"
//                         }} />
//                     </Grid>
//                 </Grid>
//             </Grid>
//             <Grid container spacing={0} justifyContent="center"
//                 alignItems="center">
//                 <Grid item xs={12} >
//                     <Box sx={{ height: '10vh', backgroundColor: '#FAFAFA', display: "flex", justifyContent: "center", alignItems: "center", borderTop: "#626262  1px solid" }} >
//                         <Box sx={{
//                             width: "94vw",
//                             // border: "solid black 2px",
//                         }}>
//                             <Stack direction="row"
//                                 spacing={2}>
//                                 <Stack direction="row"
//                                     spacing={2}
//                                 >
//                                     <IconButton onClick={handleVideoPlayPause}>
//                                         {!playIt ? <PlayArrowIcon
//                                             sx={{
//                                                 color: "#0C153E",
//                                                 fontSize: "40px",
//                                             }} /> : <PauseIcon
//                                             sx={{
//                                                 color: "#0C153E",
//                                                 fontSize: "40px",
//                                             }} />}
//                                     </IconButton>
//                                     <div style={{
//                                         display: "flex", justifyContent: "center", alignItems: "center",
//                                     }}>
//                                         <Typography>   {videoPlayerState?.currentTime.toFixed(2)}/{videoPlayerState?.duration.toFixed(2)}</Typography>
//                                     </div>
//                                 </Stack>

//                                 <Box sx={{
//                                     display: "flex", justifyContent: "center", alignItems: "center"

//                                 }}>
//                                     <Stack direction="row"
//                                         spacing={5}
//                                     >
//                                         <Slider
//                                             size="small"
//                                             defaultValue={0}
//                                             min={0}
//                                             max={videoPlayerState?.duration ?? 0}
//                                             value={videoPlayerState?.currentTime ?? 0}
//                                             aria-label="Small"
//                                             valueLabelDisplay="auto"
//                                             sx={{
//                                                 color: "#0C153E",
//                                                 width: "60vw",
//                                             }}
//                                             onChange={handleOnChange}
//                                         />
//                                         <Typography>&lt;&lt;Frame 24&gt;&gt;</Typography>
//                                         <Typography>1.00x</Typography>
//                                         <Divider orientation="vertical" flexItem sx={{
//                                             backgroundColor: "#626262"
//                                         }} />
//                                         <Typography sx={{
//                                             fontWeight: "700",
//                                         }}>Street 14
//                                         </Typography>
//                                     </Stack>
//                                 </Box>
//                             </Stack>
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Grid >
//     );
// }
// export default SurfaceVisualizerDashboard;
