import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import ProfileInfoLabel from "../../../../components/profile_info_label/ProfileInfoLabel";
import Dune from "../../../../assets/dune.png";
import { useContext } from "react";
import { GlobalContext } from "../../../../data/context/GlobalContextProps";



function ProfileInfoPart() {

    const {user} = useContext(GlobalContext);

    return (
        <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "#F5FAFF" }} borderRadius={5} display={"flex"} flexDirection={"column"}>
            <Box height={270} display="flex" justifyContent="center" alignItems="center" marginBottom={"24px"}>
                <img src={Dune} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
            </Box>
            <Box margin={"0px 16px"} position={"relative"} sx={{ flexGrow: 1 }}>
                <ProfileInfoLabel info={user!.first_name + user!.last_name} label="Fullname" />
                <ProfileInfoLabel info={user!.email} label="Email" />
                <ProfileInfoLabel info={user!.height} label="Height" />
                <ProfileInfoLabel info={user!.weight} label="Weight" />
                <ProfileInfoLabel info={user!.age} label="Age" />
                <Button variant="contained" color="secondary" fullWidth sx={{ position: "absolute", bottom: "12px" }}>Edit</Button>
            </Box>

        </Box>
    );
}

export default ProfileInfoPart;