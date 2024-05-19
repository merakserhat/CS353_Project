import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import HomeSideBar from "../../components/home_side_bar/HomeSideBar";
import MultipleMenuSelector from '../../components/multiple_menu_selector/MultipleMenuSelector';
import TrainerCard from '../../components/trainer_card/TrainerCard';
import WorkoutCard from '../../components/workout_card/WorkoutCard';
import DietCard from '../../components/diet_card/DietCard';
import { getExerciseList, getExerciseLogList, getFeWorkouts, getFitnessGoals, getNutritionList, getWorkoutList, getWorkoutLogs, postCreateAchievement, postCreateGoal, postCreateWorkoutFe, postCreateWorkoutTr, postFinishWorkout, postLoginFe, postLoginTrainer, postPickWorkout, postRegsiterFe, postStartChat } from '../../data/network/Network';
import { GlobalContext } from '../../data/context/GlobalContextProps';
import { WorkoutModel } from '../../data/models/WorkoutModel';

const menuItems = [
    "Workouts",
    "Trainers",
    "Diets",
];

function HomePage() {
    const [selectedMenu, setSelectedMenu] = React.useState<string>(menuItems[0]);
    const [nutritionPlans, setNutritionPlans] = React.useState<NutritionPlanModel[]>([]);
    const { setExercises, user } = React.useContext(GlobalContext);


    React.useEffect(() => {
        console.log("user", user);
        const getData = async () => {
            // const response: ApiResponse<any> = await postLoginTrainer("orhunaysan3b@gmail.com", "password1");
            // console.log(response.data.user_id);

            const exerciseList: ApiResponse<ExerciseModel[]> = await getExerciseList();
            setExercises(exerciseList.data);

            // const response: ApiResponse<ExerciseLogModel[]> = await getExerciseLogList("3");
            // console.log("exercise", response.data[0]);

            // const response: ApiResponse<RegisterModel> = await postRegsiterFe("sdgsdg@example.com",
            //     "password123",
            //     "mal",
            //     "ege",
            //     "karaahmet",
            //     "70",
            //     "165",
            //     "31",
            //     "orta");

            // console.log(response.data.user?.gender);

            // const response: ApiResponse<GoalModel> = await postCreateGoal("4","asd","ads",100,10);
            // console.log(response.data.duration);

            // const response: ApiResponse<GoalModel> = await getFitnessGoals("3");
            // console.log(response.data.duration);

            const nutritionResponse: ApiResponse<{nutrition_plans: NutritionPlanModel[]}> = await getNutritionList(user!.fe_id);
            console.log("description", nutritionResponse.data.nutrition_plans[0].description);
            setNutritionPlans(nutritionResponse.data.nutrition_plans);

            // const workoutData: WorkoutModel = {
            //     trainer_id: "2",
            //     name: "workout2",
            //     audience: "Beginner",
            //     description: "des_test",
            //     exercises: [
            //         { exercise_id: "1", sets: 3, reps: 1 },
            //         { exercise_id: "2", sets: 3, reps: 1 },
            //         { exercise_id: "3", sets: 3, reps: 1 }
            //     ]
            // };

            const response: ApiResponse<WorkoutModel> = await postCreateWorkoutTr(
                "2",
                "workout2",
                "Beginner",
                "des_test",
                [
                    { exercise_id: "1", sets: 3, reps: 1 },
                    { exercise_id: "2", sets: 3, reps: 1 },
                    { exercise_id: "3", sets: 3, reps: 1 }
                ]);
            // console.log(response.data.exercises[1].reps);
            // const response: ApiResponse<WorkoutModel> = await postCreateWorkoutTr(
            //     "2",
            //     "workout2",
            //     "Beginner",
            //     "des_test",
            //     [
            //         { exercise_id: "1", sets: 3, reps: 1 },
            //         { exercise_id: "2", sets: 3, reps: 1 },
            //         { exercise_id: "3", sets: 3, reps: 1 }
            //     ]);
            // console.log(response.data.exercises[1].reps);

            // const workoutData: WorkoutModel = {
            //     trainer_id: "2",
            //     name: "workout2",
            //     audience: "Beginner",
            //     description: "des_test",
            //     exercises: [
            //         { exercise_id: "1", sets: 3, reps: 1 },
            //         { exercise_id: "2", sets: 3, reps: 1 },
            //         { exercise_id: "3", sets: 3, reps: 1 }
            //     ]
            // };

            // const response: ApiResponse<WorkoutModel> = await postCreateWorkoutFe(
            //     "4",
            //     "workout2",
            //     "Beginner",
            //     "des_test",
            //     [
            //         { exercise_id: "1", sets: 3, reps: 1 },
            //         { exercise_id: "2", sets: 3, reps: 1 },
            //         { exercise_id: "3", sets: 3, reps: 1 }
            //     ]);
            //console.log(response.data.exercises[1].reps);

            // const WorkoutList: ApiResponse<WorkoutModel[]> = await getWorkoutList();
            // console.log(WorkoutList.data)

            // const response: ApiResponse<WorkoutModel[]> = await getFeWorkouts("3");
            // console.log("exercise", response.data);

            // const WorkoutList: ApiResponse<WorkoutModel[]> = await postPickWorkout("cd6dc854-1837-4676-ba7c-0e28d22232ec", "4");
            // console.log(WorkoutList.data)
            
            // const response: ApiResponse<WorkoutModel[]> = await postFinishWorkout("4", "cd6dc854-1837-4676-ba7c-0e28d22232ec");
            // console.log(response.data)

            // const response: ApiResponse<WorkoutModel[]> = await getWorkoutLogs("4");
            // console.log(response.data)

            // const response: ApiResponse<WorkoutModel[]> = await postCreateAchievement();
            // console.log(response.data)

            // const response: ApiResponse<WorkoutModel[]> = await postStartChat("3");
            // console.log(response.data)

            

        }

        getData();
    }, []);

    const onMenuSelectionChange = (name: string) => {
        setSelectedMenu(name);
    }

    const getMenuList = () => {
        switch (selectedMenu) {
            case menuItems[0]:
                return Array.from(Array(6)).map((_, index) => (
                    <Grid item xs key={index}>
                        <WorkoutCard />
                    </Grid>
                ));
                break;
            case menuItems[1]:
                return Array.from(Array(6)).map((_, index) => (
                    <Grid item xs key={index}>
                        <TrainerCard />
                    </Grid>
                ));
                break;
            case menuItems[2]:
                return nutritionPlans.map((diet, index) => (
                    <Grid item xs key={index}>
                        <DietCard nutritionPlan={diet} />
                    </Grid>
                ));
                break;
        }
    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                <MainAppBar />
            </div>
            <main>
                <Box sx={{ display: "flex" }} >
                    <Box width={{ xs: "0px", sm: "300px" }} sx={{ height: "calc(100vh - 72px)", backgroundColor: "red", flexShrink: 0 }} >
                        <HomeSideBar />
                    </Box>
                    <Box sx={{ height: "calc(100vh - 72px)", flexGrow: 1, overflow: "auto" }} >
                        <MultipleMenuSelector onSelectionChanged={onMenuSelectionChange} items={menuItems} selectedItem={selectedMenu} />

                        <Grid container spacing={0} columns={4} justifyContent={"flex-start"}>
                            {getMenuList()}
                        </Grid>
                    </Box>
                </Box>
            </main>
        </React.Fragment>

        // <Box sx={{ display: "flex" }} >
        //     <CssBaseline />
        //     <MainAppBar />
        //     <div>Home</div>
        //     <Link to="/register">Register</Link>
        //     <Link to="/login">Login</Link>
        //     <NutritionCard />
        //     <NutritionCard />
        //     <NutritionCard />
        //     <NutritionCard />
        //     <NutritionCard />
        // </Box>
    );
}

export default HomePage