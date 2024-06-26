import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import CreateWorkoutForm from './parts/CreateWorkoutForm';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import WorkoutExerciseForm from './components/WorkoutExerciseForm';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { GlobalContext } from '../../data/context/GlobalContextProps';
import { postCreateWorkoutFe } from '../../data/network/Network';
import { useNavigate } from 'react-router-dom';
import { exerc } from '../../data/context/GlobalProvider';


interface ExerciseDraft {
    index: number,
    exercise_name: string,
    sets: number,
    reps: number,
}

function CreateWorkoutPage() {
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercises, setExercises] = useState<number[]>([0]);
    const [exerciseDrafts, setExerciseDrafts] = useState<ExerciseDraft[]>([]);

    const {user} = React.useContext(GlobalContext);
    const navigate = useNavigate();

    const handleNewExercise = () => {
        setExerciseIndex((ex) => ex += 1);
        setExercises((exercises) => [exerciseIndex, ...exercises]);
    }

    const handleRemoveExercise = (index: number) => {
        const newExercises = exercises.filter((ex) => ex != index);
        setExercises(newExercises);
    }

    const handleCompleteExercise = (sets: number, reps: number, exercise: string, index: number) => {
        if (sets && reps && exercise) {
            if (exerciseDrafts.filter((ed) => ed.index === index).length === 0) {
                setExerciseDrafts((drafts) => [...drafts, { index: index, exercise_name: exercise, sets: sets, reps: reps }]);
            }
        } else {
            if (exerciseDrafts.filter((ed) => ed.index === index).length !== 0) {
                setExerciseDrafts((drafts) => drafts.filter((ed) => ed.index !== index));
            }
        }

        console.log(exerciseDrafts);
    }

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        audience: '',
        intensity: '',
        duration: 0,
    });

    const handleChange = (event: any) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        // Handle form submission
        console.log(formData);

        const description = formData.description;
        const name = formData.name;
        const audience = formData.audience;
        const intensity = formData.intensity;
        const duration = formData.duration;

        const exercises = exerciseDrafts.map((ed) => {
            return {
                exercise_id: exerc.filter((e) => e.exercise_name === ed.exercise_name)[0].exercise_id,
                sets: ed.sets,
                reps: ed.reps,
            }
        });

        if (duration && intensity && description && name && audience && exerciseDrafts.length > 0 && user?.fe_id) {
            const result = await postCreateWorkoutFe({fe_id: user.fe_id, name, audience, description, exercises: exercises, intensity: intensity, duration: duration});
            console.log(result);

            if (result.status === 200) {
                alert("Workout created successfully!")
            } else {
                alert("Failed to create workout!")
            }
            navigate("/");
        }
    };


    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                <MainAppBar />
            </div>
            <main>
                <Box sx={{ display: "flex", width: "100%", height: "calc(100vh - 72px)" }} >
                    <Box width={"450px"} height={"100%"}>
                        <Box width={"100%"} height={"100%"} display={"flex"} flexDirection={"column"}>
                            <Typography variant='h5'>Create Workout</Typography>
                            <Button variant='outlined' color='info' sx={{ margin: "24px" }} onClick={handleNewExercise}>Add Exercise</Button>
                            <Box display={"flex"} flexDirection={"column-reverse"}>
                                {
                                    exercises.map((_, index) => <WorkoutExerciseForm complete={handleCompleteExercise} onDelete={handleRemoveExercise} index={index} key={index} />)
                                }
                            </Box>
                        </Box>
                    </Box>
                    <Box flexGrow={1} height={"100%"} flexDirection={"column"} sx={{ display: "flex" }} >
                        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: '56px 0', width: "100%" }}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                            <TextField
                                label="Description"
                                variant="outlined"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                multiline
                                fullWidth
                                rows={4}
                            />
                            <TextField
                                label="Duration"
                                variant="outlined"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                required
                                multiline
                                fullWidth
                            />
                            <FormControl variant="outlined" required>
                                <InputLabel>Audience</InputLabel>
                                <Select
                                    name="audience"
                                    fullWidth
                                    value={formData.audience}
                                    onChange={handleChange}
                                    label="Audience"
                                >
                                    <MenuItem value="Beginner">Beginner</MenuItem>
                                    <MenuItem value="Intermediate">Intermediate</MenuItem>
                                    <MenuItem value="Pro">Pro</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" required>
                                <InputLabel>Intencity</InputLabel>
                                <Select
                                    name="intensity"
                                    fullWidth
                                    value={formData.intensity}
                                    onChange={handleChange}
                                    label="Intensity"
                                >
                                    <MenuItem value="High">High</MenuItem>
                                    <MenuItem value="Medium">Medium</MenuItem>
                                    <MenuItem value="Low">Low</MenuItem>
                                </Select>
                            </FormControl>

                            <Button variant='outlined' type="submit" color='info' sx={{ margin: "24px" }}>Create Workout</Button>

                        </Box>
                        {
                            exerciseDrafts.map((exercise, index) => {
                                return (
                                    <Box margin={"12px 0"}>
                                        <Typography variant="body1" color={"information"}>
                                            {(index + 1) + ". " + exercise.exercise_name}
                                        </Typography>
                                        <Typography variant="body2" color={"information"} marginLeft={"20px"} sx={{ color: "#a1a1a1" }}>
                                            {exercise.sets + "x" + exercise.reps}
                                        </Typography>
                                    </Box>
                                );
                            })
                        }


                    </Box>
                </Box>
            </main>
        </React.Fragment>
    );
}

export default CreateWorkoutPage;