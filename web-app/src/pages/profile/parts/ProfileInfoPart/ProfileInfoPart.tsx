import { Box } from "@mui/system";
import Button from '@mui/material/Button';
import ProfileInfoLabel from "../../../../components/profile_info_label/ProfileInfoLabel";
import Dune from "../../../../assets/dune.png";



function ProfileInfoPart() {

    return (
        <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "#F5FAFF" }} borderRadius={5} display={"flex"} flexDirection={"column"}>
            <Box height={270} display="flex" justifyContent="center" alignItems="center" marginBottom={"24px"}>
                <img src={Dune} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: 12, borderTopRightRadius: 12 }} />
            </Box>
            <Box margin={"0px 16px"} position={"relative"} sx={{ flexGrow: 1 }}>
                <ProfileInfoLabel info="Serhat Merak" label="Fullname" />
                <ProfileInfoLabel info="serhat.merak@ug.bilkent.edu.tr" label="Email" />
                <ProfileInfoLabel info="180cm" label="Height" />
                <ProfileInfoLabel info="76kg" label="Weight" />
                <ProfileInfoLabel info="22" label="Age" />
                <Button variant="contained" color="secondary" fullWidth sx={{ position: "absolute", bottom: "12px" }}>Edit</Button>
            </Box>

        </Box>
    );
}

export default ProfileInfoPart;