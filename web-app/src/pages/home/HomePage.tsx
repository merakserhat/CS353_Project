import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import HomeSideBar from "../../components/home_side_bar/HomeSideBar";
import TrainingCard from '../../components/training_card/TrainingCard';


function HomePage() {
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
                    <Box sx={{ height: "calc(100vh - 72px)", flexGrow: 1, overflow:"auto" }} >
                        <Grid container spacing={0} columns={4}>
                            {Array.from(Array(6)).map((_, index) => (
                                <Grid item xs key={index}>
                                    <TrainingCard />
                                </Grid>
                            ))}
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