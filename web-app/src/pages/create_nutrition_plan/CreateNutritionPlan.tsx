import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import NutritionExerciseForm from './components/NutritionExerciseForm';
import { TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { GlobalContext } from '../../data/context/GlobalContextProps';
import { postCreateNutritionFe } from '../../data/network/Network';
import { useNavigate } from 'react-router-dom';


interface NutritionDraft {
    index: number,
    nutrition_name: string,
    portion: number,
    // reps: number,
}

function CreateNutritionPlanPage() {
    const [exerciseIndex, setExerciseIndex] = useState<number>(0);
    const [exercises, setExercises] = useState<number[]>([0]);
    const [nutritionDrafts, setNutritionDrafts] = useState<NutritionDraft[]>([]);
    const navigate = useNavigate();

    const {user, nutritions} = React.useContext(GlobalContext);

    const handleNewExercise = () => {
        setExerciseIndex((ex) => ex += 1);
        setExercises((exercises) => [exerciseIndex, ...exercises]);
    }

    const handleRemoveExercise = (index: number) => {
        const newExercises = exercises.filter((ex) => ex != index);
        setExercises(newExercises);
    }

    const handleCompleteExercise = (portion: number, nutrition: string, index: number) => {
        if (/*sets && reps &&*/ nutrition) {
            if (nutritionDrafts.filter((ed) => ed.index === index).length === 0) {
                setNutritionDrafts((drafts) => [...drafts, { index: index, nutrition_name: nutrition, portion: portion, }]);
            }
        } else {
            if (nutritionDrafts.filter((ed) => ed.index === index).length !== 0) {
                setNutritionDrafts((drafts) => drafts.filter((ed) => ed.index !== index));
            }
        }

        console.log(nutritionDrafts);
    }

    const [formData, setFormData] = useState({
        name: '',
        description: '',
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

        if (description && name && nutritionDrafts.length > 0 && user?.fe_id) {

            const nutritionIds = nutritionDrafts.map((e) => {
                return {
                    nut_id: nutritions!.filter((nut) => nut.name === e.nutrition_name! )[0].nut_id,
                    portion: e.portion
                }
            
            });
            const result: ApiResponse<{nutrition_plan: NutritionPlanModel}> = await postCreateNutritionFe(user.fe_id, name, description, nutritionIds);
            

            if (result.data.nutrition_plan.name) {
                navigate("/");
            }
            
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
                            <Typography variant='h5'>Create Nutrition Plan</Typography>
                            <Button variant='outlined' color='info' sx={{ margin: "24px" }} onClick={handleNewExercise}>Add Exercise</Button>
                            <Box display={"flex"} flexDirection={"column-reverse"}>
                                {
                                    exercises.map((_, index) => <NutritionExerciseForm complete={handleCompleteExercise} onDelete={handleRemoveExercise} index={index} key={index} />)
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
                            <Button variant='outlined' type="submit" color='info' sx={{ margin: "24px" }}>Create Nutrition Plan</Button>

                        </Box>
                        {
                            nutritionDrafts.map((nutrition, index) => {
                                return (
                                    <Box margin={"12px 0"}>
                                        <Typography variant="body1" color={"information"}>
                                            {(index + 1) + ". " + nutrition.nutrition_name}
                                        </Typography>
                                        {/* <Typography variant="body2" color={"information"} marginLeft={"20px"} sx={{ color: "#a1a1a1" }}>
                                            {exercise.sets + "x" + exercise.reps}
                                        </Typography> */}
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

export default CreateNutritionPlanPage;