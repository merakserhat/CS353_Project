import { Box } from "@mui/system";
import MultipleMenuSelector from "../../../../components/multiple_menu_selector/MultipleMenuSelector";
import { useState } from "react";

const menuItems = [
    "My Workouts",
    "Stack Fire",
    "Head Soccer",
    "Easter Egg",
    "Dart",
    "Tap Tap",
    "Fitness Game"
];

function ProfileMainPart() {
    const [selectedMenu, setSelectedMenu] = useState<string>(menuItems[0]);

    const onMenuSelectionChange = (name: string) => {
        setSelectedMenu(name);
    }

    const getGame = () => {
        if (selectedMenu === "Stack Fire")
            return <iframe
                src="https://www.onlinegames.io/games/2021/unity/stack-fire-ball/index.html"
                title="Stack Fire Ball Game"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />

            if (selectedMenu === "Head Soccer")
            return <iframe
                src="https://www.onlinegames.io/games/2023/construct/280/head-soccer-2022/index.html"
                title="Stack Fire Ball Game"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />


            if (selectedMenu === "Easter Egg")
            return <iframe
                src="https://www.oyuncubey.com/en/games/BeerStrip.aspx"
                title="Stack Fire Ball Game"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />

            if (selectedMenu === "Dart")
            return <iframe
                src="https://www.onlinegames.io/games/2021/4/darts-hit/index.html"
                title="Stack Fire Ball Game"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />

            if (selectedMenu === "Tap Tap")
            return <iframe
                src="https://www.onlinegames.io/games/2023/q/1/tap-tap-shots/index.html"
                title="Stack Fire Ball Game"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />

            if (selectedMenu === "Fitness Game")
            return <iframe
                src="https://www.gameflare.com/embed/douchebag-workout-2"
                title="Stack Fire Ball Game"
                width="100%"
                height="100%"
                style={{ border: 'none' }}
            />
    }

    return (
        <Box width={"100%"} height={"100%"} sx={{ backgroundColor: "#F5FAFF", borderRadius: 5, display: "flex", flexDirection: "column" }}>
            <MultipleMenuSelector onSelectionChanged={onMenuSelectionChange} items={menuItems} selectedItem={selectedMenu} />
            <Box sx={{ flexGrow: 1, width: "100%" }}>
                {getGame()}
            </Box>
        </Box>
    );
}



export default ProfileMainPart;