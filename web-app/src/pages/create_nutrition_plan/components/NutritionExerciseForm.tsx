import React, { useContext, useEffect, useState } from 'react';
import { Container, Select, MenuItem, TextField, Grid, InputLabel, Button } from '@mui/material';
import { GlobalContext } from '../../../data/context/GlobalContextProps';

interface WorkoutExerciseFormProps {
    onDelete: (index: number) => void
    index: number,
    complete: (portion: number, nutrition: string, index: number) => void
    // complete: (sets: number, reps: number, exercise: string, index: number) => void
}

const NutritionPlanForm = (props: WorkoutExerciseFormProps) => {
    const { nutritions } = useContext(GlobalContext);

    const [selectedItem, setSelectedItem] = useState('');
    const [portion, setPortion] = useState(0);
    // const [reps, setReps] = useState('');

    useEffect(() => {
        // props.complete(parseInt(sets), parseInt(reps), selectedItem, props.index);
        props.complete(portion, selectedItem, props.index);
    },[selectedItem/*, reps, exercises*/] );

    const handleSelectChange = (event: any) => {
        setSelectedItem(event.target.value as string);
    };

    const handlePortionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPortion(+event.target.value);
    };

    // const handleRepsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     setReps(event.target.value);
    // };


    return (
        <Container maxWidth="sm" sx={{ margin: "24px 0px" }} >
            <TextField
                value={selectedItem}
                onChange={handleSelectChange}
                select // tell TextField to render select
                label="Select Nutritions"
                inputProps={{
                    style: { fontWeight: "bold" },
                    inputMode: 'numeric', pattern: '[0-9]*'
                }}
                InputLabelProps={{
                    style: { color: '#fff', fontWeight: "bold" },
                }}
                fullWidth
            >
                {nutritions!.map((item, index) => (
                    <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                ))}
            </TextField>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        type="number"
                        value={portion}
                        onChange={handlePortionChange}
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        label="Portion"
                        inputProps={{
                            style: { fontWeight: "bold" },
                            inputMode: 'numeric', pattern: '[0-9]*'
                        }}
                        InputLabelProps={{
                            style: { color: '#fff', fontWeight: "bold" },
                        }}
                    />
                </Grid>
                {/* <Grid item xs={6}>
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
                </Grid> */}
            </Grid>
            <Button variant='text' color='error' onClick={() => props.onDelete(props.index)}>Remove</Button>
        </Container>
    );
};

export default NutritionPlanForm;
