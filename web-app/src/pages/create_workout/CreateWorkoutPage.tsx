import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import CreateWorkoutForm from './parts/CreateWorkoutForm';

function CreateWorkoutPage() {


    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                <MainAppBar />
            </div>
            <main>
                <Box sx={{ display: "flex", width:"100%", height:"calc(100vh - 72px)" }} >
                    <Box width={"450px"} height={"100%"}>
                        <CreateWorkoutForm/>
                    </Box>
                    <Box flexGrow={1} height={"100%"} sx={{backgroundColor:"purple", display: {xs: "none", sm: "none", md: "flex"}}} ></Box>
                </Box>
            </main>
        </React.Fragment>
    );
}

export default CreateWorkoutPage