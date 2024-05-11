import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

interface ProfileInfoLabelProps {
    label: string,
    info: string,
}

function ProfileInfoLabel(props: ProfileInfoLabelProps) {

    return (
        <Box display="flex" flexDirection={"column"} width={"calc(100%)"} margin={"8px 0px"}>
            <Typography textAlign={"center"} color={"#797B7E"}>{props.label}</Typography>
            <Box padding={"10px"} width={"100%"} borderRadius={12} boxShadow={3}>
                <Typography noWrap maxWidth={"100%"} textAlign={"center"} variant='h6' color={"#006867"} textOverflow={'ellipsis'} overflow={"hidden"} sx={{WebkitLineClamp: 1}}>{props.info}</Typography>
            </Box>
        </Box>
    );
}

export default ProfileInfoLabel;