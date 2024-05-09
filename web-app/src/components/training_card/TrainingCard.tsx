import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Rice from "../../assets/rice.png";
import { Box } from "@mui/system";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


function TrainingCard() {

    return (
        <Box justifyContent={"center"} sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "10px 0" }} >
            <Card style={{ width: "330px", height: "420px", backgroundColor: "#18191A", padding: "12px" }}>
                <CardContent style={{ margin: "10px 0", padding: "0" }}>
                    <Box sx={{ display: "flex", alignItems: "center", padding: "10px" }} >
                        <Avatar
                            sx={{ width: 48, height: 48, backgroundColor: "#1976d2" }}
                            src="../../assets/bilkent_logo.png" />
                        <Box sx={{ flex: 1, marginLeft: "12px" }} >
                            <Typography
                                variant="body1"
                                component="div">
                                Orhun Aysan
                            </Typography>
                            <Typography variant="body2" sx={{ color: '#ffffff' }}>
                                Personal Trainer
                            </Typography>
                        </Box>
                        <IconButton
                            sx={{ color: '#ffffff' }}
                        >
                            <MoreHorizIcon />
                        </IconButton>
                    </Box>
                </CardContent>
                <CardMedia
                    component="img"
                    image={Rice}
                    alt="Rice"
                    style={{
                        width: '100%',
                        height: 'calc(100%- 60px)',
                        margin: "10px 0"
                    }} />
                <CardActions style={{ margin: "10px 0", padding: "0" }}>
                    <Button variant="contained" fullWidth style={{ margin: "0px" }}>ADD TO DIET</Button>
                </CardActions>
            </Card>
        </Box>
    );
}

export default TrainingCard;