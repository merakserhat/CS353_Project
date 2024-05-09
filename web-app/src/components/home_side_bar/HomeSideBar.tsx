import { Box } from "@mui/system";
import HomeSideButton from "./home_side_button/HomeSideButton";
import { useState } from "react";
import AudienceRadioButton from "./audience_radio_button/AudienceRadioButton";

interface HomeFilter {
    audience: string[],
    durationMin?: number,
    durationMax?: number,
    equipments?: string[]
}

function HomeSideBar() {
    const [audienceMenuOpen, setAudienceMenuOpen] = useState<boolean>(false); 
    const [homeFilter, setHomeFilter] = useState<HomeFilter>({audience: ["all"]}); 

    const handleAudienceMenu = () => {
        setAudienceMenuOpen((audienceMenuOpen) => !audienceMenuOpen);
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
            return {...homeFilter, audience: audience};
        })
    }

    const browseAllSelected = homeFilter.audience.includes("all");

    const audienceMenu = <Box visibility={audienceMenuOpen ? "visible" : "hidden"} paddingLeft={"32px"} paddingTop={"8px"}>
        <AudienceRadioButton label="Beginner" id="beginner" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected}/>
        <AudienceRadioButton label="Amateur" id="amateur" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected}/>
        <AudienceRadioButton label="Semi-Pro" id="semi-pro" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected}/>
        <AudienceRadioButton label="Professional" id="professional" activeAudiences={homeFilter.audience} onAudienceSelected={handleAudienceSelected}/>
    </Box>

    return (
        <Box sx={{width: "100%", height: "100%", padding: "10px", backgroundColor:"#242526", borderRight: "1px solid #909192"}}>
            <HomeSideButton isSelected={browseAllSelected} label="Browse All"/>
            <Box height={"12px"} />
            <HomeSideButton isSelected={!browseAllSelected} label="Audience" isInteractive={true} onMenuOpen={handleAudienceMenu} isMenuOpen={audienceMenuOpen}/>
            {audienceMenu}
        </Box>
    );
}

export default HomeSideBar;