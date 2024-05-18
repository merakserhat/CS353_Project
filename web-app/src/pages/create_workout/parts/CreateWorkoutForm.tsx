import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WorkoutExerciseForm from '../components/WorkoutExerciseForm';
import { useState } from 'react';

function CreateWorkoutForm() {
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercises, setExercises] = useState<number[]>([0]);

    const handleNewExercise = () => {
        setExerciseIndex((ex) => ex += 1 );
        setExercises((exercises) => [exerciseIndex, ...exercises]);
    }

    const handleRemoveExercise = (index: number) => {
        const newExercises = exercises.filter((ex) => ex != index);
        setExercises(newExercises);
    }


    return (
        <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"}>
            <Typography variant='h5'>Create Workout</Typography>
            <Button variant='outlined' color='info' sx={{margin:"24px"}} onClick={handleNewExercise}>Add Exercise</Button>
            {
                exercises.map((exerciseIndex) => <WorkoutExerciseForm onDelete={handleRemoveExercise} index={exerciseIndex} />)
            }
        </Box>
    );
}

export default CreateWorkoutForm;