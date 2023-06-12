import React from 'react';
import { Card, Typography } from '@mui/material';

const LogViewer = ({ logs }) => {

    const cardLightStyle = {
        "border": "0px solid grey",
        "borderRadius": "8px",
        "padding": "8px",
        "backgroundColor": '#f5f1f1'
        // "backgroundColor": '#f5f1f1'
    }

    const adjustedLogs = Object.values(logs ?? {});
    // console.log(adjustedLogs)

    return (
        <Card sx={cardLightStyle}>
            <div style={{ padding: '10px' }}>
                {adjustedLogs.map((log, index) => (
                    <div key={index} style={{ marginBottom: '10px' }}>
                        <Typography variant="body1">
                            <span style={{ fontWeight: 'bold' }}>{log.timestamp}: </span>
                            {log.message}
                        </Typography>
                        <Typography variant="caption">
                            {log.reservoir}: Volume: {log.volume}, Filled up: {log.percentage}%
                        </Typography>
                    </div>
                ))}
            </div>
        </Card>
    );
};

export default LogViewer;
