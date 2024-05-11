import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const HomeDurationFilter = () => {
    return (
        <Box>
            <Typography variant="h5" sx={{fontWeight:"bold"}} gutterBottom>
                Duration Filter
            </Typography>
            <Box display="flex">
                <TextField
                    type="tel"
                    label="Min"
                    variant="outlined"
                    style={{ marginRight: '8px' }}
                    inputProps={{
                        style: {fontWeight:"bold"},
                        inputMode: 'numeric', pattern: '[0-9]*'
                    }}
                    InputLabelProps={{
                        style: { color: '#fff', fontWeight:"bold" },
                    }}
                />
                <Typography variant="subtitle1" style={{ margin: '8px 0' }}>-</Typography>
                <TextField
                    type="tel"
                    label="Max"
                    variant="outlined"
                    style={{ marginLeft: '8px' }}
                    inputProps={{
                        style: {fontWeight:"bold"},
                        inputMode: 'numeric', pattern: '[0-9]*'
                    }}
                    InputLabelProps={{
                        style: { color: '#fff', fontWeight:"bold" },
                    }}
                />
            </Box>
        </Box>
    );
};

export default HomeDurationFilter;
