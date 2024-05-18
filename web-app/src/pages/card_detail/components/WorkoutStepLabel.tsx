import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


function WorkoutStepLabel() {

    return (
        <Box sx={{backgroundColor:"red", margin:"4px 8px"}}>
            <Typography>2. Romanian Deadlifts: 3 sets x 10 reps</Typography>
            <Typography>aaaaaaaaaaaaaaaa• Hold a barbell with an overhand grip, feet hip-width apart, and hinge at the hips, lowering the barbell towards the floor while keeping your back straight.</Typography>
            <Box sx={{display:"flex"}}>
                <Typography>Repetition: </Typography>
                <Typography>3x12</Typography>
            </Box>
        </Box>
    );
}

export default WorkoutStepLabel;
