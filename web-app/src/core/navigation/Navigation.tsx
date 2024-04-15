import LoginIcon from "mdi-material-ui/Login";

import { VerticalNavItemsType } from "../types/Types";

const navigation = (): VerticalNavItemsType => {
    return [
        {
            title: "Login",
            icon: LoginIcon,
            path: "/pages/login",
            openInNewTab: true,
        }
    ]
}

export default navigation