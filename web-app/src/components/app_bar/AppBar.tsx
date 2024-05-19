import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from '../bar_profile_button/BarProfileButton';
import { Link, useNavigate } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import { Button } from '@mui/material';
import { GlobalContext } from '../../data/context/GlobalContextProps';


const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: theme.spacing(2),
    flexGrow: "1",
    // [theme.breakpoints.up('sm')]: {
    //     marginLeft: theme.spacing(3),
    //     width: 'auto',
    // },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function MainAppBar() {
    const {user} = React.useContext(GlobalContext);
    console.log(user);

    const navigate = useNavigate();

    const handleCreateWorkout = () => {
        navigate("/create");
    }

    return (
        <AppBar position="static" sx={{ flexGrow: 1, borderBottom: "1px solid #909192", height: "72px" }}>
            <Toolbar>
                <Link to="/" style={{textDecoration:"none", color:"inherit"}}>
                    <Typography
                        variant="h4"
                        fontWeight={"bold"}
                        noWrap
                        component="div"
                    >
                        BilFint
                    </Typography>
                </Link>
                <Search>
                    <SearchIconWrapper>
                        <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                        placeholder="Search…"
                        inputProps={{ 'aria-label': 'search' }}
                    />
                </Search>
                <Button
            sx={{ color:"white", height: 50 }}
            variant="contained"
            color="primary"
            onClick={handleCreateWorkout}
        >
            Create
        </Button>
                {user ? <ProfileButton name={user.first_name + user.last_name} email={user.email} /> : null }
                <LogoutButton />
            </Toolbar>
        </AppBar>
    );
}