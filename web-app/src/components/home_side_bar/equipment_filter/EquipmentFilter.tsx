import { Box } from "@mui/system";
import Typography from '@mui/material/Typography';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from "react";
import AudienceRadioButton from "../audience_radio_button/AudienceRadioButton";

interface EquipmentFilterProps {
    isInteractive?: boolean,
    isMenuOpen?: boolean,
    equipmants: string[],
    handleEquipmantSelected: (id: string) => void,
}

function EquipmentFilter(props: EquipmentFilterProps) {
    const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

    const handleMenuOpen = () => {
        setMenuOpen((isMenuOpen) => !isMenuOpen);
    }

    const equipmantMenu = <Box sx={{ display: isMenuOpen ? "block" : "none" }} paddingLeft={"32px"} paddingTop={"8px"}>
        <AudienceRadioButton label="Dumble" id="Dumble" activeAudiences={props.equipmants} onAudienceSelected={props.handleEquipmantSelected} />
        <AudienceRadioButton label="Bench" id="Bench" activeAudiences={props.equipmants} onAudienceSelected={props.handleEquipmantSelected} />
        <AudienceRadioButton label="Barbell" id="Barbell" activeAudiences={props.equipmants} onAudienceSelected={props.handleEquipmantSelected} />
        <AudienceRadioButton label="Cable" id="Cable" activeAudiences={props.equipmants} onAudienceSelected={props.handleEquipmantSelected} />
        <AudienceRadioButton label="Machine" id="Machine" activeAudiences={props.equipmants} onAudienceSelected={props.handleEquipmantSelected} />
    </Box>

    return (
        <Box>
            <Box
                onClick={handleMenuOpen}
                sx={{ width: "100%", display: "flex", alignItems: "center" }}
            >
                <Typography variant="h5"
                    sx={{
                        fontWeight: "bold", flexGrow: 1
                    }}>Equipments</Typography>
                {!isMenuOpen ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                <Box width={"8px"} />
            </Box>
            {equipmantMenu}
        </Box>

    );
}

export default EquipmentFilter;