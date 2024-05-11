import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import HomeSideBar from "../../components/home_side_bar/HomeSideBar";
import TrainingCard from '../../components/training_card/TrainingCard';
import ProfileInfoPart from './parts/ProfileInfoPart/ProfileInfoPart';
import ProfileMainPart from './parts/ProfileMainPart/ProfileMainPart';


function ProfilePage() {
    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                <MainAppBar />
            </div>
            <main>
               <Box sx={{width:"100%", height: "calc(100vh - 72px)", backgroundColor:"red", display:"flex", alignItems:"center", justifyContent:"center"}}>
                    <Box width={"270px"} height={"800px"}>
                        <ProfileInfoPart />
                    </Box>
                    <Box width={"64px"}/>
                    <Box width={"800px"} height={"800px"}>
                        <ProfileMainPart />
                    </Box>
               </Box>
            </main>
        </React.Fragment>
    );
}

export default ProfilePage