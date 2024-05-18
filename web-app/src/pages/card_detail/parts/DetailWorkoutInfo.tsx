import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import DetailTrainerInfo from './DetailTrainerInfo';
import WorkoutStepLabel from '../components/WorkoutStepLabel';
import { ExerciseModel } from '../../../components/workout_card/WorkoutCard';
import Ege from "../../../assets/ege.png";


const shoulderExercises: ExerciseModel[] = [
    {
        name: "Shoulder Press",
        sets: 3,
        reps: 12
    },
    {
        name: "Dumbbell Lateral Raise",
        sets: 3,
        reps: 15
    },
    {
        name: "Front Raise",
        sets: 3,
        reps: 15
    },
    {
        name: "Arnold Press",
        sets: 3,
        reps: 10
    },
    {
        name: "Shoulder Press",
        sets: 3,
        reps: 12
    },
    {
        name: "Dumbbell Lateral Raise",
        sets: 3,
        reps: 15
    },
    {
        name: "Front Raise",
        sets: 3,
        reps: 15
    },
    {
        name: "Arnold Press",
        sets: 3,
        reps: 10
    },
    {
        name: "Shoulder Press",
        sets: 3,
        reps: 12
    },
    {
        name: "Dumbbell Lateral Raise",
        sets: 3,
        reps: 15
    },
    {
        name: "Front Raise",
        sets: 3,
        reps: 15
    },
    {
        name: "Arnold Press",
        sets: 3,
        reps: 10
    }
];

function DetailWorkoutInfo() {
    return (
        <Box width={"100%"} height={"100%"}
            sx={{ borderRight: "2px solid black", display: "flex", flexDirection: "column", padding:"0px 16px" }}>

            <Box height={"200px"} flexShrink={0} display={"flex"} flexDirection={"column"}>
                <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }} >
                    <Avatar
                        sx={{ width: 96, height: 96, backgroundColor: "#1976d2" }}
                        src={Ege} />
                    <Box sx={{ flex: 1, marginLeft: "12px" }} >
                        <Typography
                            variant="body1"
                            component="div"
                            color={"primary"}>
                            by Ege Fitness
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#777777' }}>
                            Personal Trainer
                        </Typography>
                    </Box>
                </Box>
                <Box display={"flex"} sx={{justifyContent:"space-between", alignItems:"center"}}>
                    <Typography sx={{color:"black"}} variant='h5'>Lower Body Build-up for Beginners</Typography>
                    <Typography variant="body2"sx={{color: "#777777"}} >15min</Typography>
                </Box>
                <Typography variant='body2' sx={{color:"#777777"}}>Leg and hip movement to get you going.</Typography>
            </Box>
            <Box flexGrow={1} flexShrink={0} maxHeight={"calc(100% - 150px)"}>
                <Box height={"100%"} overflow={"auto"}>
                    {shoulderExercises.map((e) => <WorkoutStepLabel exercise={e} />)}
                </Box>
            </Box>

        </Box>
    );
}

export default DetailWorkoutInfo;