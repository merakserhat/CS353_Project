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
import { getExerciseList, getExerciseLogList, getFeWorkouts, getFitnessGoals, postCreateGoal, postCreateWorkoutTr, postLoginFe, postLoginTrainer, postRegsiterFe } from '../../data/network/Network';
import { GlobalContext } from '../../data/context/GlobalContextProps';
import { WorkoutModel } from '../../data/models/WorkoutModel';

const menuItems = [
    "Workouts",
    "Trainers",
    "Diets",
];

function HomePage() {
    const [selectedMenu, setSelectedMenu] = React.useState<string>(menuItems[0]);
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

            // const response: ApiResponse<GoalModel> = await getFeWorkouts("3");
            // console.log(response.data.duration);

            const workoutData: WorkoutModel = {
                trainer_id: "2",
                name: "workout2",
                audience: "Beginner",
                description: "des_test",
                exercises: [
                    { exerciseId: "1", sets: 3, reps: 1 },
                    { exerciseId: "2", sets: 3, reps: 1 },
                    { exerciseId: "3", sets: 3, reps: 1 }
                ]
            };

            const response: ApiResponse<WorkoutModel> = await postCreateWorkoutTr(
                "2",
                "workout2",
                "Beginner",
                "des_test",
                [
                    { exerciseId: "1", sets: 3, reps: 1 },
                    { exerciseId: "2", sets: 3, reps: 1 },
                    { exerciseId: "3", sets: 3, reps: 1 }
                ]);
            console.log(response.data.exercises[1].reps);
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
                return Array.from(Array(6)).map((_, index) => (
                    <Grid item xs key={index}>
                        <DietCard />
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