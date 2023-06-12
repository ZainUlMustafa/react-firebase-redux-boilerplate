import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Typography } from '@mui/material';
import './GlassBeaker.css';

const GlassBeaker = ({ percentage = 0, height = 300, width = 200, color = '#1ca3ec', name = "" }) => {
    const fillHeight = `${percentage}%`;

    const containerStyle = {
        position: 'relative',
        width: '100%',
        height: height,
        border: '1px solid black',
        overflow: 'hidden',
    };

    const fillStyle = {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        backgroundColor: color,
        transition: 'height 0.5s ease',
    };

    const hoverFillStyle = {
        ...fillStyle,
        backgroundColor: 'lightblue',
    };

    return (
        <Tooltip title={`${percentage}%`}>
            <>
                {/* <div style={containerStyle}>
                    <div style={{ ...fillStyle, height: fillHeight }}></div>
                    <div style={hoverFillStyle} className="hover-fill"></div>
                </div> */}
                <div className="beaker">
                    <div className="water" style={{height: fillHeight}}></div>
                </div>
                {name === "" ? <></> : <Typography>
                    {name} ({percentage}%)
                </Typography>}
            </>
        </Tooltip>
    );
};

GlassBeaker.propTypes = {
    percentage: PropTypes.number.isRequired,
};

export default GlassBeaker;
