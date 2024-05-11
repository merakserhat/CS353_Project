import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface HomeSideButtonProps {
    label: string,
    isSelected: boolean,
    isInteractive?: boolean,
    isMenuOpen?: boolean,
    onMenuOpen: () => void
}

function HomeSideButton(props: HomeSideButtonProps) {

    return (
        <Box
            onClick={props.onMenuOpen}
            sx={{ width: "100%", height: "44px", display: "flex", alignItems: "center", padding: "0 8px", ":hover": { backgroundColor: "#3E3F40" }, borderRadius: "8px" }}
        >
            <Box
                sx={{ display: "flex", width: "36px", height: "36px", backgroundColor: props.isSelected ? "#0055A7" : "#3E3F40", justifyContent: "center", alignItems: "center", borderRadius: "100%", flexShrink: "0" }}>

                {!props.isInteractive ? <HomeIcon sx={{ width: "26px", height: "26px" }} /> : <MenuIcon sx={{ width: "26px", height: "26px" }}
                />}
            </Box>
            <Typography variant="h5"
                sx={{
                    fontWeight: "bold", marginLeft: "12px", flexGrow: 1
                }}>{props.label}</Typography>

            {props.isInteractive ?
                !props.isMenuOpen ? <ExpandMoreIcon /> : <ExpandLessIcon /> : ""}
        </Box>
    );
}

export default HomeSideButton;