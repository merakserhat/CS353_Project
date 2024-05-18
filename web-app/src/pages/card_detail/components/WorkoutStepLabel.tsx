import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ExerciseModel } from '../../../components/workout_card/WorkoutCard';

interface WorkoutStepLabelProps {
    exercise: ExerciseModel,
}

function WorkoutStepLabel(props: WorkoutStepLabelProps) {

    return (
        <Box sx={{margin:"12px 4px", paddingBottom:"8px"}} borderBottom={"1px solid black"}>
            <Typography color={"primary"} variant='body1'>{"•" + props.exercise.name}</Typography>
            <Box sx={{display:"flex"}}>
                <Typography  color={"primary"} variant='body2'>{props.exercise.sets + " x " + props.exercise.reps}</Typography>
            </Box>
        </Box>
    );
}

export default WorkoutStepLabel;
