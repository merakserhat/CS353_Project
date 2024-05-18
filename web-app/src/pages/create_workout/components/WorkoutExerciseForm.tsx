import React, { useState } from 'react';
import { Container, Select, MenuItem, TextField, Grid, InputLabel, Button } from '@mui/material';

const randomItems = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10'
];

interface WorkoutExerciseFormProps {
    onDelete: (index: number) => void
    index: number
}

const WorkoutExerciseForm = (props: WorkoutExerciseFormProps) => {
    const [selectedItem, setSelectedItem] = useState('');
    const [sets, setSets] = useState('');
    const [reps, setReps] = useState('');

    const handleSelectChange = (event: any) => {
        setSelectedItem(event.target.value as string);
    };

    const handleSetsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSets(event.target.value);
    };

    const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setReps(event.target.value);
    };


    return (
        <Container maxWidth="sm" sx={{ margin: "24px 0px" }} >
            <TextField
                value={selectedItem}
                onChange={handleSelectChange}
                select // tell TextField to render select
                label="Select Exercise"
                inputProps={{
                    style: { fontWeight: "bold" },
                    inputMode: 'numeric', pattern: '[0-9]*'
                }}
                InputLabelProps={{
                    style: { color: '#fff', fontWeight: "bold" },
                }}
                fullWidth
            >
                {randomItems.map((item, index) => (
                    <MenuItem key={index} value={item}>{item}</MenuItem>
                ))}
            </TextField>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        value={sets}
                        onChange={handleSetsChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Sets"
                        inputProps={{
                            style: { fontWeight: "bold" },
                            inputMode: 'numeric', pattern: '[0-9]*'
                        }}
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: "bold" },
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        value={reps}
                        onChange={handleRepsChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Reps"
                        inputProps={{
                            style: { fontWeight: "bold" },
                            inputMode: 'numeric', pattern: '[0-9]*'
                        }}
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: "bold" },
                        }}
                    />
                </Grid>
            </Grid>
            <Button variant='text' color='error' onClick={() => props.onDelete(props.index)}>Remove</Button>
        </Container>
    );
};

export default WorkoutExerciseForm;
