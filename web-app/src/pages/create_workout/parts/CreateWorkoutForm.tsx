import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import WorkoutExerciseForm from '../components/WorkoutExerciseForm';
import { useState } from 'react';

interface ExerciseDraft {
    index: number,
    exercise_name: string,
    sets: number,
    reps: number,
}

function CreateWorkoutForm() {
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercises, setExercises] = useState<number[]>([0]);
    const [exerciseDrafts, setExerciseDrafts] = useState<ExerciseDraft[]>([]);

    const handleNewExercise = () => {
        setExerciseIndex((ex) => ex += 1 );
        setExercises((exercises) => [exerciseIndex, ...exercises]);
    }

    const handleRemoveExercise = (index: number) => {
        const newExercises = exercises.filter((ex) => ex != index);
        setExercises(newExercises);
    }

    const handleCompleteExercise = (sets: number, reps: number, exercise: string, index: number) => {
        if (sets && reps && exercise) { 
            if (exerciseDrafts.filter((ed) => ed.index === index).length === 0) {
               setExerciseDrafts((drafts) => [...drafts, {index: index, exercise_name: exercise, sets: sets, reps: reps}]);
            }
        } else {
            if (exerciseDrafts.filter((ed) => ed.index === index).length !== 0) {
                setExerciseDrafts((drafts) => drafts.filter((ed) => ed.index !== index));
             }
        }

        console.log(exerciseDrafts);
    }


    return (
            <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"}>
                <Typography variant='h5'>Create Workout</Typography>
                <Button variant='outlined' color='info' sx={{margin:"24px"}} onClick={handleNewExercise}>Add Exercise</Button>
                {
                    exercises.map((_, index) => <WorkoutExerciseForm complete={handleCompleteExercise} onDelete={handleRemoveExercise} index={index} />)
                }
            </Box>
    );
}

export default CreateWorkoutForm;

