import { Box } from "@mui/system";
import HomeSideButton from "./home_side_button/HomeSideButton";
import { useState } from "react";
import AudienceRadioButton from "./audience_radio_button/AudienceRadioButton";
import HomeDurationFilter from "./home_duration_filter/HomeDurationFilter";
import EquipmentFilter from "./equipment_filter/EquipmentFilter";
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';


interface HomeFilter {
    audience: string[],
    durationMin?: number,
    durationMax?: number,
    equipments: string[]
}

function HomeSideBar() {
    const [audienceMenuOpen, setAudienceMenuOpen] = useState<boolean>(false);
    const [homeFilter, setHomeFilter] = useState<HomeFilter>({ audience: ["all"], equipments: [] });

    const handleAudienceMenu = () => {
        setAudienceMenuOpen((audienceMenuOpen) => !audienceMenuOpen);
    }

    const handleAllMenu = () => {
        setHomeFilter((homeFilter) => {
            return {
                ...homeFilter,
                audience: ["all"]
            };
        })
    }

    const handleAudienceSelected = (id: string) => {
        let audience = homeFilter.audience;
        if (audience.includes(id)) {
            audience = audience.filter((aud) => aud !== id);
            if (audience.length === 0) {
                audience.push("all");
            }
        } else {
            audience.push(id);
            if (audience.includes("all")) {
                audience = audience.filter((aud) => aud !== "all");
            }
        }

        setHomeFilter((homeFilter) => {
            return { ...homeFilter, audience: audience };
        })
    }

    const handleEquipmentSelected = (id: string) => {
        let equipments = homeFilter.equipments;
        if (equipments.includes(id)) {
            equipments = equipments.filter((eq) => eq !== id);
        } else {
            equipments.push(id);
        }

        setHomeFilter((homeFilter) => {
            return { ...homeFilter, equipments: equipments };
        })
    }

    const browseAllSelected = homeFilter.audience.includes("all");

    const audienceMenu = (<Box sx={{ display: audienceMenuOpen ? "block" : "none" }} paddingLeft={"32px"} paddingTop={"8px"}>
        <AudienceRadioButton label="Beginner" id="beginner" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected} />
        <AudienceRadioButton label="Amateur" id="amateur" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected} />
        <AudienceRadioButton label="Semi-Pro" id="semi-pro" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected} />
        <AudienceRadioButton label="Professional" id="professional" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected} />
    </Box>);

    const settingsButton = (<Box
        sx={{ width: "calc(100% - 24px)", height: "44px", display: "flex", alignItems: "center", padding: "8px", ":hover": { backgroundColor: "#3E3F40" }, borderRadius: "8px", position: "absolute", bottom:"16px" }}
    >
        <SettingsIcon sx={{ width: "26px", height: "26px" }} />
        <Typography variant="h5"
            sx={{
                fontWeight: "bold", marginLeft: "12px", flexGrow: 1
            }}>Settings</Typography>
    </Box>)

    return (
        <Box sx={{ width: "100%", height: "100%", padding: "10px", backgroundColor: "#242526", borderRight: "1px solid #909192", position:"relative"}}>
            <HomeSideButton isSelected={browseAllSelected} label="Browse All" onMenuOpen={handleAllMenu} />
            <Box height={"24px"} />
            <HomeSideButton isSelected={!browseAllSelected} label="Audience" isInteractive={true} onMenuOpen={handleAudienceMenu} isMenuOpen={audienceMenuOpen} />
            {audienceMenu}
            <Box height={"24px"} />
            <HomeDurationFilter />
            <Box height={"24px"} />
            <EquipmentFilter equipmants={homeFilter.equipments} handleEquipmantSelected={handleEquipmentSelected} />
            {settingsButton}
        </Box>
    );
}

export default HomeSideBar;