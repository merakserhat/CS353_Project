import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import MainAppBar from "../../components/app_bar/AppBar";
import HomeSideBar from "../../components/home_side_bar/HomeSideBar";
import Workout from "../../assets/workout.png";
import Nutrition from "../../assets/nutrition.png";
import { Link } from 'react-router-dom';


function CreateBasePage() {

    const createButton = (name: string) => {
        let image;
        let to;
        switch (name) {
            case "Workout":
                image = Workout;
                to = "/create/workout"
                break;

            default:
                image = Nutrition;
                to = "/create/nutrition"
                break;
        }
        return (
            <Link to={to} style={{textDecoration:"none", color:"inherit"}}>
                <Box width={"200px"} height={"200px"} borderRadius={"15px"} sx={{ backgroundColor: "#242526", display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
                    <img src={image} alt="Workout" style={{ width: '96px', height: '96px', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12, marginLeft: 12, marginBottom: 12 }} />
                    <Typography variant='h5' marginBottom={"32px"}>{name}</Typography>
                </Box>
            </Link>
        );

    }

    return (
        <React.Fragment>
            <CssBaseline />
            <div>
                <MainAppBar />
            </div>
            <main>
                <Box sx={{ width: "100%", height: "calc(100vh - 72px)", backgroundColor: "#DDE5ED", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "scroll" }}>
                    <Typography variant='h4' display={"block"} color={"primary"}>What do you want to create?</Typography>
                    <Box height={"128px"} />
                    <Box sx={{ width: "1200px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: "0", padding: "12px" }}>
                        {createButton("Workout")}
                        <Box width={"128px"} />
                        {createButton("Nutrition Plan")}
                    </Box>
                    <Box height={"128px"} />
                </Box>
            </main>
        </React.Fragment>
    );
}

export default CreateBasePage
