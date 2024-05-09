import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface AudienceRadioButtonProps {
    label: string,
    id: string,
    activeAudiences: string[],
    onAudienceSelected: (id: string) => void
}


function AudienceRadioButton(props: AudienceRadioButtonProps) {

    const isActive = props.activeAudiences.includes(props.id);

    return (
        <Box width={"100%"} height={"44px"} onClick={() => props.onAudienceSelected(props.id)}
            sx={{ margin: "6px 0", display: "flex", alignItems: "center", borderRadius: "12px", ":hover": { backgroundColor: "#909192" } }} >
            <Box width={"4px"} />
            <Box width={"40px"} height={"40px"} sx={{ borderRadius: "100%", backgroundColor: "#3E3F40", display: "flex", alignItems: "center", justifyContent: "center" }} >
                <Box width={"24px"} height={"24px"} visibility={isActive ? "visible" : "hidden"}
                    sx={{ backgroundColor: "white", borderRadius: "100%" }} />
            </Box>
            <Box width={"4px"} />
            <Typography variant="h5"
                sx={{
                    fontWeight: "bold", marginLeft: "12px", flexGrow: 1
                }}>{props.label}</Typography>

        </Box>
    );
}

export default AudienceRadioButton;