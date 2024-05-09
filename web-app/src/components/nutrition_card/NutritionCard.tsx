import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import Rice from "../../assets/rice.png";
import { Box } from "@mui/system";

function NutritionCard() {

    return (
        <Box justifyContent={"center"} sx={{width: "100%", display:"flex", justifyContent: "center", margin:"10px 0"}} >
            <Card style={{ width: "270px", height: "300px", backgroundColor: "#18191A", padding: "12px" }}>
                <CardContent style={{ margin: "10px 0", padding: "0" }}>
                    <Typography variant="h5" component="div">
                        Rice
                    </Typography>
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

export default NutritionCard