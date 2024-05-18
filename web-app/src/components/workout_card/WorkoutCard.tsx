import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Ege from "../../assets/ege.png";
import Omuz from "../../assets/workout/omuz.png";
import { Box } from "@mui/system";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export interface ExerciseModel {
    name: string,
    sets: number,
    reps: number
}

function WorkoutCard() {
    const [isCompleted, setCompleted] = useState<boolean>(false);
    const navigate = useNavigate();

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
        }
    ];

    const handleCompleted = (event: any) => {
        event.stopPropagation();
        setCompleted(true);
    }

    return (
        // <Link to="/detail" style={{ textDecoration: "none", color: "inherit" }}>

        <Box justifyContent={"center"} sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "10px 0" }} >
            <Card style={{ width: "330px", height: "450px", backgroundColor: "#18191A", padding: "12px" }} onClick={() => {navigate("/detail")}}>
                <CardContent style={{ margin: "10px 0", padding: "0", display: "flex" }}>
                    <Typography variant="h4">Shoulder Workout</Typography>
                    <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }} >
                        <Avatar
                            sx={{ width: 48, height: 48, backgroundColor: "#1976d2" }}
                            src="../../assets/bilkent_logo.png" />
                        {/* <Box sx={{ flex: 1, marginLeft: "12px" }} >
                            <Typography
                                variant="body1"
                                component="div">
                                Ege Fitness
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#ffffff' }}>
                                Personal Trainer
                            </Typography>
                        </Box> */}
                    </Box>
                </CardContent>
                <Box display={"flex"} flexDirection={"column"} height={"100%"}>
                    <Typography variant="h6">45 min</Typography>
                    <Box maxHeight={"270px"} overflow={"scroll"}>
                        {
                            shoulderExercises.map((exercise, index) => {
                                return (
                                    <Box margin={"12px 0"}>
                                        <Typography variant="body1">
                                            {(index + 1) + ". " + exercise.name}
                                        </Typography>
                                        <Typography variant="body2" marginLeft={"20px"} sx={{ color: "#a1a1a1" }}>
                                            {exercise.sets + "x" + exercise.reps}
                                        </Typography>
                                    </Box>
                                );
                            })
                        }
                    </Box>
                    <Box height={"32px"}>
                        {!isCompleted ? <Button variant="contained" fullWidth style={{ margin: "0px" }} onClick={handleCompleted}>Complete</Button> : <Typography sx={{ color: "green" }}>Completed</Typography>}
                    </Box>
                </Box>
            </Card>
        </Box>
        // </Link>
    );
}

export default WorkoutCard;