import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import HomeSideBar from "../../components/home_side_bar/HomeSideBar";
import DetailTrainerInfo from './parts/DetailTrainerInfo';
import DetailWorkoutInfo from './parts/DetailWorkoutInfo';

function CardDetailPage() {
    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                <MainAppBar />
            </div>
            <main>
               <Box sx={{width:"100%", height: "calc(100vh - 72px)", backgroundColor:"#DDE5ED", display:"flex", alignItems:"center", justifyContent:"center", overflow:"scroll"}}>
                    <Box sx={{width:"1200px", height: "800px", backgroundColor:"#F0F6FD", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:"0", padding:"12px", borderRadius:"10px"}}>
                        <Box sx={{flex: 5, flexShrink:0, overflow: "auto"}} height={"100%"} display={"flex"} >
                            <DetailWorkoutInfo/>
                        </Box>
                        <Box width={"24px"} />
                        <Box sx={{flex: 3, flexShrink:0}} height={"100%"} position={"relative"}>
                            <DetailTrainerInfo />
                            <Button variant='contained' color='error' sx={{padding:"8px 12px", position:"absolute", bottom:"12px", right:"12px"}}>Start Workout</Button>
                        </Box>
                    </Box>
               </Box>
            </main>
        </React.Fragment>
    );
}

export default CardDetailPage
