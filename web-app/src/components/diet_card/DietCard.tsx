import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Rice from "../../assets/rice.png";
import { Box } from "@mui/system";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link, useNavigate } from "react-router-dom";
import { deleteNutrition } from "../../data/network/Network";

interface DietCardProps {
    nutritionPlan: NutritionPlanModel
}

function DietCard(props: DietCardProps) {

    const navigate = useNavigate();

    const handleDelete = async () => {
        const result = await deleteNutrition(props.nutritionPlan.plan_id);

        if (result.status < 400) {
            alert("deleted successfully");
        } else {
            alert("sth went wrong");
        }

        navigate("/");
    }

    return (
        <Link to="/detail" style={{ textDecoration: "none", color: "inherit" }}>
            <Box justifyContent={"center"} sx={{ width: "100%", display: "flex", justifyContent: "center", margin: "10px 0" }} >
                <Card style={{ width: "330px", height: "420px", backgroundColor: "#18191A", padding: "12px" }}>
                    <CardContent style={{ margin: "10px 0", padding: "0", height:"300px", overflow:"scroll" }}>
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
                        <Typography variant="h5" component="div">{props.nutritionPlan.name}</Typography>
                        <Typography variant="body2" color="textSecondary">{props.nutritionPlan.description}</Typography>
                        <Typography variant="body2" color="textSecondary"><strong>Plan ID:</strong> {props.nutritionPlan.plan_id}</Typography>
                        <Typography variant="h6" component="div" style={{ marginTop: '16px' }}>Nutritions</Typography>
                        <Box>
                            <List>
                                {props.nutritionPlan.nutritions.map(nutrition => (
                                    <div key={nutrition.nut_id}>
                                        <ListItem>
                                            <ListItemText
                                                primary={`Nutrition ID: ${nutrition.nut_id}`}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            FE ID: {nutrition.fe_id}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            Plan ID: {nutrition.plan_id}
                                                        </Typography>
                                                        <br />
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            Portion: {nutrition.portion}
                                                        </Typography>
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        <Divider component="li" />
                                    </div>
                                ))}
                            </List>
                        </Box>
                    </CardContent>
                    <CardActions style={{ margin: "10px 0", padding: "0" }}>
                        <Button variant="contained" fullWidth style={{ margin: "0px" }}>ADD TO DIET</Button>
                        <Button variant="outlined" color="error" fullWidth style={{ margin: "0px" }} onClick={handleDelete}>Delete</Button>
                    </CardActions>
                </Card>
            </Box>
        </Link>
    );
}

export default DietCard;