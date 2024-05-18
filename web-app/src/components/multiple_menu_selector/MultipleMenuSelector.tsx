import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";

interface MultipleMenuSelectorProps {
    selectedItem: string,
    items: string[],
    onSelectionChanged: (item: string) => void,
}

function MultipleMenuSelector(props: MultipleMenuSelectorProps) {

    const menuItem = (name: string) => {

        const boxColor = name === props.selectedItem ? "#F0304E" : "#242526" ;

        return <Box onClick={() => props.onSelectionChanged(name)} sx={{padding: "0px 4px", borderRadius:"5px", backgroundColor:boxColor, margin:"8px 4px", minWidth:"120px", height: "30px", display:"flex", justifyContent:"center", alignItems:"center"}}>
            <Typography variant="body1" fontWeight={"bold"}>{name}</Typography>
        </Box>
    }

    return (
        <Box sx={{display: "flex", width:"100%", flexWrap: "wrap", justifyContent:"center"}}>
            {props.items.map((name) => menuItem(name))}
        </Box>
    );
}

export default MultipleMenuSelector;